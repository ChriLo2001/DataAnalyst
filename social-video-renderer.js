// S2e — Renderer-Werkstatt, Stufe 1: aus index.html herausgelöst (reines Verschieben, keine Logikänderung).
// Klassisches Skript (kein type="module"), lädt analog zu season-data-embedded.js/social-video-assets.js vor
// dem Haupt-<script> — funktioniert dadurch sowohl unter file:// als auch über scripts/serve.mjs. Enthält
// buildSocialVideoSpec (Spezifikation Abschnitt 5), Schicht A (socialVideoDrawList, Abschnitt 3.2/4) und
// Schicht B (Canvas2D-Ausführung, Abschnitt 3.2) des Social-Video-Renderers — alles, was weder App-Zustand (S/
// setState) noch app-eigene DOM-Bausteine braucht. UI-Verdrahtung (Spieltagsauswahl, Download-Auslösung,
// Fortschrittsanzeige) bleibt in index.html, ruft diese Funktionen als globale Funktionen auf.
// ═════════════════════════════════════════════════════════════════════════
// S1 — Social-Video-Spezifikation (docs/social-video-spezifikation.md), Abschnitt 5: buildSocialVideoSpec.
// Reine Funktion: zeichnet nicht, kein DOM-Zugriff. Wiederverwendet ausschließlich bestehende Bausteine
// (getSeasonMatchdays/buildMatchdays, getSeasonStatsAsOf, matchcenterOutcomeForTeam, matchcenterGameSideForTeam/
// -ForOpponentKey, matchcenterEventNumber/-FindRosterPlayer/-RosterPlayers/-PlayerKey/-PlayerDisplayName,
// matchcenterStoryPlayer/-FormLetters/-FormRecord/-ShortTeamLabel, matchcenterStoryTeamAssetKey). Abschnitt 5a/5b
// (Vererbung, vorläufige Termine) sind für S1 NICHT umgesetzt (weder data/team-lineage.json noch
// data/schedule-provisional.json werden gelesen) — fehlt Historie zu einem Gegner, greift bereits der normale
// "keine Daten -> Szene/Element entfällt"-Fallback, kein Raten.
// ═════════════════════════════════════════════════════════════════════════

const SOCIAL_VIDEO_DURATION_MS=15000;
const SOCIAL_VIDEO_FPS=30;
const SOCIAL_VIDEO_MIN_CONTENT_MS=1500;
const SOCIAL_VIDEO_NAME_MAX_CHARS=20;
const SOCIAL_VIDEO_NAME_HARD_MAX_CHARS=30;
const SOCIAL_VIDEO_FACT_MAX_CHARS=90;
const SOCIAL_VIDEO_FACT_HARD_MAX_CHARS=130;

/** Szenen-Basiswerte aus Spezifikation Abschnitt 4.1/4.2. `fixed` Szenen (Intro/Abschluss) werden nie
 * gestreckt, nur bis zu ihrem eigenen capMs (Owner-Entscheidung: Intro höchstens 2.600 ms, Abschluss höchstens
 * 2.400 ms bei der Story; beim Feed liegt der Basiswert bereits auf dem eigenen Cap, keine Wirkung). */
const SOCIAL_VIDEO_STORY_SCENE_DEFS=[
  {id:'intro',baseMs:2400,fixed:true,capMs:2600},
  {id:'opponent',baseMs:4000},
  {id:'lastDuel',baseMs:3000},
  {id:'playersToWatch',baseMs:3600},
  {id:'outro',baseMs:2000,fixed:true,capMs:2400},
];
const SOCIAL_VIDEO_FEED_SCENE_DEFS=[
  {id:'intro',baseMs:2400,fixed:true,capMs:2400},
  {id:'opponentA',baseMs:4600},
  {id:'opponentB',baseMs:4600},
  {id:'outro',baseMs:3400,fixed:true,capMs:3400},
];

/**
 * Verteilt totalMs auf die gegebenen Szenen (Owner-Entscheidung, siehe docs/social-video-spezifikation.md
 * Abschnitt 5): fixe Szenen (Intro/Abschluss) bleiben bei ihrem Basiswert (gedeckelt durch capMs); alle
 * ANDEREN, als abwesend markierten Szenen (`present:false`) entfallen vorab. Die freie Zeit (total − Summe
 * fixer Szenen) wird PROPORTIONAL zum jeweiligen Basiswert auf die verbleibenden Inhaltsszenen verteilt
 * (Rundungsrest komplett der letzten Inhaltsszene, damit die Summe exakt totalMs bleibt). Fällt eine
 * Inhaltsszene dadurch unter minContentMs, entfällt sie komplett und die Verteilung läuft mit den
 * verbleibenden Inhaltsszenen erneut (rekursiv, hier als Schleife). Reine Funktion, exportiert für
 * scripts/test-social-video.mjs (node:vm-Extraktion, wie bei den bestehenden P0b-Tests).
 * @param {{id:string, baseMs:number, fixed?:boolean, capMs?:number, present?:boolean}[]} sceneDefs
 * @returns {{id:string, ms:number, startMs:number, endMs:number}[]}
 */
function socialVideoDistributeSceneDurations(sceneDefs,totalMs=SOCIAL_VIDEO_DURATION_MS,minContentMs=SOCIAL_VIDEO_MIN_CONTENT_MS){
  let defs=(sceneDefs||[]).filter(s=>s&&s.present!==false);
  for(let guard=0;guard<10;guard++){
    const fixed=defs.filter(s=>s.fixed);
    const content=defs.filter(s=>!s.fixed);
    const fixedMs=fixed.reduce((sum,s)=>sum+Math.min(s.baseMs,s.capMs??s.baseMs),0);
    const budget=Math.max(0,totalMs-fixedMs);
    const weightSum=content.reduce((sum,s)=>sum+s.baseMs,0);
    if(!content.length||weightSum<=0){
      const result=[];let cursor=0;
      for(const s of fixed){const ms=Math.min(s.baseMs,s.capMs??s.baseMs);result.push({id:s.id,ms,startMs:cursor,endMs:cursor+ms});cursor+=ms;}
      return result;
    }
    const shares=content.map(s=>Math.floor(budget*(s.baseMs/weightSum)));
    const usedByContent=shares.reduce((a,b)=>a+b,0);
    shares[shares.length-1]+=budget-usedByContent;
    const tooSmallIdx=shares.findIndex(ms=>ms<minContentMs);
    if(tooSmallIdx>=0){
      const dropId=content[tooSmallIdx].id;
      defs=defs.filter(s=>s.id!==dropId);
      continue;
    }
    const result=[];let cursor=0;
    for(const s of defs){
      const ms=s.fixed?Math.min(s.baseMs,s.capMs??s.baseMs):shares[content.indexOf(s)];
      result.push({id:s.id,ms,startMs:cursor,endMs:cursor+ms});
      cursor+=ms;
    }
    return result;
  }
  return[];
}

/** Zeichenobergrenzen-Abstufung (Spezifikation Abschnitt 5: "dieselbe Abstufung wie in der Story-Vorschau" —
 * vgl. matchcenterStoryNameClass/matchcenterStoryVisibleFacts, hier als generischer Text-Helfer für ein
 * einzelnes Element). Bis maxChars unverändert ("normal"); darüber kleinere Schriftstufe ("tight", Text
 * bleibt vollständig); darüber Kürzung mit Auslassungszeichen an einer Wortgrenze. */
function socialVideoFitText(text,maxChars=SOCIAL_VIDEO_FACT_MAX_CHARS,hardMaxChars=SOCIAL_VIDEO_FACT_HARD_MAX_CHARS){
  const raw=cleanText(text||'').trim();
  if(!raw)return{text:'',stage:'normal',truncated:false};
  if(raw.length<=maxChars)return{text:raw,stage:'normal',truncated:false};
  if(raw.length<=hardMaxChars)return{text:raw,stage:'tight',truncated:false};
  const cut=raw.slice(0,hardMaxChars);
  const lastSpace=cut.lastIndexOf(' ');
  const wordBoundary=lastSpace>hardMaxChars*0.6?cut.slice(0,lastSpace):cut;
  return{text:wordBoundary.trim()+'…',stage:'tight',truncated:true};
}

/** Jede tatsächlich von socialVideoPushText verwendete (Familie,Schnitt)-Kombination — alle drei Familien
 * werden ausschließlich mit dem Default-Gewicht 900 angefragt (kein Aufrufer in diesem Projekt überschreibt
 * `weight`, siehe socialVideoPushText). S2e-Aufgabe 1 (Schriftfrage): vorher prüfte diese Funktion
 * "900 'Syne'"/"800 'DM Mono'" gegen einen @import, der diese Gewichte NIE in genau dieser Kombination lud
 * (Syne nur 700/800, DM Mono nur 400/500) — der Prüfwert passte selbst dann nicht zum tatsächlich geladenen
 * Gewicht, wenn das Netz verfügbar war. Jetzt lokal (social-video-fonts.css) mit Gewichtsspannen eingebunden,
 * die 900 für alle drei Familien exakt abdecken (siehe dortiger Kopfkommentar). */
const SOCIAL_VIDEO_FONT_SPECS=["900 16px 'Syne'","900 16px 'DM Mono'","900 16px 'Inter'"];

/** Schriftenprüfung (Spezifikation Abschnitt 3.3 Punkt 2, erweitert S2e-Aufgabe 1): document.fonts.ready
 * abwarten, dann EXPLIZIT document.fonts.load() für jede tatsächlich verwendete Kombination anstoßen (nicht
 * nur prüfen) und erst danach document.fonts.check() auswerten — .ready allein garantiert nicht, dass genau
 * diese Schnitte geladen sind, nur dass alle zum Zeitpunkt des Aufrufs BEKANNTEN Ladevorgänge abgeschlossen
 * sind. Fehlen die Schriften (z. B. file:// ohne Netz, Datei fehlt), wird fallback:true zurückgegeben — der
 * Aufrufer zeichnet dann mit den in der CSS definierten Ersatzschriften weiter (kein Abbruch) und zeigt im
 * UI einen Hinweis. */
async function socialVideoCheckFonts(){
  try{
    if(!globalThis.document?.fonts?.ready)return{ready:false,syne:false,dmMono:false,inter:false,fallback:true};
    await document.fonts.ready;
    await Promise.all(SOCIAL_VIDEO_FONT_SPECS.map(spec=>document.fonts.load(spec).catch(()=>[])));
    const syne=document.fonts.check(SOCIAL_VIDEO_FONT_SPECS[0]);
    const dmMono=document.fonts.check(SOCIAL_VIDEO_FONT_SPECS[1]);
    const inter=document.fonts.check(SOCIAL_VIDEO_FONT_SPECS[2]);
    return{ready:true,syne,dmMono,inter,fallback:!(syne&&dmMono&&inter)};
  }catch(e){
    return{ready:false,syne:false,dmMono:false,inter:false,fallback:true};
  }
}

/** Stellt sicher, dass alle verwendeten Schriften geladen sind, EINMAL pro Seitenaufruf tatsächlich wartend
 * (danach liefert derselbe gecachte Promise sofort zurück) — S2e-Aufgabe 1: "vor jedem Zeichnen und vor
 * jeder Aufnahme muss auf document.fonts.load gewartet werden". Von Schicht B selbst aufgerufen
 * (socialVideoRenderStandbildDataUrl/socialVideoCaptureVideo), nicht nur von den UI-Aufrufstellen in
 * index.html — ein vergessener Aufruf an EINER Stelle (das war der tatsächliche Fehler: window.
 * generateSocialVideoContactSheets rief socialVideoCheckFonts() bisher nicht auf) kann die Zeichnung dadurch
 * nicht mehr ungeschützt lassen. */
let _socialVideoFontsReadyPromise=null;
function socialVideoEnsureFontsReady(){
  if(!_socialVideoFontsReadyPromise)_socialVideoFontsReadyPromise=socialVideoCheckFonts();
  return _socialVideoFontsReadyPromise;
}
/** Fähigkeitsprüfung für den SVG-foreignObject->Canvas->PNG-Export. Seit S2 betrifft das NUR noch
 * window.downloadMatchdayStory (Live-Vorschau-Export im Social Media Center) — downloadSocialVideoStandbild
 * nutzt seit der Canvas2D-Umstellung keinen foreignObject-Weg mehr und ist von diesem Befund unabhängig
 * (siehe rMatchcenterSocialMediaCenter-Hinweistext). Prinzip: ein winziges, rein lokales 1x1-foreignObject-
 * SVG ohne jeden externen Inhalt wird auf einen 1x1-Canvas gezeichnet und per toDataURL() ausgelesen.
 * Aktuelle Chrome-Versionen "tainten" dabei JEDEN Canvas, auf den ein SVG mit <foreignObject> gezeichnet
 * wurde — unabhängig von externen Ressourcen —, andere Engines (z. B. Firefox) erlauben es. Das Ergebnis
 * hängt nur von der Browser-Engine ab, nicht von den jeweiligen Spec-Daten, deshalb genügt EIN winziger,
 * günstiger Testlauf statt einer echten Story/Feed-Auszeichnung. */
async function probeSocialVideoExportCapability(){
  try{
    const svg='<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"><foreignObject width="1" height="1"><div xmlns="http://www.w3.org/1999/xhtml"></div></foreignObject></svg>';
    const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml;charset=utf-8'}));
    const img=new Image();
    await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject;img.src=url;});
    const canvas=document.createElement('canvas');
    canvas.width=1;canvas.height=1;
    canvas.getContext('2d').drawImage(img,0,0,1,1);
    URL.revokeObjectURL(url);
    canvas.toDataURL('image/png');
    return true;
  }catch(e){
    return false;
  }
}
/** Ulms eigene Spiele eines Spieltags, sortiert nach Anpfiffzeit (Owner-Entscheidung Punkt 1 — NICHT über
 * overviewOpponentLabel/matchday.teamGames, das bei einem vollen Spieltag ALLE anderen Teams listen würde,
 * nicht nur Ulms tatsächliche Gegner; Muster analog getFurtherSameDayUlmGames). */
function socialVideoUlmGamesForMatchday(seasonKey,matchday){
  if(!matchday)return[];
  return(matchday.games||[])
    .filter(g=>matchcenterDetectUlmSide(g,seasonKey))
    .sort((a,b)=>String(a?.start_time||'').localeCompare(String(b?.start_time||''))||compareGamesChronologically(a,b));
}

function socialVideoTableRank(standings,teamDisplayName,seasonKey){
  const wantedKey=matchcenterTeamKey(teamDisplayName,seasonKey);
  const row=(standings||[]).find(t=>matchcenterTeamKey(t.name||t.team||t.teamName||'',seasonKey)===wantedKey);
  return row?Number(row.rank)||null:null;
}

/** AsOf-bewusstes Äquivalent zu matchcenterAnalyzeForm (siehe Kopfkommentar) — dieselbe matchcenterOutcomeForTeam/
 * matchcenterSortGamesAsc-Logik, nur auf einer bereits vorgefilterten (asOf) Spielliste. */
function socialVideoFormAsOf(asOfGames,teamKey,seasonKey){
  const teamGames=(asOfGames||[]).map(g=>matchcenterOutcomeForTeam(g,teamKey,seasonKey)).filter(Boolean).sort((a,b)=>matchcenterSortGamesAsc(a.game,b.game));
  const last5=teamGames.slice(-5);
  const totals=last5.reduce((a,o)=>{a.games+=1;a.points+=o.points;a.gf+=o.gf;a.ga+=o.ga;a.diff+=o.diff;if(o.result==='W')a.w+=1;else if(o.result==='L')a.l+=1;else a.d+=1;return a;},{games:0,points:0,w:0,d:0,l:0,gf:0,ga:0,diff:0});
  return{teamGames,last5,totals};
}

/** AsOf-bewusstes letztes direktes Duell Ulm–Gegner (siehe Kopfkommentar) — `opponentMcKey` im Format von
 * matchcenterTeamKey (NICHT der Bindestrich-Asset-Schlüssel). */
function socialVideoLastDuelAsOf(asOfGames,opponentMcKey,seasonKey){
  const direct=(asOfGames||[])
    .filter(g=>matchcenterDetectUlmSide(g,seasonKey)&&matchcenterGameSideForOpponentKey(g,opponentMcKey,seasonKey,'season'))
    .sort(matchcenterSortGamesAsc);
  const last=direct[direct.length-1];
  return last?matchcenterOutcomeForTeam(last,'ulm',seasonKey):null;
}

/** Minimaler, asOf-bewusster Punkte-Spitzenreiter (Tore+Assists) eines Teams im Fenster — wiederverwendet
 * dieselben Event-Bausteine wie matchcenterBuildUlmPlayerScouting/-OpponentScouting (matchcenterEventNumber,
 * matchcenterFindRosterPlayer, matchcenterPlayerKey/-DisplayName), aber ohne deren mehrdimensionales Ranking
 * (Impact/Clutch/Direct/Form getrennt) — für "Players to watch" genügt der einfache Punkte-Spitzenreiter. */
function socialVideoTopScorerAsOf(asOfGames,teamKey,seasonKey){
  const tally=new Map();
  for(const g of asOfGames||[]){
    const side=matchcenterGameSideForTeam(g,teamKey,seasonKey);
    if(!side)continue;
    const gameKey=matchcenterGameKey(g);
    for(const ev of g.events||[]){
      if(ev?.event_team!==side||ev?.event_type!=='goal')continue;
      const scorerNumber=matchcenterEventNumber(ev,'number');
      const scorer=matchcenterFindRosterPlayer(g,side,scorerNumber);
      if(scorer){
        const key=matchcenterPlayerKey(scorer,teamKey,scorerNumber);
        const row=tally.get(key)||{name:matchcenterPlayerDisplayName(scorer,scorerNumber),games:new Set(),goals:0,assists:0};
        row.goals+=1;row.games.add(gameKey);tally.set(key,row);
      }
      const assistNumber=matchcenterEventNumber(ev,'assist');
      if(assistNumber){
        const assister=matchcenterFindRosterPlayer(g,side,assistNumber);
        if(assister){
          const key=matchcenterPlayerKey(assister,teamKey,assistNumber);
          const row=tally.get(key)||{name:matchcenterPlayerDisplayName(assister,assistNumber),games:new Set(),goals:0,assists:0};
          row.assists+=1;row.games.add(gameKey);tally.set(key,row);
        }
      }
    }
  }
  const rows=[...tally.values()].map(r=>({name:r.name,games:r.games.size,goals:r.goals,assists:r.assists,points:r.goals+r.assists})).filter(r=>r.points>0);
  rows.sort((a,b)=>b.points-a.points||b.goals-a.goals||a.name.localeCompare(b.name,'de'));
  return rows[0]||null;
}

/** Letztes direktes Duell mit Stichtag-sicherem Fallback über Saisongrenzen (Spezifikation 5a/5c,
 * S2c-Auftrag B1): Stufe 1 — letztes Duell der LAUFENDEN Saison vor dem Stichtag (socialVideoLastDuelAsOf,
 * unverändert). Stufe 2 — sonst das letzte Duell einer FRÜHEREN Saison; kein eigener Stichtag nötig, eine
 * bereits vollständig gespielte Saison liegt per Definition vollständig vor dem aktuellen Stichtag. Stufe 3
 * (Vorgängerteam mit scope.display=true, Abschnitt 5a) — wartet auf data/team-lineage.json (Modul M1v, noch
 * nicht angelegt, Zuordnung laut Entscheidung 13 noch offen): liefert bis dahin durchgängig null, das ist
 * exakt das in 5a beschriebene Verhalten bei fehlendem Lineage-Eintrag ("kein Raten, Block entfällt,
 * warnings-Eintrag"), kein Sonderfall dieser Phase. */
function socialVideoLastDuelWithFallback(asOfGames,opponentMcKey,seasonKey,opponentDisplay){
  const current=socialVideoLastDuelAsOf(asOfGames,opponentMcKey,seasonKey);
  if(current)return{...current,tier:'current',seasonLabel:null,asLabel:null};
  const allDirect=matchcenterDirectGames(opponentMcKey,'alltime');
  const prior=allDirect.filter(g=>g._mcSeasonKey!==seasonKey&&seasonOrderIndex(g._mcSeasonKey)<seasonOrderIndex(seasonKey)).sort(matchcenterSortGamesAsc);
  const lastPrior=prior[prior.length-1];
  if(lastPrior){
    const outcome=matchcenterOutcomeForTeam(lastPrior,'ulm',lastPrior._mcSeasonKey);
    if(outcome){
      const oppSide=outcome.side==='home'?'guest':'home';
      const thenName=matchcenterGameTeamName(lastPrior,oppSide);
      const thenDisplay=matchcenterTeamDisplay(thenName,lastPrior._mcSeasonKey);
      const asLabel=normalizeTeamKey(thenDisplay)!==normalizeTeamKey(opponentDisplay)?thenDisplay:null;
      return{...outcome,tier:'priorSeason',seasonLabel:matchcenterSeasonLabel(lastPrior._mcSeasonKey),asLabel};
    }
  }
  return null;
}

/** Trikotnummer-Topscorer des Gegners MIT Stichtag (S2c-Auftrag B, "Datengrundlage ist die bestehende
 * Matchcenter-Logik matchcenterBuildOpponentScouting, nichts neu berechnen"). Diese Funktion kennt selbst
 * keinen Stichtag und nimmt keine vorgefilterte Spielliste entgegen — Spezifikation 5c sieht für genau diesen
 * Fall einen "dünnen Stichtag-Wrapper daneben" vor, der die bestehende Funktion UNVERÄNDERT lässt
 * (Golden-Master-Schutz). Da matchcenterBuildOpponentScouting seine Spiele selbst über das globale
 * matchcenterAllGames() bezieht und keinen Injektionspunkt hat, schränkt dieser Wrapper matchcenterAllGames()
 * für die Dauer GENAU dieses einen synchronen Aufrufs auf Spiele vor dem Stichtag ein und stellt es im
 * finally-Block sofort wieder her — JS ist single-threaded, daher ohne Nebenläufigkeitsrisiko. */
function socialVideoOpponentTopScorerAsOf(opponentMcKey,seasonKey,cutoffDate){
  const original=matchcenterAllGames;
  window.matchcenterAllGames=function(){return original().filter(g=>g.date<cutoffDate);};
  try{
    const scouting=matchcenterBuildOpponentScouting(opponentMcKey,'current',seasonKey);
    return scouting.topPlayers[0]||null;
  }finally{
    window.matchcenterAllGames=original;
  }
}

/** Alle Kernwerte für EINEN Ulm-Gegner eines Spieltags (asOf strikt VOR dem Spieltag, siehe Kopfkommentar). */
function socialVideoOpponentSceneData(seasonKey,matchday,ulmGame){
  const warnings=[];
  const ulmSide=matchcenterDetectUlmSide(ulmGame,seasonKey);
  const oppSide=ulmSide==='home'?'guest':'home';
  const opponentRaw=matchcenterGameTeamName(ulmGame,oppSide);
  const opponentDisplay=matchcenterTeamDisplay(opponentRaw,seasonKey);
  const opponentShort=matchcenterStoryShortTeamLabel(opponentDisplay);
  const opponentMcKey=matchcenterTeamKey(opponentRaw,seasonKey);
  const assetKey=matchcenterStoryTeamAssetKey(opponentRaw,seasonKey);

  const asOf={date:matchday.date,startTime:'00:00'};
  const stats=getSeasonStatsAsOf(seasonKey,asOf);
  const standings=stats?.standings||[];
  const asOfGames=(stats?.relevantLeagueGames||[]).map(g=>({...normalizeGame(g),_mcSeasonKey:seasonKey}));

  const ulmRank=socialVideoTableRank(standings,'VfB Ulm',seasonKey);
  const oppRank=socialVideoTableRank(standings,opponentDisplay,seasonKey);
  if(ulmRank===null||oppRank===null)warnings.push({code:'element-omitted',scene:'opponent',element:'tableRank',reason:'no-standings-before-matchday'});

  const ulmForm=socialVideoFormAsOf(asOfGames,'ulm',seasonKey);
  const oppForm=socialVideoFormAsOf(asOfGames,opponentMcKey,seasonKey);

  const lastDuel=socialVideoLastDuelAsOf(asOfGames,opponentMcKey,seasonKey);
  if(!lastDuel)warnings.push({code:'scene-omitted',scene:'lastDuel',reason:'no-duel-before-matchday'});

  const lastDuelWithFallback=socialVideoLastDuelWithFallback(asOfGames,opponentMcKey,seasonKey,opponentDisplay);
  if(!lastDuelWithFallback)warnings.push({code:'element-omitted',scene:'opponent',element:'duelFact',reason:'no-duel-any-season'});

  const opponentTopScorer=socialVideoOpponentTopScorerAsOf(opponentMcKey,seasonKey,matchday.date);
  if(!opponentTopScorer)warnings.push({code:'element-omitted',scene:'opponent',element:'topscorerCard',reason:'no-scorer-data-this-season'});

  const topUlmRow=socialVideoTopScorerAsOf(asOfGames,'ulm',seasonKey);
  const topOppRow=socialVideoTopScorerAsOf(asOfGames,opponentMcKey,seasonKey);
  if(!topUlmRow&&!topOppRow)warnings.push({code:'scene-omitted',scene:'playersToWatch',reason:'no-scorer-data'});
  else{
    if(!topUlmRow)warnings.push({code:'element-omitted',scene:'playersToWatch',element:'ulm',reason:'no-scorer-data'});
    if(!topOppRow)warnings.push({code:'element-omitted',scene:'playersToWatch',element:'opponent',reason:'no-scorer-data'});
  }
  const topUlm=matchcenterStoryPlayer(topUlmRow,'VfB Ulm','ulm');
  const topOpponent=matchcenterStoryPlayer(topOppRow,opponentDisplay,'opponent');

  return{
    opponentDisplay,opponentShort,opponentMcKey,assetKey,
    logoAsset:`assets/teams/${assetKey}.png`,
    kickoff:String(ulmGame?.start_time||''),
    arena:cleanText(ulmGame?.arena_name||''),
    ulmRank,oppRank,
    ulmFormLetters:matchcenterStoryFormLetters(ulmForm),oppFormLetters:matchcenterStoryFormLetters(oppForm),
    ulmFormRecord:matchcenterStoryFormRecord(ulmForm),oppFormRecord:matchcenterStoryFormRecord(oppForm),
    lastDuel,lastDuelHasData:!!topUlmRow||!!topOppRow,
    lastDuelWithFallback,hasLastDuelWithFallback:!!lastDuelWithFallback,
    opponentTopScorer,hasOpponentTopScorer:!!opponentTopScorer,
    topUlm,topOpponent,hasLastDuel:!!lastDuel,hasPlayersToWatch:!!topUlmRow||!!topOppRow,
    warnings,
  };
}

/** Dateiname nach Spezifikation Abschnitt 6.4 — Gegner-Key nach demselben Muster wie
 * matchcenterStoryDownloadFileName (Kleinschreibung, ohne Umlaute, Bindestriche). */
function socialVideoFileName({matchdayNumber,date,format,opponentAssetKey},ext='webm'){
  const md=String(matchdayNumber??'');
  const d=String(date||'').replace(/[^0-9-]+/g,'');
  if(format==='feed-4x5')return`vfb-ulm-md${md}-${d}-feed.${ext}`;
  const opp=String(opponentAssetKey||'gegner').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')||'gegner';
  return`vfb-ulm-md${md}-${d}-story-${opp}.${ext}`;
}

function socialVideoMatchdayLabel(matchday){
  return matchday?`Spieltag ${matchday.number}`:'Spieltag';
}

/** Gestaltungskanon 2a (docs/social-video-spezifikation.md Abschnitt 2a) — EIN zusammengesetztes Element für
 * die Matchup-Gruppe der Gegner-Szene: beide Teams (Logo, Name, Tabellenplatz, Form) in einem Element, damit
 * Schicht A sie als EINE der höchstens fünf Gruppen je Szene zeichnet (siehe socialVideoLayoutOpponentKanon). */
function socialVideoMatchupPairElement(opp,animation='fade',delayMs=0){
  return{type:'matchupPair',
    ulm:{name:'VfB Ulm',rank:opp.ulmRank,formLetters:opp.ulmFormLetters,formRecord:opp.ulmFormRecord},
    opp:{name:opp.opponentDisplay,rank:opp.oppRank,formLetters:opp.oppFormLetters,formRecord:opp.oppFormRecord,assetKey:opp.assetKey,asset:opp.logoAsset},
    animation,delayMs};
}
/** Fakt-Gruppe = letztes direktes Duell (S2c-Auftrag B1), null wenn keine Stufe des Fallbacks einen Treffer
 * liefert (Element entfällt dann ersatzlos, siehe socialVideoOpponentKanonElements). */
function socialVideoDuelFactElement(opp,animation='fade',delayMs=0){
  const d=opp.lastDuelWithFallback;
  if(!d)return null;
  const parts=[formatDateDE(d.game.date),'Verbandsliga BW (KF)'];
  if(d.seasonLabel)parts.push(d.seasonLabel);
  return{type:'duelFact',result:`${d.gf}:${d.ga}`,metaLine:parts.join(' · '),asLabel:d.asLabel,animation,delayMs};
}
/** Topscorer-Gruppe (S2c-Auftrag B): Vorname/Nachname aus dem letzten durch Leerzeichen getrennten Token des
 * vollen Anzeigenamens — dieselbe Aufteilung wie bei langen Vereinsnamen bereits an anderer Stelle im Projekt
 * üblich (letztes Token = Nachname). Null wenn der Gegner in der laufenden Saison vor dem Stichtag noch keine
 * Scorerdaten hat (Element entfällt dann ersatzlos). */
function socialVideoTopscorerCardElement(opp,animation='rise',delayMs=0){
  const t=opp.opponentTopScorer;
  if(!t)return null;
  const nameParts=String(t.name||'').trim().split(/\s+/).filter(Boolean);
  const last=nameParts.length>1?nameParts.pop():(nameParts[0]||t.name||'');
  const first=nameParts.join(' ');
  return{type:'topscorerCard',teamLabel:opp.opponentDisplay,jersey:t.jersey?String(t.jersey):'–',first,last,goals:t.goals,assists:t.assists,points:t.points,insight:t.dangerReason||'',animation,delayMs};
}
/** Die drei Gruppen der Gegner-Szene nach Kanon 2a: Matchup (immer), Fakt=letztes Duell (wenn vorhanden),
 * Topscorer (wenn vorhanden) — zusammen mit Fortschrittsbalken und Kopfzeile (beide szenenübergreifend in
 * socialVideoDrawList) genau die vorgegebenen höchstens fünf Gruppen je Szene. */
function socialVideoOpponentKanonElements(opp){
  const els=[socialVideoMatchupPairElement(opp,'fade',0)];
  const duel=socialVideoDuelFactElement(opp,'fade',200);
  if(duel)els.push(duel);
  const ts=socialVideoTopscorerCardElement(opp,'rise',320);
  if(ts)els.push(ts);
  return els;
}

/** EIN Story-Spec-Objekt für genau einen Ulm-Gegner dieses Spieltags (siehe buildSocialVideoSpec unten). */
function socialVideoBuildStorySpec(seasonKey,matchday,ulmGame,warningsOut){
  const opp=socialVideoOpponentSceneData(seasonKey,matchday,ulmGame);
  warningsOut.push(...opp.warnings);

  const sceneDefs=SOCIAL_VIDEO_STORY_SCENE_DEFS.map(def=>({...def,present:def.id==='lastDuel'?opp.hasLastDuel:def.id==='playersToWatch'?opp.hasPlayersToWatch:true}));
  const timing=socialVideoDistributeSceneDurations(sceneDefs);
  const at=id=>timing.find(t=>t.id===id);

  const scenes=[];
  const introT=at('intro');
  if(introT)scenes.push({id:'intro',startMs:introT.startMs,endMs:introT.endMs,elements:[
    {type:'logo',team:'vfb-ulm',asset:'assets/vfb-ulm-logo-mark.png',animation:'fade',delayMs:0},
    {type:'title',text:socialVideoMatchdayLabel(matchday),animation:'rise',delayMs:200},
    {type:'meta',text:`${formatDateDE(matchday.date)}${opp.arena?' · '+opp.arena:''}`,animation:'rise',delayMs:320},
    {type:'meta',text:`${matchcenterSeasonLabel(seasonKey)} · Verbandsliga BW (KF)`,animation:'rise',delayMs:420},
  ]});
  const oppT=at('opponent');
  if(oppT)scenes.push({id:'opponent',startMs:oppT.startMs,endMs:oppT.endMs,elements:socialVideoOpponentKanonElements(opp)});
  const duelT=at('lastDuel');
  if(duelT&&opp.lastDuel)scenes.push({id:'lastDuel',startMs:duelT.startMs,endMs:duelT.endMs,elements:[
    {type:'result',text:`${opp.lastDuel.gf}:${opp.lastDuel.ga}`,sub:'Letztes Duell',animation:'count',delayMs:0},
    {type:'meta',text:matchcenterSeasonLabel(seasonKey),animation:'fade',delayMs:200},
  ]});
  const watchT=at('playersToWatch');
  if(watchT&&(opp.hasPlayersToWatch))scenes.push({id:'playersToWatch',startMs:watchT.startMs,endMs:watchT.endMs,elements:[
    ...(opp.topUlm.stat!=='Keine Scorerdaten'?[{type:'playerCard',team:'ulm',name:opp.topUlm.name,stat:opp.topUlm.stat,note:socialVideoFitText(opp.topUlm.line,SOCIAL_VIDEO_FACT_MAX_CHARS,SOCIAL_VIDEO_FACT_HARD_MAX_CHARS).text,animation:'rise',delayMs:0}]:[]),
    ...(opp.topOpponent.stat!=='Keine Scorerdaten'?[{type:'playerCard',team:'opponent',name:opp.topOpponent.name,stat:opp.topOpponent.stat,note:socialVideoFitText(opp.topOpponent.line,SOCIAL_VIDEO_FACT_MAX_CHARS,SOCIAL_VIDEO_FACT_HARD_MAX_CHARS).text,animation:'rise',delayMs:240}]:[]),
  ]});
  const outroT=at('outro');
  if(outroT)scenes.push({id:'outro',startMs:outroT.startMs,endMs:outroT.endMs,elements:[
    {type:'stat',label:'Anpfiff',text:opp.kickoff||'-',animation:'fade',delayMs:0},
    {type:'meta',text:opp.arena||'',animation:'fade',delayMs:80},
    {type:'logo',team:'vfb-ulm',asset:'assets/vfb-ulm-logo-mark.png',animation:'fade',delayMs:160},
  ]});

  return{
    schemaVersion:1,format:'story-9x16',seasonKey,
    matchday:{number:matchday.number,date:matchday.date,arena:opp.arena,kickoffs:[opp.kickoff].filter(Boolean)},
    durationMs:SOCIAL_VIDEO_DURATION_MS,fps:SOCIAL_VIDEO_FPS,
    scenes,
    opponentAssetKey:opp.assetKey,opponentDisplay:opp.opponentDisplay,
    dataSources:{standings:'app',form:'app',lastDuel:opp.hasLastDuel?'app':'absent',playersToWatch:opp.hasPlayersToWatch?'matchcenter':'absent',prognosis:'absent'},
    warnings:opp.warnings,
  };
}

/** Ein Feed-Post-Spec-Objekt für den ganzen Spieltag (beide Gegner, siehe Abschnitt 4.2). */
function socialVideoBuildFeedSpec(seasonKey,matchday,ulmGames){
  const warnings=[];
  const opps=ulmGames.map(g=>socialVideoOpponentSceneData(seasonKey,matchday,g));
  opps.forEach(o=>warnings.push(...o.warnings));
  const [oppA,oppB]=opps;

  const sceneDefs=SOCIAL_VIDEO_FEED_SCENE_DEFS.map(def=>({...def,present:def.id==='opponentA'?!!oppA:def.id==='opponentB'?!!oppB:true}));
  const timing=socialVideoDistributeSceneDurations(sceneDefs);
  const at=id=>timing.find(t=>t.id===id);

  const scenes=[];
  const introT=at('intro');
  if(introT)scenes.push({id:'intro',startMs:introT.startMs,endMs:introT.endMs,elements:[
    {type:'title',text:socialVideoMatchdayLabel(matchday),animation:'rise',delayMs:0},
    {type:'meta',text:`${formatDateDE(matchday.date)}${oppA?.arena?' · '+oppA.arena:''}`,animation:'rise',delayMs:120},
    ...(oppA?[{type:'logo',team:oppA.assetKey,asset:oppA.logoAsset,animation:'fade',delayMs:240}]:[]),
    ...(oppB?[{type:'logo',team:oppB.assetKey,asset:oppB.logoAsset,animation:'fade',delayMs:320}]:[]),
  ]});
  const buildOppScene=(id,opp)=>{
    const t=at(id);
    if(!t||!opp)return null;
    return{id,startMs:t.startMs,endMs:t.endMs,elements:socialVideoOpponentKanonElements(opp)};
  };
  const sceneA=buildOppScene('opponentA',oppA);
  if(sceneA)scenes.push(sceneA);
  const sceneB=buildOppScene('opponentB',oppB);
  if(sceneB)scenes.push(sceneB);
  const outroT=at('outro');
  if(outroT)scenes.push({id:'outro',startMs:outroT.startMs,endMs:outroT.endMs,elements:[
    ...(oppA?[{type:'stat',label:`vs ${oppA.opponentShort}`,text:oppA.kickoff||'-',animation:'fade',delayMs:0}]:[]),
    ...(oppB?[{type:'stat',label:`vs ${oppB.opponentShort}`,text:oppB.kickoff||'-',animation:'fade',delayMs:100}]:[]),
    {type:'meta',text:oppA?.arena||oppB?.arena||'',animation:'fade',delayMs:200},
    {type:'logo',team:'vfb-ulm',asset:'assets/vfb-ulm-logo-mark.png',animation:'fade',delayMs:280},
  ]});

  return{
    schemaVersion:1,format:'feed-4x5',seasonKey,
    matchday:{number:matchday.number,date:matchday.date,arena:oppA?.arena||oppB?.arena||'',kickoffs:[oppA?.kickoff,oppB?.kickoff].filter(Boolean)},
    durationMs:SOCIAL_VIDEO_DURATION_MS,fps:SOCIAL_VIDEO_FPS,
    scenes,
    dataSources:{standings:'app',form:'app',lastDuel:'absent',playersToWatch:'absent',prognosis:'absent'},
    warnings,
  };
}

/**
 * buildSocialVideoSpec({seasonKey, matchdayKey, format}) — Spezifikation Abschnitt 5. Reine Funktion, zeichnet
 * nicht, kein DOM-Zugriff. `matchdayKey` = matchday.key (z. B. "25/26#4") ODER die reine Spieltagsnummer.
 * format:'story-9x16' liefert ein ARRAY (ein Spec-Objekt je Ulm-Gegner dieses Spieltags, 1–2 Einträge, nach
 * Anpfiffzeit sortiert — Owner-Entscheidung, da die Funktion keinen Gegner-Parameter hat, ein Spieltag aber bis
 * zu zwei Gegner). format:'feed-4x5' liefert EIN Objekt (ein Post für beide Gegner).
 * @returns {object|object[]|{schemaVersion:1,format,seasonKey,matchday:null,scenes:[],warnings:[{code:'matchday-not-found'}]}}
 */
function buildSocialVideoSpec({seasonKey,matchdayKey,format}={}){
  const matchdays=getSeasonMatchdays(seasonKey).filter(m=>m.number!==null);
  const matchday=matchdays.find(m=>m.key===matchdayKey)||matchdays.find(m=>String(m.number)===String(matchdayKey));
  if(!matchday){
    const empty={schemaVersion:1,format,seasonKey,matchday:null,durationMs:0,fps:SOCIAL_VIDEO_FPS,scenes:[],dataSources:{standings:'app',form:'app',lastDuel:'absent',playersToWatch:'absent',prognosis:'absent'},warnings:[{code:'matchday-not-found',matchdayKey}]};
    return format==='story-9x16'?[empty]:empty;
  }
  const ulmGames=socialVideoUlmGamesForMatchday(seasonKey,matchday);
  if(format==='feed-4x5')return socialVideoBuildFeedSpec(seasonKey,matchday,ulmGames);
  if(!ulmGames.length){
    const empty={schemaVersion:1,format:'story-9x16',seasonKey,matchday:{number:matchday.number,date:matchday.date,arena:'',kickoffs:[]},durationMs:0,fps:SOCIAL_VIDEO_FPS,scenes:[],dataSources:{standings:'app',form:'app',lastDuel:'absent',playersToWatch:'absent',prognosis:'absent'},warnings:[{code:'no-ulm-game-this-matchday'}]};
    return[empty];
  }
  const warningsUnused=[];
  return ulmGames.map(g=>socialVideoBuildStorySpec(seasonKey,matchday,g,warningsUnused));
}

// ═════════════════════════════════════════════════════════════════════════
// S2 — Canvas2D-Renderer, SCHICHT A (docs/social-video-spezifikation.md Abschnitt 3.2/4): rein, kein
// Canvas/DOM, keine Schriftmessung (Schicht B hat die Schriftmetriken; hier wird die Textgröße stattdessen
// über eine Zeichen-pro-Pixel-Schätzung konservativ begrenzt, siehe socialVideoEstimateFontSize — dieselbe
// Zeichenliste ist dadurch deterministisch testbar, ohne dass ein Browser läuft). socialVideoDrawList(spec,
// timeMs) ist der einzige Einstiegspunkt. Schicht B (weiter unten, nach dem S1-Standbild-Abschnitt) führt die
// Liste nur noch aus — kein Layout, keine Animation dort.
// ═════════════════════════════════════════════════════════════════════════

const SOCIAL_VIDEO_SAFE_TOP=120,SOCIAL_VIDEO_SAFE_BOTTOM=120,SOCIAL_VIDEO_SAFE_LEFT=64,SOCIAL_VIDEO_SAFE_RIGHT=64;
const SOCIAL_VIDEO_WIDTH=1080;
function socialVideoHeightForFormat(format){
  return format==='feed-4x5'?1350:1920;
}
function socialVideoContentWidth(){
  return SOCIAL_VIDEO_WIDTH-SOCIAL_VIDEO_SAFE_LEFT-SOCIAL_VIDEO_SAFE_RIGHT;
}

// Wiederverwendete Skyline-Silhouette aus der Cover-Animation (index.html, Klassen cv-skyline-*, ~Zeile 1563):
// KEIN Raster-Asset, ein inline-SVG-Pfad. Seit der Renderer-Werkstatt Stufe 4 liest der Renderer die
// Pfaddaten aus window.SOCIAL_VIDEO_SKYLINE (von scripts/build-social-assets.mjs programmatisch aus
// index.html extrahiert, siehe dort) statt sie von Hand als Konstante zu kopieren — dieselbe Geometrie,
// nur automatisiert statt manuell übernommen (byte-identisch geprüft). Per Path2D direkt in Canvas2D
// zeichenbar. Die BEWEGUNG ist für Video eigens nach Abschnitt 4.4 berechnet (socialVideoSkylineTransform):
// einmaliger Sweep im Intro statt des 4,8s-Loops der Cover-Seite, höchstens 8px Parallaxe über die volle
// Dauer statt 1080px-Sweep — die Cover-Keyframes (cv-skyline-sweep/-pulse-opacity) werden NICHT
// wiederverwendet, weil 4.4 für Video andere Werte vorschreibt.
const SOCIAL_VIDEO_SKYLINE_PATH_D=window.SOCIAL_VIDEO_SKYLINE?.d||'';
const SOCIAL_VIDEO_SKYLINE_VIEWBOX=window.SOCIAL_VIDEO_SKYLINE?.viewBox||{w:900,h:260};

function socialVideoEaseOutCubic(t){
  const c=Math.min(1,Math.max(0,t));
  return 1-Math.pow(1-c,3);
}

/** Konservative Zeichenbreiten-Schätzung (keine echte Schriftmessung, siehe Kopfkommentar): wählt die größte
 * Schriftgröße bis baseSize, bei der text (Zeichenzahl * charFactor * Größe) noch in maxWidth passt. Syne
 * (fett, breit) bekommt einen größeren Faktor als DM Mono. Garantiert dadurch KONSTRUKTIV, nicht erst durch
 * Messung, dass kein Textelement die sicheren Ränder überschreitet — auch bei sehr langen Vereinsnamen. */
function socialVideoEstimateFontSize(text,baseSize,maxWidth,charFactor,minSize=11){
  const len=Math.max(1,String(text||'').length);
  const fits=maxWidth/(len*charFactor);
  return Math.max(minSize,Math.min(baseSize,fits));
}

/** Findet die aktive Szene bei timeMs. Szenen sind lückenlos [startMs,endMs); am Dauerende bzw. vor
 * Szenenbeginn wird auf die letzte/erste Szene geklemmt. null nur, wenn spec.scenes leer ist (z. B. kein
 * Ulm-Spiel an diesem Spieltag gefunden — Spezifikation 5: "keine leeren Elemente", keine leere Zeichenliste
 * nötig, der Aufrufer zeigt in diesem Fall ohnehin nur den Hintergrund). */
function socialVideoSceneAt(spec,timeMs){
  const scenes=spec?.scenes||[];
  if(!scenes.length)return null;
  const t=Math.min(Math.max(0,timeMs),spec.durationMs??15000);
  let scene=scenes.find(s=>t>=s.startMs&&t<s.endMs);
  if(!scene)scene=t>=scenes[scenes.length-1].endMs?scenes[scenes.length-1]:scenes[0];
  return{scene,sceneMs:t-scene.startMs,sceneIndex:scenes.indexOf(scene)};
}

/** Animationsfortschritt (Spezifikation 4.3): fade/rise 300ms, count (Hochzählen) 600ms easeOutCubic, stagger
 * wie fade (Item-Abstand wird vom Aufrufer über zusätzliche delayMs pro Pille gebildet). Vor delayMs:
 * unsichtbar. */
function socialVideoElementProgress(animation,delayMs,sceneMs){
  const elapsed=sceneMs-(delayMs||0);
  const dur=animation==='count'?600:300;
  if(elapsed<=0)return{opacity:0,raw:0,eased:0};
  const raw=Math.min(1,elapsed/dur);
  return{opacity:raw,raw,eased:socialVideoEaseOutCubic(raw)};
}
const SOCIAL_VIDEO_RISE_PX=24;

/** Reine Phasenfunktion der Fahne (Spezifikation 4.4): Periode ca. 2,5s, Phase AUSSCHLIESSLICH von timeMs
 * abhängig (kein Zufall, keine Physik, kein Reset pro Szene — zwei Aufrufe mit demselben timeMs liefern
 * denselben Wert, siehe Test). */
function socialVideoFlagPhase(timeMs){
  return(timeMs/2500)*2*Math.PI;
}
/** Vertikaler Höhenversatz einer Fahnen-Spalte bei x (0..flagWidth), höchstens 1,5% von flagHeight
 * (Spezifikation 4.4), Wellenlänge ca. halbe Fahnenbreite. */
function socialVideoFlagColumnOffset(x,flagWidth,flagHeight,timeMs){
  const amplitude=flagHeight*0.015;
  const wavelength=Math.max(1,flagWidth*0.5);
  return Math.sin((x/wavelength)*2*Math.PI+socialVideoFlagPhase(timeMs))*amplitude;
}

/** Langsame Parallaxe (höchstens 8px über die volle Dauer) plus Fortschritt des einmaligen Intro-Sweeps
 * (0..1, nur während der ersten introMs). */
function socialVideoSkylineTransform(timeMs,durationMs,introMs){
  const parallaxX=durationMs>0?(Math.min(timeMs,durationMs)/durationMs)*8:0;
  const sweepProgress=introMs>0?Math.min(1,Math.max(0,timeMs/introMs)):1;
  return{parallaxX,sweepProgress};
}

/** Deterministische Spatzen-Positionen (höchstens 12, Spezifikation 4.4: "langsam, unregelmäßig verteilt,
 * Deckkraft unter 0,5"). Kein Math.random() (Determinismus-Pflicht, Abschnitt 5/8) — Startposition und
 * Geschwindigkeit je Spatz kommen aus einer festen, unregelmäßig wirkenden Zahlenfolge (Indexabhängig). */
const SOCIAL_VIDEO_SPARROW_COUNT=12;
function socialVideoSparrowPositions(timeMs,width,height){
  const out=[];
  for(let i=0;i<SOCIAL_VIDEO_SPARROW_COUNT;i++){
    const seed=(i*0.6180339887)%1; // golden-ratio-Streuung statt Zufall: wirkt unregelmäßig, ist aber fix
    const speed=6+((i*37)%17); // px/s, 6..22, je Spatz konstant
    const baseY=height*0.58+((i*53)%180);
    const x=((seed*width)+(timeMs/1000)*speed)%(width+80)-40;
    const y=baseY+Math.sin((timeMs/1000)*0.4+i)*10;
    out.push({x,y,opacity:0.14+((i*7)%10)/40});
  }
  return out;
}

// S2e-Aufgabe 1 (Schriftfrage) — NEU KALIBRIERT gegen die tatsächlich geladenen, lokalen Schriften (vorher
// gegen einen nie zuverlässig geladenen Google-Fonts-@import grob geraten: 0,66 für ALLE Nicht-Mono-Schriften,
// obwohl Syne und Inter sehr unterschiedlich breit sind). Gemessen per ctx.measureText an realen, im Renderer
// tatsächlich vorkommenden Texten (Vereinsnamen, Spielernamen, Daten, Kennzahlen) bei Gewicht 900, Referenz-
// größe 100px, Mittelwert mehrerer Stichproben je Familie, aufgerundet für den konstruktiven
// Sicherheitsspielraum (socialVideoEstimateFontSize MUSS eher zu klein als zu groß schätzen):
//   mono  (DM Mono): 0,60 — unverändert, ECHTES Monospace, Messung war exakt 0,600 in jeder Stichprobe.
//   syne  (Syne):    0,66 -> 1,35 — größte gefundene Abweichung: "Huppmann" bei 54px: alt vorhergesagt
//                     285,1px, tatsächlich 492,3px gezeichnet (+207,2px / +72,7%). EINSCHRÄNKUNG, ehrlich
//                     gemessen statt verschwiegen: ein einzelner Faktor kann sehr KURZEN Texten (zweistellige
//                     Initialen-Fallbacks wie "VU"/"DG" — fester Zeichenabstand amortisiert sich nicht über
//                     die Länge) nie perfekt gerecht werden UND gleichzeitig lange Vereinsnamen nicht unnötig
//                     verkleinern. 1,35 deckt alle realen Saison-25/26-Initialen ab (Browser-Stichprobe, 663
//                     Textbefehle aus echten Specs: 0 Überläufe); ein theoretisches Extrem wie "WW" (Faktor
//                     1,882, durchprobiert über alle 676 Großbuchstaben-Paare) bliebe trotzdem ungedeckt —
//                     für diesen schmalen Grenzfall (nur die Initialen-Kreisfläche, nicht der Haupttext)
//                     wurde bewusst nicht weiter hochkalibriert, um lange Vereinsnamen nicht unnötig zu
//                     verkleinern (siehe Abschlussbericht Aufgabe 1).
//   inter (Inter):   0,66 -> 0,58 — Inter ist schmaler als angenommen (alte Schätzung lag bis zu 20% zu hoch,
//                     keine Überlaufgefahr, aber Text wurde unnötig klein skaliert).
// Vorher behandelte der Code 'inter' und 'syne' sogar IDENTISCH (beide 0,66) — zwei verschiedene Schriften
// mit sehr unterschiedlicher Laufweite bekamen denselben Faktor. Jetzt drei eigene Zweige.
function socialVideoPushText(cmds,{text,x,y,baseSize,maxWidth,font='syne',weight=900,color='#fff',align='center',letterSpacing=0,opacity=1,charFactor,tabular,formColor,group}){
  const t=String(text||'');
  if(!t)return;
  const factor=charFactor??(font==='mono'?0.6:font==='inter'?0.58:1.35);
  const size=socialVideoEstimateFontSize(t,baseSize,maxWidth,factor);
  cmds.push({type:'text',text:t,x,y,size,maxWidth,font,weight,color,align,letterSpacing,opacity,tabular,formColor,group});
}

/** Logokreis (Spezifikation Abschnitt 2: Goldrand, roter Verlauf, Initialen-Fallback). Schicht A kennt den
 * Ladezustand der Bilddatei nicht (rein, kein Netzwerk/Dateisystem) — deshalb werden IMMER Ring+Initialen UND
 * ein image-Befehl erzeugt; Schicht B zeichnet den image-Befehl nur, wenn das Asset tatsächlich geladen
 * werden konnte, sonst bleiben die darunterliegenden Initialen sichtbar (derselbe Fallback-Effekt wie das
 * bestehende <img onerror> in rMatchcenterStoryLogo). */
function socialVideoPushLogo(cmds,{cx,cy,r,assetKey,initials,isUlm,opacity}){
  const ringColor='#E8A020';
  const group=isUlm?'logo-ulm':'logo-gegner';
  cmds.push({type:'circle',x:cx,y:cy,r,fill:{type:'radial',cx:0.5,cy:0.42,stops:[[0,'#fdfaf2'],[0.58,'#f8f2e6'],[1,'#e8d8b8']]},stroke:ringColor,strokeWidth:3,opacity,group});
  socialVideoPushText(cmds,{text:initials,x:cx,y:cy,baseSize:r*0.62,maxWidth:r*1.5,font:'syne',color:'#1f0b0f',align:'center',opacity,group});
  cmds.push({type:'image',assetKey,x:cx-r*0.74,y:cy-r*0.74,w:r*1.48,h:r*1.48,clip:'circle',cx,cy,cr:r,opacity,group});
}

const SOCIAL_VIDEO_PILL_COLORS={
  S:{from:'#F09020',to:'#CC1A27',text:'#fff'},
  U:{from:'#6b7280',to:'#2f3542',text:'#fde68a'},
  N:{from:'#5e111b',to:'#120508',text:'#f8b4b4'},
  '-':{from:'rgba(148,163,184,.14)',to:'rgba(148,163,184,.14)',text:'#94a3b8'},
};
/** Formpillen-Reihe (Spezifikation 4.1: "Formpillen erscheinen nacheinander im Abstand von 80ms"). */
function socialVideoPushForm(cmds,{letters,cx,topY,delayMs,sceneMs,size=34,group}){
  const pills=(letters&&letters.length?letters:['-']).slice(-5);
  const gap=10;
  const totalW=pills.length*size+(pills.length-1)*gap;
  let x=cx-totalW/2+size/2;
  pills.forEach((letter,i)=>{
    const p=socialVideoElementProgress('stagger',delayMs+i*80,sceneMs);
    if(p.opacity<=0)return;
    const colors=SOCIAL_VIDEO_PILL_COLORS[letter]||SOCIAL_VIDEO_PILL_COLORS['-'];
    const y=topY-(1-p.eased)*SOCIAL_VIDEO_RISE_PX;
    cmds.push({type:'circle',x,y,r:size/2,fill:{type:'linear',x0:0,y0:-1,x1:0,y1:1,stops:[[0,colors.from],[1,colors.to]]},opacity:p.opacity,group});
    socialVideoPushText(cmds,{text:letter,x,y,baseSize:size*0.5,maxWidth:size*0.9,font:'mono',color:colors.text,align:'center',opacity:p.opacity,group});
    x+=size+gap;
  });
}

// ─────────────────────────────────────────────────────────────────────────
// Gestaltungskanon 2a (docs/social-video-spezifikation.md Abschnitt 2a) — "edel" statt Dashboard. Gilt ab
// hier für die Gegner-Szene (socialVideoLayoutOpponentKanon) sowie szenenübergreifend für Fortschrittsbalken
// und Kopfzeile (socialVideoPushProgressBar/-HeaderBar, aus socialVideoDrawList heraus aufgerufen). Die
// übrigen Szenen (intro/lastDuel/playersToWatch/outro) bleiben bewusst auf dem bisherigen Stand — ihre
// Gestaltung ist noch nicht durch eine eigene Entwurfsrunde freigegeben (siehe Abschlussbericht).
// ─────────────────────────────────────────────────────────────────────────
// Dieselben zwei Pfade wie EMBED_FORCE_COLOR_PRESERVING_PATHS in scripts/cache-team-logos.mjs — für die
// Laufzeit-Zusicherung in socialVideoDrawCommand (S2e-Auftrag Stufe 4: "VfB Ulm nie silhouettiert/invertiert").
const SOCIAL_VIDEO_VFB_ULM_ASSET_KEYS=new Set(['assets/vfb-ulm-logo-mark.png','assets/teams/vfb-ulm.png']);
const SOCIAL_VIDEO_INK='#EDE7DF';
const SOCIAL_VIDEO_MUTED='#8A8A90';
const SOCIAL_VIDEO_ACCENT='#CC1A27';
const SOCIAL_VIDEO_HAIRLINE_GOLD='rgba(216,168,74,.22)';
const SOCIAL_VIDEO_HAIRLINE_SOFT='rgba(255,255,255,.12)';
// Formbilanz-Ausnahme vom Farbbudget (Abschnitt 2a, S2c-Auftrag B2): gedämpfte, entsättigte Töne, zählen
// NICHT ins Akzentbudget, werden aber in der Prüfung getrennt ausgewiesen (siehe formColor-Markierung unten).
const SOCIAL_VIDEO_FORM_WIN='#8FB88F';
const SOCIAL_VIDEO_FORM_LOSS='#C97B7B';
const SOCIAL_VIDEO_FORM_DRAW=SOCIAL_VIDEO_MUTED;

/** Dünne Trennlinie statt Container (Abschnitt 2a: "Trennung durch Haarlinien... statt durch Kästen"). Nie
 * gefüllt mit einer Akzentfarbe aus dieser Funktion heraus — reine Trennlinie, kein Container-Rahmen. */
function socialVideoPushHairline(cmds,{x,y,w,color=SOCIAL_VIDEO_HAIRLINE_GOLD,group}){
  cmds.push({type:'rect',x,y,w,h:1,fill:color,opacity:1,group});
}

/** Fortschrittsbalken (Abschnitt 2a/4.1: "Szenen-Fortschrittsbalken am oberen Rand wie bei Instagram-
 * Stories"). Dünne Haarlinien-Segmente statt gefüllter Pillen; die EINE Akzentfarbe markiert erledigte/
 * aktive Segmente (accent:true, siehe Prüfung "Akzentfläche höchstens 5%" — die Fläche ist bei 1080×2px je
 * Segment verschwindend klein). */
function socialVideoPushProgressBar(totalScenes,activeIndex){
  const cmds=[];
  if(!totalScenes)return cmds;
  const x0=SOCIAL_VIDEO_SAFE_LEFT,x1=SOCIAL_VIDEO_WIDTH-SOCIAL_VIDEO_SAFE_RIGHT;
  const gap=8,w=(x1-x0-gap*(totalScenes-1))/totalScenes,y=SOCIAL_VIDEO_SAFE_TOP,h=2;
  for(let i=0;i<totalScenes;i++){
    const x=x0+i*(w+gap);
    const done=activeIndex>=0&&i<=activeIndex;
    cmds.push({type:'rect',x,y,w,h,fill:done?SOCIAL_VIDEO_ACCENT:SOCIAL_VIDEO_HAIRLINE_SOFT,opacity:1,accent:done,group:'fortschritt'});
  }
  return cmds;
}

/** Text der dauerhaften Kopfzeile (Abschnitt 2a/4.1: "VfB Ulm gegen Gegner, Spieltag, Datum, Anpfiffzeit,
 * Halle" — JEDE Szene). Reine Funktion aus den bereits vorhandenen Spec-Feldern, keine Neuberechnung. Beim
 * Feed-Format (zwei Gegner, kein einzelnes spec.opponentDisplay) kommt der Gegnername aus dem matchupPair-
 * Element der gerade aktiven Szene, falls vorhanden — sonst bleibt der generische Platzhalter "Gegner". */
function socialVideoHeaderText(spec,activeScene){
  const md=spec?.matchday||{};
  const matchupEl=(activeScene?.elements||[]).find(e=>e.type==='matchupPair');
  const oppLabel=spec?.opponentDisplay||matchupEl?.opp?.name||'Gegner';
  const parts=[md.number!=null?`Spieltag ${md.number}`:'',md.date?formatDateDE(md.date):'',(md.kickoffs||[])[0]?`${md.kickoffs[0]} Uhr`:'',md.arena||''].filter(Boolean);
  return`VfB Ulm gegen ${oppLabel} · ${parts.join(' · ')}`;
}
function socialVideoPushHeaderBar(spec,activeScene){
  const cmds=[];
  socialVideoPushText(cmds,{text:socialVideoHeaderText(spec,activeScene),x:SOCIAL_VIDEO_WIDTH/2,y:SOCIAL_VIDEO_SAFE_TOP+42,baseSize:20,maxWidth:socialVideoContentWidth(),font:'mono',color:SOCIAL_VIDEO_MUTED,align:'center',opacity:1,charFactor:0.6});
  cmds.forEach(c=>{c.group='kopfzeile';});
  return cmds;
}

/** Spaltenmittelpunkte des 12-Spalten-Rasters (5+2+5, Abschnitt 2a/Umfangspunkt A) — rein geometrisch,
 * unabhängig von der Bildhöhe (Breite ist in beiden Formaten 1080). */
function socialVideoMatchupColumns(){
  const contentW=socialVideoContentWidth();
  const gutter=16,cols=12;
  const unit=(contentW-11*gutter)/cols;
  const colW=5*unit+4*gutter;
  const leftX0=SOCIAL_VIDEO_SAFE_LEFT;
  const leftCx=leftX0+colW/2;
  const rightX0=leftX0+7*(unit+gutter);
  const rightCx=rightX0+colW/2;
  return{leftCx,rightCx,dividerX:SOCIAL_VIDEO_WIDTH/2,colW};
}

/** Formbilanz als Reihe kleiner Zeichen auf einer Haarlinie (Abschnitt 2a-Ausnahme, S2c-Auftrag B2) — KEINE
 * gefüllten Kreise mehr. Nur die Zeichen selbst sind farbig (S/U/N je gedämpftes Grün/Grau/Rot), die Linie
 * bleibt die normale Gold-Haarlinie. Reihenfolge chronologisch, jüngstes Spiel rechts (letters kommt bereits
 * in dieser Reihenfolge aus matchcenterStoryFormLetters/socialVideoFormAsOf, siehe dort). */
const SOCIAL_VIDEO_FORM_COLOR={S:SOCIAL_VIDEO_FORM_WIN,N:SOCIAL_VIDEO_FORM_LOSS,U:SOCIAL_VIDEO_FORM_DRAW};
function socialVideoPushFormHairline(cmds,{letters,cx,y,group}){
  const marks=(letters&&letters.length?letters:['-']).slice(-5);
  const gap=16,size=22;
  const totalW=marks.length*size+(marks.length-1)*gap;
  socialVideoPushHairline(cmds,{x:cx-totalW/2,y:y-10,w:totalW,group});
  let x=cx-totalW/2+size/2;
  for(const letter of marks){
    const color=SOCIAL_VIDEO_FORM_COLOR[letter]||SOCIAL_VIDEO_MUTED;
    socialVideoPushText(cmds,{text:letter,x,y,baseSize:size,maxWidth:size,font:'mono',color,align:'center',opacity:1,formColor:true,group});
    x+=size+gap;
  }
}

/** Matchup-Gruppe: beide Teams nebeneinander, Logos ohne Ring/Fläche (Gegner leicht entsättigt — Markierung
 * desaturate:true, Schicht B wendet den Entsättigungs-/Aufhellungs-Filter an), Tabellenplatz in
 * Tabellenziffern (tabular:true). */
function socialVideoLayoutMatchupGroup(cmds,el,cy,sceneMs,k){
  const cols=socialVideoMatchupColumns();
  const p=socialVideoElementProgress(el.animation,el.delayMs,sceneMs);
  if(p.opacity<=0)return;
  const logoSize=184*k,logoTop=cy-220*k;
  const sides=[{data:el.ulm,cx:cols.leftCx,isUlm:true},{data:el.opp,cx:cols.rightCx,isUlm:false}];
  for(const side of sides){
    const d=side.data;
    const initials=matchcenterStoryInitials(side.isUlm?'VfB Ulm':d.name);
    const logoGroup=side.isUlm?'logo-ulm':'logo-gegner';
    // Reihenfolge wichtig: Initialen ZUERST, Bild-Befehl DANACH — lädt das Bild, deckt es die Initialen ab;
    // schlägt es fehl (Schicht B zeichnet dann keinen image-Befehl, siehe socialVideoDrawCommand), bleiben
    // die Initialen sichtbar (derselbe Fallback-Mechanismus wie im bisherigen socialVideoPushLogo).
    socialVideoPushText(cmds,{text:initials,x:side.cx,y:logoTop+logoSize/2,baseSize:logoSize*0.3,maxWidth:logoSize*0.7,font:'syne',color:SOCIAL_VIDEO_MUTED,align:'center',opacity:p.opacity,group:logoGroup});
    if(side.isUlm){
      cmds.push({type:'image',assetKey:'assets/vfb-ulm-logo-mark.png',x:side.cx-logoSize/2,y:logoTop,w:logoSize,h:logoSize,opacity:p.opacity,group:logoGroup});
    }else{
      cmds.push({type:'image',assetKey:d.asset,x:side.cx-logoSize/2,y:logoTop,w:logoSize,h:logoSize,opacity:p.opacity,desaturate:true,group:logoGroup});
    }
    socialVideoPushText(cmds,{text:d.name,x:side.cx,y:logoTop+logoSize+56*k,baseSize:38*k,maxWidth:cols.colW,font:'syne',color:SOCIAL_VIDEO_INK,align:'center',opacity:p.opacity,group:'vergleich'});
    if(d.rank!==null&&d.rank!==undefined){
      const countP=el.animation==='count'?p.eased:1;
      const rankVal=Math.max(1,Math.round(d.rank*countP));
      socialVideoPushText(cmds,{text:`#${rankVal}`,x:side.cx,y:logoTop+logoSize+180*k,baseSize:120*k,maxWidth:cols.colW,font:'mono',color:SOCIAL_VIDEO_INK,align:'center',opacity:p.opacity,tabular:true,group:'vergleich'});
      socialVideoPushText(cmds,{text:'Tabelle',x:side.cx,y:logoTop+logoSize+236*k,baseSize:14*k,maxWidth:cols.colW,font:'mono',color:SOCIAL_VIDEO_MUTED,align:'center',opacity:p.opacity,letterSpacing:1.5,group:'vergleich'});
    }
    socialVideoPushFormHairline(cmds,{letters:d.formLetters,cx:side.cx,y:logoTop+logoSize+290*k,group:'formzeile'});
    socialVideoPushText(cmds,{text:d.formRecord||'',x:side.cx,y:logoTop+logoSize+320*k,baseSize:16*k,maxWidth:cols.colW,font:'inter',color:SOCIAL_VIDEO_MUTED,align:'center',opacity:p.opacity,group:'formzeile'});
  }
  socialVideoPushText(cmds,{text:'VS',x:cols.dividerX,y:cy-142*k,baseSize:18*k,maxWidth:80,font:'mono',color:SOCIAL_VIDEO_MUTED,align:'center',opacity:p.opacity,letterSpacing:2,group:'vergleich'});
  socialVideoPushHairline(cmds,{x:cols.dividerX,y:logoTop+logoSize+20*k,w:1,color:SOCIAL_VIDEO_HAIRLINE_SOFT,group:'vergleich'});
}

/** Fakt-Gruppe = letztes direktes Duell (S2c-Auftrag B1): Ergebnis groß (Tabellenziffern), darunter klein
 * Datum/Wettbewerb/Saison, bei Bedarf der damalige Teamname. Linksbündige Satzkante (Abschnitt 2a), Haarlinie
 * statt Container. */
function socialVideoLayoutDuelFactGroup(cmds,el,topY,sceneMs,k){
  const p=socialVideoElementProgress(el.animation,el.delayMs,sceneMs);
  if(p.opacity<=0)return;
  const left=SOCIAL_VIDEO_SAFE_LEFT,w=socialVideoContentWidth();
  socialVideoPushHairline(cmds,{x:left,y:topY,w,group:'duell'});
  socialVideoPushText(cmds,{text:'Letztes Duell',x:left,y:topY+34*k,baseSize:14*k,maxWidth:w,font:'mono',color:SOCIAL_VIDEO_MUTED,align:'left',opacity:p.opacity,letterSpacing:1.5,group:'duell'});
  socialVideoPushText(cmds,{text:el.result,x:left,y:topY+100*k,baseSize:72*k,maxWidth:w*0.4,font:'mono',color:SOCIAL_VIDEO_INK,align:'left',opacity:p.opacity,tabular:true,group:'duell'});
  const metaText=el.asLabel?`${el.metaLine} · als ${el.asLabel}`:el.metaLine;
  socialVideoPushText(cmds,{text:metaText,x:left,y:topY+150*k,baseSize:20*k,maxWidth:w,font:'inter',color:SOCIAL_VIDEO_MUTED,align:'left',opacity:p.opacity,group:'duell'});
}

/** Topscorer-Gruppe (S2c-Auftrag B): Trikotnummer als große Ziffer NEBEN dem Namen, getrennt durch eine
 * Haarlinie — kein Kreis (Abschnitt 2a). Vorname klein, Nachname groß; drei Kennzahlen in Tabellenziffern;
 * eine Einordnungszeile. */
function socialVideoLayoutTopscorerGroup(cmds,el,topY,sceneMs,k){
  const p=socialVideoElementProgress(el.animation,el.delayMs,sceneMs);
  if(p.opacity<=0)return;
  const left=SOCIAL_VIDEO_SAFE_LEFT,w=socialVideoContentWidth();
  socialVideoPushHairline(cmds,{x:left,y:topY,w,group:'topscorer'});
  socialVideoPushText(cmds,{text:`Topscorer ${el.teamLabel}`,x:left,y:topY+34*k,baseSize:14*k,maxWidth:w,font:'mono',color:SOCIAL_VIDEO_MUTED,align:'left',opacity:p.opacity,letterSpacing:1.5,group:'topscorer'});
  const jerseyW=170*k;
  socialVideoPushText(cmds,{text:el.jersey,x:left,y:topY+150*k,baseSize:104*k,maxWidth:jerseyW-24,font:'mono',color:SOCIAL_VIDEO_INK,align:'left',opacity:p.opacity,tabular:true,group:'topscorer'});
  socialVideoPushHairline(cmds,{x:left+jerseyW,y:topY+40*k,w:1,color:SOCIAL_VIDEO_HAIRLINE_GOLD,group:'topscorer'});
  const nameX=left+jerseyW+30*k;
  socialVideoPushText(cmds,{text:el.first,x:nameX,y:topY+100*k,baseSize:22*k,maxWidth:w-jerseyW-30*k,font:'inter',color:SOCIAL_VIDEO_MUTED,align:'left',opacity:p.opacity,group:'topscorer'});
  socialVideoPushText(cmds,{text:el.last,x:nameX,y:topY+152*k,baseSize:54*k,maxWidth:w-jerseyW-30*k,font:'syne',color:SOCIAL_VIDEO_INK,align:'left',opacity:p.opacity,group:'topscorer'});
  socialVideoPushHairline(cmds,{x:left,y:topY+200*k,w,group:'topscorer'});
  const stats=[['Tore',el.goals],['Assists',el.assists],['Punkte',el.points]];
  let sx=left;
  const statW=180*k;
  for(const[label,value]of stats){
    socialVideoPushText(cmds,{text:String(value),x:sx,y:topY+266*k,baseSize:46*k,maxWidth:statW-20,font:'mono',color:SOCIAL_VIDEO_INK,align:'left',opacity:p.opacity,tabular:true,group:'topscorer'});
    socialVideoPushText(cmds,{text:label,x:sx,y:topY+292*k,baseSize:13*k,maxWidth:statW-20,font:'mono',color:SOCIAL_VIDEO_MUTED,align:'left',opacity:p.opacity,letterSpacing:1,group:'topscorer'});
    sx+=statW;
  }
  if(el.insight)socialVideoPushText(cmds,{text:el.insight,x:left,y:topY+340*k,baseSize:22*k,maxWidth:w,font:'inter',color:SOCIAL_VIDEO_MUTED,align:'left',opacity:p.opacity,group:'topscorer'});
}

/** Layout der Gegner-Szene nach Gestaltungskanon 2a (S2c-Auftrag A): Matchup (zentriert, einzige zentrierte
 * Gruppe neben Kopfzeile/Abschluss), Fakt und Topscorer (linke Satzkante). Lücken-Verteilung wie
 * socialVideoLayoutScene, aber mit eigenen, großzügigeren Schlitzhöhen passend zur neuen Dichte. k skaliert
 * alle festen Pixelwerte der drei Gruppen-Layoutfunktionen auf die tatsächliche Bildhöhe (Story 1920px, k=1;
 * Feed 1350px, k≈0,70) — ohne k liefen Topscorer-Inhalte beim schmaleren Feed-Format unten aus dem sicheren
 * Rand heraus (siehe Build-Bericht). */
function socialVideoLayoutOpponentKanon(spec,scene,sceneMs,height){
  const cmds=[];
  const k=height/1920;
  const topY=SOCIAL_VIDEO_SAFE_TOP+60*k; // Platz für Fortschrittsbalken+Kopfzeile, die socialVideoDrawList davor zeichnet
  const bottomY=height-SOCIAL_VIDEO_SAFE_BOTTOM;
  const els=scene.elements||[];
  const slotH={matchupPair:720*k,duelFact:180*k,topscorerCard:400*k};
  const totalH=els.reduce((sum,el)=>sum+(slotH[el.type]||160*k),0);
  const available=bottomY-topY;
  const gap=Math.min(90*k,Math.max(24*k,(available-totalH)/(els.length+1)));
  let y=topY+gap;
  for(const el of els){
    const slot=slotH[el.type]||160*k;
    if(el.type==='matchupPair')socialVideoLayoutMatchupGroup(cmds,el,y+slot/2,sceneMs,k);
    else if(el.type==='duelFact')socialVideoLayoutDuelFactGroup(cmds,el,y,sceneMs,k);
    else if(el.type==='topscorerCard')socialVideoLayoutTopscorerGroup(cmds,el,y,sceneMs,k);
    y+=slot+gap;
  }
  return cmds;
}

/** Ein-Szeilen-Elemente (title/meta/stat/result) nacheinander senkrecht gestapelt, zentriert im verfügbaren
 * Bereich der Szene — reicht für die hier vorkommenden Elementzahlen (höchstens 4-5 je Szene) und hält sich
 * an die sicheren Ränder, da jede Textgröße bereits auf maxWidth=Inhaltsbreite begrenzt ist. */
function socialVideoLayoutScene(spec,scene,sceneMs,height){
  const cmds=[];
  const cx=SOCIAL_VIDEO_WIDTH/2;
  const contentW=socialVideoContentWidth();
  const topY=SOCIAL_VIDEO_SAFE_TOP;
  const bottomY=height-SOCIAL_VIDEO_SAFE_BOTTOM;
  const els=scene.elements||[];
  // Grobe Schlitzhöhe je Elementtyp, nur für die vertikale Verteilung (keine Schriftmessung).
  const slotH={logo:220,title:110,meta:56,stat:84,form:76,result:170,playerCard:210};
  const totalH=els.reduce((sum,el)=>sum+(slotH[el.type]||80),0);
  const available=bottomY-topY;
  // Lücken statt reiner Zentrierung (sonst klemmen wenige Elemente mittig mit riesigem Leerraum oben/unten
  // zusammen, siehe Build-Bericht): verteilt den übrigen Platz als Abstand VOR/ZWISCHEN den Elementen,
  // gedeckelt auf 100px je Lücke, damit auch sehr kurze Szenen (z. B. nur Logo) nicht grotesk auseinanderreißen.
  const gap=Math.min(100,Math.max(24,(available-totalH)/(els.length+1)));
  let y=topY+gap;
  for(const el of els){
    const p=socialVideoElementProgress(el.animation,el.delayMs,sceneMs);
    const riseOffset=(el.animation==='rise'||el.animation==='stagger')?(1-p.eased)*SOCIAL_VIDEO_RISE_PX:0;
    const slot=slotH[el.type]||80;
    const centerY=y+slot/2-riseOffset;
    if(p.opacity>0)switch(el.type){
      case'logo':{
        socialVideoPushLogo(cmds,{cx,cy:centerY,r:90,assetKey:el.asset,initials:matchcenterStoryInitials(el.team==='vfb-ulm'?'VfB Ulm':el.team),isUlm:el.team==='vfb-ulm',opacity:p.opacity});
        break;
      }
      case'title':{
        socialVideoPushText(cmds,{text:el.text,x:cx,y:centerY,baseSize:el.textStage==='tight'?42:56,maxWidth:contentW,font:'syne',color:'#fff',align:'center',opacity:p.opacity,group:'titel'});
        break;
      }
      case'meta':{
        socialVideoPushText(cmds,{text:el.text,x:cx,y:centerY,baseSize:22,maxWidth:contentW,font:'mono',color:'rgba(255,255,255,.7)',align:'center',opacity:p.opacity,letterSpacing:1,group:'meta'});
        break;
      }
      case'stat':{
        socialVideoPushText(cmds,{text:el.label,x:cx,y:centerY-20,baseSize:18,maxWidth:contentW,font:'mono',color:'#ffb1b8',align:'center',opacity:p.opacity,group:'stat'});
        const countP=el.animation==='count'?p.eased:1;
        const displayText=/^#\d+$/.test(el.text)?`#${Math.max(1,Math.round(parseInt(el.text.slice(1),10)*countP))}`:el.text;
        socialVideoPushText(cmds,{text:displayText,x:cx,y:centerY+22,baseSize:44,maxWidth:contentW,font:'syne',color:'#fff',align:'center',opacity:p.opacity,group:'stat'});
        break;
      }
      case'form':{
        socialVideoPushText(cmds,{text:el.label,x:cx,y:centerY-24,baseSize:16,maxWidth:contentW,font:'mono',color:'#ffb1b8',align:'center',opacity:p.opacity,group:'formzeile'});
        socialVideoPushForm(cmds,{letters:el.pills,cx,topY:centerY+16,delayMs:el.delayMs,sceneMs,size:34,group:'formzeile'});
        break;
      }
      case'result':{
        socialVideoPushText(cmds,{text:el.sub,x:cx,y:centerY-50,baseSize:20,maxWidth:contentW,font:'mono',color:'#ffb1b8',align:'center',opacity:p.opacity,group:'duell'});
        socialVideoPushText(cmds,{text:el.text,x:cx,y:centerY+30,baseSize:96,maxWidth:contentW,font:'syne',color:'#fff',align:'center',opacity:p.opacity*(el.animation==='count'?Math.max(0.01,p.eased):1),group:'duell'});
        break;
      }
      case'playerCard':{
        const cardY=centerY;
        const group=el.team==='ulm'?'topscorer-ulm':'topscorer-gegner';
        cmds.push({type:'rect',x:SOCIAL_VIDEO_SAFE_LEFT,y:cardY-85,w:contentW,h:170,rx:22,fill:{type:'linear',x0:0,y0:0,x1:1,y1:1,stops:[[0,'rgba(204,26,39,.30)'],[1,'rgba(14,3,6,.85)']]},opacity:p.opacity,group});
        socialVideoPushText(cmds,{text:el.team==='ulm'?'Ulm-Fokus':'Gegner-Fokus',x:SOCIAL_VIDEO_SAFE_LEFT+28,y:cardY-50,baseSize:16,maxWidth:contentW-56,font:'mono',color:'#fff0bd',align:'left',opacity:p.opacity,group});
        socialVideoPushText(cmds,{text:el.name,x:SOCIAL_VIDEO_SAFE_LEFT+28,y:cardY-14,baseSize:34,maxWidth:contentW-56,font:'syne',color:'#fff',align:'left',opacity:p.opacity,group});
        socialVideoPushText(cmds,{text:el.stat,x:SOCIAL_VIDEO_SAFE_LEFT+28,y:cardY+22,baseSize:22,maxWidth:contentW-56,font:'mono',color:'#ffd38a',align:'left',opacity:p.opacity,group});
        socialVideoPushText(cmds,{text:el.note,x:SOCIAL_VIDEO_SAFE_LEFT+28,y:cardY+54,baseSize:18,maxWidth:contentW-56,font:'inter',color:'rgba(255,255,255,.7)',align:'left',opacity:p.opacity,group});
        break;
      }
    }
    y+=slot+gap;
  }
  return cmds;
}

/** Hintergrund + Skyline + Spatzen + (nur Intro/Abschluss) Fahne — Abschnitt 4.4: "zählen nicht in die Grenze
 * von zwei animierten Elementen pro Szene", Deckkraft der Hintergrundebene höchstens 0,35 hinter Textbereichen. */
function socialVideoBackgroundLayer(spec,timeMs,height,sceneId){
  const cmds=[];
  // cacheable:true (Rechenbudget Abschnitt 4.4): Hintergrund, Glow und die Skyline-BASIS ändern sich zwischen
  // Frames nur durch die kleine Parallaxe (x) — Schicht B rendert sie einmal in ein Offscreen-Canvas und
  // kopiert/verschiebt sie danach nur noch (billige drawImage-Operation statt erneutem Pfad-/Verlaufsaufbau).
  // Der Sweep-Highlight-Pfad und alles danach (Spatzen, Fahne) ist NICHT cacheable (ändert sich jeden Frame).
  cmds.push({type:'background',x:0,y:0,w:SOCIAL_VIDEO_WIDTH,h:height,fill:'#0E0306',cacheable:true,group:'hintergrund'});
  cmds.push({type:'circle',x:SOCIAL_VIDEO_WIDTH*0.72,y:height*0.06,r:SOCIAL_VIDEO_WIDTH*0.5,fill:{type:'radial',cx:0.5,cy:0.5,stops:[[0,'rgba(204,26,39,.5)'],[1,'rgba(204,26,39,0)']]},opacity:1,cacheable:true,group:'hintergrund'});
  const introMs=(spec.scenes?.[0]?.endMs)||2400;
  const skyline=socialVideoSkylineTransform(timeMs,spec.durationMs||15000,introMs);
  const scale=SOCIAL_VIDEO_WIDTH/SOCIAL_VIDEO_SKYLINE_VIEWBOX.w;
  const skylineY=height-SOCIAL_VIDEO_SKYLINE_VIEWBOX.h*scale*0.62;
  cmds.push({type:'path',d:SOCIAL_VIDEO_SKYLINE_PATH_D,x:skyline.parallaxX,y:skylineY,scale,fill:null,stroke:'rgba(148,163,184,.3)',strokeWidth:2.4/scale,opacity:0.9,cacheable:true,cacheOffsetX:skyline.parallaxX,group:'skyline'});
  if(skyline.sweepProgress<1){
    cmds.push({type:'path',d:SOCIAL_VIDEO_SKYLINE_PATH_D,x:skyline.parallaxX,y:skylineY,scale,fill:null,stroke:'#ff304d',strokeWidth:3/scale,opacity:1,clipSweepFrac:skyline.sweepProgress,group:'skyline'});
  }
  for(const s of socialVideoSparrowPositions(timeMs,SOCIAL_VIDEO_WIDTH,height)){
    cmds.push({type:'image',assetKey:'assets/spatz.svg',x:s.x,y:s.y,w:24,h:20,opacity:Math.min(0.48,s.opacity),group:'spatzen'});
  }
  if(sceneId==='intro'||sceneId==='outro'){
    const flagW=360,flagH=240,flagX=SOCIAL_VIDEO_WIDTH/2-flagW/2,flagY=height*0.5-flagH/2;
    const stripW=4;
    for(let sx=0;sx<flagW;sx+=stripW){
      const dy=socialVideoFlagColumnOffset(sx,flagW,flagH,timeMs);
      const crestFactor=Math.cos((sx/(flagW*0.5))*2*Math.PI+socialVideoFlagPhase(timeMs));
      const squeeze=1-Math.max(0,crestFactor)*0.04;
      const brightness=1+crestFactor*0.12;
      // srcRect als Anteile (0..1) der tatsächlichen Quellbild-Größe, NICHT als Pixel: Schicht A kennt die
      // natürlichen Maße von assets/vfb-ulm-logo-mark.png nicht (rein, lädt kein Bild) — Schicht B rechnet
      // beim Zeichnen mit img.naturalWidth/-Height um (siehe socialVideoDrawCommand, Fall 'image').
      cmds.push({type:'image',assetKey:'assets/vfb-ulm-logo-mark.png',srcRect:{xFrac:sx/flagW,yFrac:0,wFrac:stripW/flagW,hFrac:1},x:flagX+sx*squeeze,y:flagY+dy,w:stripW*squeeze,h:flagH,opacity:1,brightness,group:'flagge'});
    }
    cmds.push({type:'rect',x:flagX-6,y:flagY-20,w:6,h:flagH+40,fill:'#8a7a52',opacity:1,group:'flagge'});
    cmds.push({type:'rect',x:flagX,y:flagY+flagH+4,w:flagW,h:18,fill:{type:'linear',x0:0,y0:0,x1:0,y1:1,stops:[[0,'rgba(0,0,0,.35)'],[1,'rgba(0,0,0,0)']]},opacity:0.6,group:'flagge'});
  }
  return cmds;
}

/**
 * socialVideoDrawList(spec, timeMs) — SCHICHT A, Hauptfunktion (Spezifikation Abschnitt 3.2). Reine Funktion:
 * dieselbe spec + dasselbe timeMs liefern immer dieselbe (deep-equal) Liste. Zeichnet nichts selbst.
 * @param {object} spec Ergebnis von buildSocialVideoSpec() (EIN Objekt, nicht das Array bei 'story-9x16')
 * @param {number} timeMs 0..spec.durationMs
 * @returns {Array<object>} Zeichenbefehle in Zeichenreihenfolge (Hintergrund zuerst, Inhalt zuletzt)
 */
const SOCIAL_VIDEO_KANON_SCENE_IDS=new Set(['opponent','opponentA','opponentB']);
function socialVideoDrawList(spec,timeMs){
  const height=socialVideoHeightForFormat(spec?.format);
  const at=socialVideoSceneAt(spec,timeMs);
  const sceneId=at?.scene?.id||null;
  const isKanonScene=SOCIAL_VIDEO_KANON_SCENE_IDS.has(sceneId);
  const cmds=[...socialVideoBackgroundLayer(spec,timeMs,height,sceneId)];
  if(!isKanonScene){
    // Abdunkelnder Verlauf unter dem Inhaltsbereich, NUR für die noch nicht auf Kanon 2a umgestellten Szenen
    // (intro/lastDuel/playersToWatch/outro) — Kanon 2a verbietet Verlaufsfüllungen hinter Text, siehe
    // Abschlussbericht ("Prüfbar"-Abschnitt).
    cmds.push({type:'rect',x:0,y:SOCIAL_VIDEO_SAFE_TOP-40,w:SOCIAL_VIDEO_WIDTH,h:height-SOCIAL_VIDEO_SAFE_TOP-SOCIAL_VIDEO_SAFE_BOTTOM+80,fill:{type:'linear',x0:0,y0:0,x1:0,y1:1,stops:[[0,'rgba(0,0,0,.1)'],[0.5,'rgba(0,0,0,.35)'],[1,'rgba(0,0,0,.1)']]},opacity:0.35,group:'abdunklung'});
  }
  if(spec?.scenes?.length){
    const idx=spec.scenes.findIndex(s=>s.id===sceneId);
    cmds.push(...socialVideoPushProgressBar(spec.scenes.length,idx));
    cmds.push(...socialVideoPushHeaderBar(spec,at?.scene));
  }
  if(at){
    if(isKanonScene)cmds.push(...socialVideoLayoutOpponentKanon(spec,at.scene,at.sceneMs,height));
    else cmds.push(...socialVideoLayoutScene(spec,at.scene,at.sceneMs,height));
  }
  return cmds;
}

// ═════════════════════════════════════════════════════════════════════════
// S2e — Renderer-Werkstatt, Stufe 2 (Bausteine adressierbar machen). Jeder Zeichenbefehl trägt seit Stufe 2
// ein `group`-Feld aus dieser festen Liste — die Werkstatt (Stufe 3) nutzt es, um einzelne Bausteine isoliert
// anzuzeigen/zu exportieren. Dekorative Gruppen (Hintergrundebene, siehe socialVideoBackgroundLayer) zählen
// NICHT in die Kanon-2a-Grenze "höchstens 5 Gruppen je Szene" — die zählt nur Gruppen, die tatsächlich Inhalt
// zeigen (auch Kopfzeile/Fortschrittsbalken, siehe Kommentar an socialVideoLayoutOpponentKanon).
// ═════════════════════════════════════════════════════════════════════════
const SOCIAL_VIDEO_GROUP_NAMES=[
  'hintergrund','skyline','spatzen','flagge', // dekorative Hintergrundebene
  'fortschritt','kopfzeile', // szenenübergreifendes Chrom
  'logo-ulm','logo-gegner','vergleich','formzeile','duell','topscorer', // Kanon-2a-Gegner-Szene
  'abdunklung','titel','meta','stat','topscorer-ulm','topscorer-gegner', // noch nicht auf Kanon 2a umgestellte Szenen
];
const SOCIAL_VIDEO_DECORATIVE_GROUPS=new Set(['hintergrund','skyline','spatzen','flagge','abdunklung']);

/** Bounding-Box EINES Zeichenbefehls in Canvas-Koordinaten — rein rechnerisch, kein Canvas. Für Text wird
 * dieselbe Zeichenbreiten-Schätzung wie socialVideoPushText/socialVideoEstimateFontSize verwendet (charFactor
 * 0,6 für mono, sonst 0,66 — deckt alle tatsächlichen Aufrufstellen ab, siehe dort), textBaseline='middle' in
 * Schicht B macht die Box vertikal um y zentriert. Für Pfade (Skyline) wird die bekannte Viewbox skaliert statt
 * den SVG-Pfad zu parsen — eine Näherung (der Pfad füllt die Viewbox nicht randvoll), ausreichend für die
 * Werkstatt-Hilfslinien. */
function socialVideoCommandBBox(cmd){
  switch(cmd.type){
    case'background':
    case'rect':
    case'image':
      return{x0:cmd.x,y0:cmd.y,x1:cmd.x+(cmd.w||0),y1:cmd.y+(cmd.h||0)};
    case'circle':
      return{x0:cmd.x-cmd.r,y0:cmd.y-cmd.r,x1:cmd.x+cmd.r,y1:cmd.y+cmd.r};
    case'path':{
      const scale=cmd.scale||1;
      return{x0:cmd.x,y0:cmd.y,x1:cmd.x+SOCIAL_VIDEO_SKYLINE_VIEWBOX.w*scale,y1:cmd.y+SOCIAL_VIDEO_SKYLINE_VIEWBOX.h*scale};
    }
    case'text':{
      const factor=cmd.font==='mono'?0.6:0.66;
      const w=Math.max(1,String(cmd.text||'').length)*factor*cmd.size;
      const h=cmd.size;
      const x0=cmd.align==='left'?cmd.x:cmd.x-w/2;
      return{x0,y0:cmd.y-h/2,x1:x0+w,y1:cmd.y+h/2};
    }
    default:
      return{x0:cmd.x||0,y0:cmd.y||0,x1:(cmd.x||0)+(cmd.w||0),y1:(cmd.y||0)+(cmd.h||0)};
  }
}

/** Fasst eine Zeichenliste (EIN Zeitpunkt, siehe socialVideoDrawList) nach `group` zusammen: je Gruppe Name,
 * Kommandoanzahl und eine Bounding-Box (Vereinigung aller Kommando-Boxen dieser Gruppe). Reine Funktion, kein
 * Canvas. Kommandos ohne group (sollte nicht vorkommen, siehe Testdatei) landen unter 'ohne-gruppe'. */
function socialVideoDrawListGroups(drawList){
  const byName=new Map();
  for(const cmd of drawList||[]){
    const name=cmd.group||'ohne-gruppe';
    const b=socialVideoCommandBBox(cmd);
    let g=byName.get(name);
    if(!g){g={name,count:0,bbox:{x0:b.x0,y0:b.y0,x1:b.x1,y1:b.y1}};byName.set(name,g);}
    g.count+=1;
    g.bbox.x0=Math.min(g.bbox.x0,b.x0);
    g.bbox.y0=Math.min(g.bbox.y0,b.y0);
    g.bbox.x1=Math.max(g.bbox.x1,b.x1);
    g.bbox.y1=Math.max(g.bbox.y1,b.y1);
  }
  return[...byName.values()];
}

/** timeMs innerhalb einer Szene (Standardmäßig 85% hinein: alle Fade-/Count-Animationen sind dann sicher
 * abgeschlossen, siehe socialVideoElementProgress — höchste delayMs+Dauer in dieser Spezifikation ist 600ms). */
function socialVideoSceneTimeMs(spec,sceneId,fraction=0.85){
  const scene=(spec?.scenes||[]).find(s=>s.id===sceneId);
  if(!scene)return 0;
  return scene.startMs+(scene.endMs-scene.startMs)*fraction;
}
/** Zeitpunkt für den EINEN Standbild-Export (Umfangspunkt 3 dieser Phase): die informationsdichteste Szene,
 * settled (85% hinein) — Story: Gegner-Szene (Matchup+Form), Feed: letzte vorhandene Gegner-Szene. */
function socialVideoStandbildTimeMs(spec){
  const scenes=spec?.scenes||[];
  if(!scenes.length)return 0;
  const preferredIds=spec.format==='feed-4x5'?['opponentB','opponentA']:['opponent'];
  for(const id of preferredIds)if(scenes.some(s=>s.id===id))return socialVideoSceneTimeMs(spec,id);
  return socialVideoSceneTimeMs(spec,scenes[scenes.length-1].id);
}

// ═════════════════════════════════════════════════════════════════════════
// S2 — Canvas2D-Renderer, SCHICHT B (docs/social-video-spezifikation.md Abschnitt 3.2): browserseitig, dünn.
// Kein Layout, keine Animationslogik hier — nur Übersetzung der von Schicht A gelieferten Befehle in
// Canvas2D-Aufrufe, plus Asset-Laden/MediaRecorder-Orchestrierung (reines I/O, nicht testbar ohne Browser,
// deshalb bewusst von Schicht A getrennt).
// ═════════════════════════════════════════════════════════════════════════

// Gradient-Cache (Performance, Rechenbudget 4.4): dieselbe Form/Position erzeugt bei jedem Frame denselben
// CanvasGradient — ohne Cache wird bei jedem Frame für jedes gradientgefüllte Element (Pillen, Logokreise,
// Karten, Verlauf) ein neues Gradient-Objekt angelegt, was messbar GC-Druck erzeugt (vereinzelte
// Frame-Ausreißer deutlich über 25ms wurden in echten Browser-Messungen beobachtet, siehe Build-Bericht).
// Pro Canvas-Kontext ein Cache (WeakMap, räumt sich mit dem Context selbst auf).
const _socialVideoGradientCache=new WeakMap();
function socialVideoApplyFillStyle(ctx,fill,x,y,w,h){
  if(!fill)return null;
  if(typeof fill==='string')return fill;
  let cache=_socialVideoGradientCache.get(ctx);
  if(!cache){cache=new Map();_socialVideoGradientCache.set(ctx,cache);}
  const key=`${fill.type}|${x}|${y}|${w}|${h}|${JSON.stringify(fill.stops)}|${fill.x0}|${fill.y0}|${fill.x1}|${fill.y1}|${fill.cx}|${fill.cy}`;
  const cached=cache.get(key);
  if(cached)return cached;
  let g;
  if(fill.type==='linear'){
    g=ctx.createLinearGradient(x+fill.x0*w,y+fill.y0*h,x+fill.x1*w,y+fill.y1*h);
    for(const[off,c]of fill.stops)g.addColorStop(off,c);
  }else if(fill.type==='radial'){
    const cx=x+fill.cx*w,cy=y+fill.cy*h,r=Math.max(w,h)/2;
    g=ctx.createRadialGradient(cx,cy,0,cx,cy,r);
    for(const[off,c]of fill.stops)g.addColorStop(off,c);
  }else{
    g='#000';
  }
  cache.set(key,g);
  return g;
}
function socialVideoFontString(cmd){
  const family=cmd.font==='mono'?"'DM Mono'":cmd.font==='inter'?"'Inter'":"'Syne'";
  return`${cmd.weight||900} ${Math.round(cmd.size)}px ${family}`;
}
/** Führt EINEN Zeichenbefehl aus (reine Übersetzung, kein Layout). assets = {assetKey: HTMLImageElement}, nur
 * erfolgreich geladene Bilder enthalten — fehlt ein Schlüssel, wird der image-Befehl übersprungen, der von
 * Schicht A darunter bereits gezeichnete Fallback (Ring/Initialen) bleibt sichtbar. */
function socialVideoDrawCommand(ctx,cmd,assets){
  ctx.save();
  ctx.globalAlpha=cmd.opacity??1;
  switch(cmd.type){
    case'background':
      ctx.fillStyle=cmd.fill;
      ctx.fillRect(cmd.x,cmd.y,cmd.w,cmd.h);
      break;
    case'rect':{
      ctx.fillStyle=socialVideoApplyFillStyle(ctx,cmd.fill,cmd.x,cmd.y,cmd.w,cmd.h);
      if(cmd.rx&&ctx.roundRect){ctx.beginPath();ctx.roundRect(cmd.x,cmd.y,cmd.w,cmd.h,cmd.rx);ctx.fill();}
      else ctx.fillRect(cmd.x,cmd.y,cmd.w,cmd.h);
      break;
    }
    case'circle':{
      ctx.beginPath();
      ctx.arc(cmd.x,cmd.y,cmd.r,0,Math.PI*2);
      if(cmd.fill){ctx.fillStyle=socialVideoApplyFillStyle(ctx,cmd.fill,cmd.x-cmd.r,cmd.y-cmd.r,cmd.r*2,cmd.r*2);ctx.fill();}
      if(cmd.stroke){ctx.strokeStyle=cmd.stroke;ctx.lineWidth=cmd.strokeWidth||2;ctx.stroke();}
      break;
    }
    case'path':{
      const p=new Path2D(cmd.d);
      ctx.translate(cmd.x,cmd.y);
      ctx.scale(cmd.scale||1,cmd.scale||1);
      if(cmd.clipSweepFrac!==undefined){
        ctx.beginPath();
        ctx.rect(0,0,SOCIAL_VIDEO_SKYLINE_VIEWBOX.w*cmd.clipSweepFrac,SOCIAL_VIDEO_SKYLINE_VIEWBOX.h);
        ctx.clip();
      }
      if(cmd.fill){ctx.fillStyle=cmd.fill;ctx.fill(p);}
      if(cmd.stroke){ctx.strokeStyle=cmd.stroke;ctx.lineWidth=cmd.strokeWidth||1;ctx.stroke(p);}
      break;
    }
    case'text':{
      ctx.font=socialVideoFontString(cmd);
      ctx.fillStyle=cmd.color;
      ctx.textAlign=cmd.align||'center';
      ctx.textBaseline='middle';
      if(cmd.letterSpacing&&'letterSpacing'in ctx)ctx.letterSpacing=`${cmd.letterSpacing}px`;
      ctx.fillText(cmd.text,cmd.x,cmd.y);
      break;
    }
    case'image':{
      const img=assets?.[cmd.assetKey];
      if(!img)break;
      // Dunkle Logos lesbar machen (S2c/S2d-Auftrag B3): Stufe aus der Asset-Aufbereitung
      // (scripts/cache-team-logos.mjs --embed, window.SOCIAL_VIDEO_ASSET_TREATMENT = {relPath:{tier,factor?}})
      // — 'invert' (annähernd einfarbig, MIT erkennbarer Struktur im Original) hellt per Canvas-Filter auf,
      // 'lift' (farbig, z. B. Vereinsrot) überblendet im Bild Richtung gebrochenes Weiß (factor = Mischanteil
      // — eine Mischung hebt echtes Schwarz an, eine reine brightness()-Multiplikation nicht, siehe
      // cache-team-logos.mjs), 'silhouette' zeichnet eine einfarbig gebrochen-weiße Form aus der Alpha-Maske
      // des Bildes (kein Ring, keine Platte dahinter, siehe Kommentar unten) — für Logos ohne genug
      // erkennbare Struktur, bei denen Aufhellen/Invertieren nur zu einem verwaschenen Fleck führen würde.
      const treatment=window.SOCIAL_VIDEO_ASSET_TREATMENT?.[cmd.assetKey]?.tier||'none';
      const treatmentFactor=window.SOCIAL_VIDEO_ASSET_TREATMENT?.[cmd.assetKey]?.factor;
      // Zusicherung (S2e-Auftrag Stufe 4, Nachtrag zum S2d-Fix): das VfB-Ulm-Wappen wird NIE silhouettiert
      // oder invertiert gezeichnet — bricht lieber laut ab, als still falsch zu rendern, falls eine künftige
      // Änderung an scripts/cache-team-logos.mjs --embed oder window.SOCIAL_VIDEO_ASSET_TREATMENT diese Regel
      // versehentlich verletzt (siehe EMBED_FORCE_COLOR_PRESERVING_PATHS dort).
      if(SOCIAL_VIDEO_VFB_ULM_ASSET_KEYS.has(cmd.assetKey)&&(treatment==='silhouette'||treatment==='invert')){
        throw new Error(`Zusicherung verletzt: VfB-Ulm-Logo (${cmd.assetKey}) hätte Behandlung "${treatment}" bekommen — verboten, immer Originalfarben.`);
      }
      const filters=[];
      if(cmd.brightness&&cmd.brightness!==1)filters.push(`brightness(${cmd.brightness})`);
      if(cmd.desaturate)filters.push('saturate(0.35) brightness(0.92)');
      if(treatment==='invert')filters.push('invert(1)');
      if(filters.length)ctx.filter=filters.join(' ');
      if(cmd.clip==='circle'){ctx.beginPath();ctx.arc(cmd.cx,cmd.cy,cmd.cr,0,Math.PI*2);ctx.clip();}
      if(cmd.srcRect){
        // srcRect ist in Anteilen (0..1) der tatsächlichen Quellbild-Größe angegeben (siehe
        // socialVideoBackgroundLayer/Fahne) — erst hier in Pixel umgerechnet, da nur Schicht B das geladene
        // Image-Objekt (und damit naturalWidth/-Height) kennt.
        const nw=img.naturalWidth||img.width,nh=img.naturalHeight||img.height;
        const sr=cmd.srcRect;
        ctx.drawImage(img,sr.xFrac*nw,sr.yFrac*nh,sr.wFrac*nw,sr.hFrac*nh,cmd.x,cmd.y,cmd.w,cmd.h);
      }else if(treatment==='silhouette'||treatment==='lift'){
        // 'silhouette' UND 'lift' komponieren auf einem transparenten Offscreen-Canvas (source-atop auf dem
        // HAUPT-Canvas würde gegen den bereits gezeichneten, deckenden Hintergrund maskieren und die GANZE
        // Bildbox füllen statt nur die Logoform). 'silhouette' füllt bei voller Deckkraft (reine Kontur aus
        // der Alpha-Maske), 'lift' bei reduzierter Deckkraft (globalAlpha=factor) — das MISCHT das
        // Originalbild mit gebrochenem Weiß, hebt dadurch auch echtes Schwarz an und erhält dabei den
        // Farbton (anders als eine reine Kanal-Multiplikation, siehe cache-team-logos.mjs).
        const silCanvas=document.createElement('canvas');
        silCanvas.width=Math.max(1,Math.round(cmd.w));
        silCanvas.height=Math.max(1,Math.round(cmd.h));
        const silCtx=silCanvas.getContext('2d');
        silCtx.drawImage(img,0,0,cmd.w,cmd.h);
        silCtx.globalCompositeOperation='source-atop';
        silCtx.globalAlpha=treatment==='lift'?(treatmentFactor??0.5):1;
        silCtx.fillStyle=SOCIAL_VIDEO_INK;
        silCtx.fillRect(0,0,cmd.w,cmd.h);
        ctx.drawImage(silCanvas,cmd.x,cmd.y,cmd.w,cmd.h);
      }else ctx.drawImage(img,cmd.x,cmd.y,cmd.w,cmd.h);
      break;
    }
  }
  ctx.restore();
}

/** Rechenbudget (Abschnitt 4.4): Hintergrund/Glow/Skyline-Basis (cacheable:true, siehe socialVideoBackgroundLayer)
 * werden EINMAL in ein Offscreen-Canvas gerendert; socialVideoRenderFrame kopiert sie danach nur noch (ein
 * drawImage, um die kleine Parallaxe verschoben) statt Pfad/Verläufe erneut aufzubauen. */
function socialVideoBuildStaticLayer(baselineDrawList,width,height){
  const canvas=document.createElement('canvas');
  canvas.width=width;canvas.height=height;
  const ctx=canvas.getContext('2d');
  for(const cmd of baselineDrawList)if(cmd.cacheable)socialVideoDrawCommand(ctx,{...cmd,x:(cmd.x||0)-(cmd.cacheOffsetX||0)},{});
  return canvas;
}

/** Führt eine vollständige Zeichenliste aus. staticLayer (optional) ersetzt alle cacheable-Befehle durch
 * einen einzigen verschobenen Blit (siehe socialVideoBuildStaticLayer); ohne staticLayer werden sie regulär
 * (einzeln) gezeichnet — Fallback für den Standbild-/Kontaktbogen-Export, wo sich Prerendering nicht lohnt. */
function socialVideoRenderFrame(ctx,drawList,assets,staticLayer){
  let staticBlitted=false;
  for(const cmd of drawList){
    if(cmd.cacheable&&staticLayer){
      if(!staticBlitted){ctx.drawImage(staticLayer,cmd.cacheOffsetX||0,0);staticBlitted=true;}
      continue;
    }
    socialVideoDrawCommand(ctx,cmd,assets);
  }
}

/** Lädt alle in einer Story-/Feed-Spec referenzierten Bild-Assets einmal — AUSSCHLIESSLICH aus
 * window.SOCIAL_VIDEO_ASSETS (data:-URIs, siehe social-video-assets.js/scripts/cache-team-logos.mjs --embed),
 * NIE aus einem assets/…-Dateipfad: unter file:// behandelt Chrome jede lokale Datei als eigene fremde
 * Herkunft, auch ein per <img src="assets/…"> von derselben Festplatte geladenes Bild verunreinigt das
 * Canvas (captureStream()/toDataURL() schlagen danach fehl) — data:-URIs haben dieses Problem nicht. Fehlt
 * ein Schlüssel in SOCIAL_VIDEO_ASSETS (z. B. social-video-assets.js nie erzeugt, oder Team-Logo nicht
 * gecacht), enthält das Ergebnis einfach keinen Eintrag dafür; der Initialen-Fallback greift (siehe
 * socialVideoDrawCommand, Fall 'image'). Fehlschläge werden NICHT geworfen. */
async function socialVideoLoadAssets(spec){
  const keys=new Set(['assets/spatz.svg','assets/vfb-ulm-logo-mark.png']);
  for(const scene of spec?.scenes||[])for(const el of scene.elements||[]){
    if(el.type==='logo'&&el.asset)keys.add(el.asset);
    if(el.type==='matchupPair'&&el.opp?.asset)keys.add(el.opp.asset);
  }
  const source=window.SOCIAL_VIDEO_ASSETS||{};
  const assets={};
  await Promise.all([...keys].map(key=>new Promise(resolve=>{
    const dataUri=source[key];
    if(!dataUri){resolve();return;}
    const img=new Image();
    img.onload=()=>{assets[key]=img;resolve();};
    img.onerror=()=>resolve();
    img.src=dataUri;
  })));
  return assets;
}

function socialVideoCreateCanvas(width,height){
  const canvas=document.createElement('canvas');
  canvas.width=width;canvas.height=height;
  canvas.style.position='fixed';
  canvas.style.left='-99999px';
  canvas.style.top='0';
  document.body.appendChild(canvas);
  return canvas;
}

/** Erster unterstützter WebM-MimeType (VP9 bevorzugt, sonst VP8, sonst generisches WebM — Spezifikation 3.2). */
function socialVideoPickMimeType(){
  const candidates=['video/webm;codecs=vp9','video/webm;codecs=vp8','video/webm'];
  for(const c of candidates)if(globalThis.MediaRecorder?.isTypeSupported?.(c))return c;
  return globalThis.MediaRecorder?'video/webm':null;
}

/** Reiner Hinweistext bei gescheitertem Canvas-Export (S2-Nachtrag, Umfangspunkt 2: ehrliche Vorprüfung statt
 * Sammelmeldung nach voller Aufnahmedauer) — ohne Canvas/DOM testbar. isFileProtocol kommt von
 * location.protocol==='file:' (einziger DOM-Bezug, bewusst beim Aufrufer belassen). */
function socialVideoCanvasExportHint(isFileProtocol){
  if(isFileProtocol){
    return'Videoerzeugung über file:// nicht möglich, weil der Browser lokale Bilder als fremde Herkunft behandelt. '
      +'Bitte die App über einen lokalen Server öffnen: node scripts/serve.mjs, dann http://localhost:5173 aufrufen.';
  }
  return'Videoerzeugung in diesem Browser nicht möglich (Canvas-Export fehlgeschlagen). Bitte einen aktuellen Chromium-basierten Browser verwenden.';
}

/** Markiert einen Fehler mit dem Schritt, in dem er auftrat (Umfangspunkt 4: keine Sammelmeldung mehr,
 * sondern Schritt/Fehlername/Fehlermeldung) und, falls es ein Canvas-Taint-Fehler ist (SecurityError), mit
 * dem passenden Hinweistext aus socialVideoCanvasExportHint. Loggt zusätzlich das volle Fehlerobjekt. */
function socialVideoTagStepError(step,cause){
  const err=new Error(cause?.message||String(cause));
  err.name=cause?.name||'Error';
  err.step=step;
  err.cause=cause;
  if(err.name==='SecurityError')err.hint=socialVideoCanvasExportHint(location.protocol==='file:');
  console.error(`[Social-Video] Schritt "${step}" fehlgeschlagen:`,cause);
  return err;
}

/** Baut die Nutzermeldung für einen fehlgeschlagenen Schritt (Umfangspunkt 4: kein Sammel-Alert mehr, der nur
 * "X konnte nicht erzeugt werden" sagt) — nutzt e.hint, falls vorhanden (Canvas-Taint, s.
 * socialVideoTagStepError), sonst Schritt, Fehlername und Fehlermeldung. */
function socialVideoFormatErrorAlert(prefix,e){
  if(e?.hint)return e.hint;
  return`${prefix} (Schritt: ${e?.step||'unbekannt'}, ${e?.name||'Error'}: ${e?.message||e}).`;
}

/** Zeichnet EIN Standbild aus spec bei timeMs auf einen frischen Canvas und liefert eine PNG-Data-URL.
 * Ersetzt den SVG-foreignObject-Weg für die S1-Standbildausgabe (Spezifikation Umfangspunkt 3 dieser Phase).
 * toDataURL() ist zugleich die ehrliche Vorprüfung (Umfangspunkt 2): schlägt sie fehl (getaintetes Canvas),
 * trägt der geworfene Fehler den passenden Hinweis (.hint, siehe socialVideoTagStepError). */
async function socialVideoRenderStandbildDataUrl(spec,timeMs){
  const width=SOCIAL_VIDEO_WIDTH,height=socialVideoHeightForFormat(spec.format);
  const canvas=document.createElement('canvas');
  canvas.width=width;canvas.height=height;
  const ctx=canvas.getContext('2d');
  // S2e-Aufgabe 1: Schriften UND Bilder parallel bereitstellen, keine Zeichnung vor beidem (siehe
  // socialVideoEnsureFontsReady — schützt jetzt auch Aufrufer, die das selbst vergessen, siehe dortiger
  // Kommentar zum tatsächlich gefundenen Fehler in window.generateSocialVideoContactSheets).
  const [assets]=await Promise.all([socialVideoLoadAssets(spec),socialVideoEnsureFontsReady()]);
  socialVideoRenderFrame(ctx,socialVideoDrawList(spec,timeMs),assets,null);
  try{
    return canvas.toDataURL('image/png');
  }catch(e){
    throw socialVideoTagStepError('toDataURL',e);
  }
}

/** Orchestriert eine komplette Aufnahme (Spezifikation 3.2/4, Umfangspunkt 4). Zeichnen und Aufnehmen sind
 * ENTKOPPELT (S2d-Nachtrag): captureStream(0)+requestFrame allein reichte nicht — gemessen wurden nur 330
 * statt 450 Bilder (13,02s statt 15,0s), vermutlich weil gelegentlich teure Frames (siehe Rechenbudget-
 * Ausreißer im S2-Bericht) die Takt-Schleife verzögerten und dadurch requestFrame()-Aufrufe ungleichmäßig
 * oder zu spät kamen. Jetzt zweiphasig:
 *   Phase 1 — alle Bilder EINMAL berechnen, unabhängig von Echtzeit, als komprimierte WebP-Blobs
 *   zwischengespeichert (Roh-Bitmaps wären bei 1080×1920×450 Bildern mehrere GB groß, siehe Kommentar unten).
 *   Phase 2 — die gespeicherten Bilder in striktem 1000/30-ms-Takt an den Recorder geben, je EIN
 *   requestFrame()-Aufruf pro Bild; die Takt-Schleife zeichnet dabei nur noch ein fertiges Bild (billiges
 *   drawImage), keine Schriftmessung/Verlaufsaufbau mehr — das war die Fehlerquelle für Verzögerungen.
 * Fortschritt pro Phase über onProgress ({phase:'render'|'capture',...}), Abbruch über AbortSignal. Gibt
 * {blob,mimeType,frameCount} zurück oder null bei fehlendem MediaRecorder/Abbruch; schlägt der Export fehl
 * (Canvas-Taint), wirft sie einen Fehler mit .step/.hint (siehe socialVideoTagStepError). */
async function socialVideoCaptureVideo(spec,{onProgress,signal}={}){
  if(!globalThis.MediaRecorder||!HTMLCanvasElement.prototype.captureStream)return null;
  const mimeType=socialVideoPickMimeType();
  if(!mimeType)return null;
  const width=SOCIAL_VIDEO_WIDTH,height=socialVideoHeightForFormat(spec.format);
  const canvas=socialVideoCreateCanvas(width,height);
  try{
    const ctx=canvas.getContext('2d');
    // S2e-Aufgabe 1: siehe Kommentar an socialVideoRenderStandbildDataUrl — keine Aufnahme vor Schriften+Bildern.
    const [assets]=await Promise.all([socialVideoLoadAssets(spec),socialVideoEnsureFontsReady()]);
    const staticLayer=socialVideoBuildStaticLayer(socialVideoDrawList(spec,0),width,height);
    const durationMs=spec.durationMs||15000;
    const frameIntervalMs=1000/SOCIAL_VIDEO_FPS;
    const frameCount=Math.round(durationMs/frameIntervalMs);

    // Phase 1: alle Bilder berechnen. WebP (statt PNG) hält den Speicherbedarf klein genug, um alle 450
    // Blobs gleichzeitig im Speicher zu halten (einige MB statt mehrerer GB als Roh-Bitmaps); die minimale
    // Kompressionsverlust fällt neben der ohnehin verlustbehafteten VP9/VP8-Endkodierung nicht ins Gewicht.
    const frameBlobs=[];
    for(let i=0;i<frameCount;i++){
      if(signal?.aborted)return null;
      const t=Math.min(i*frameIntervalMs,durationMs);
      socialVideoRenderFrame(ctx,socialVideoDrawList(spec,t),assets,staticLayer);
      const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/webp',0.92));
      if(blob)frameBlobs.push(blob);
      onProgress?.({phase:'render',elapsedMs:t,durationMs,frameIndex:i,frameCount});
    }

    // Phase 2: in gleichmäßigem Takt an den Recorder geben.
    let stream;
    try{
      stream=canvas.captureStream(0);
    }catch(e){
      throw socialVideoTagStepError('captureStream',e);
    }
    const track=stream.getVideoTracks()[0];
    const recorder=new MediaRecorder(stream,{mimeType,videoBitsPerSecond:6_000_000});
    const chunks=[];
    recorder.ondataavailable=e=>{if(e.data&&e.data.size)chunks.push(e.data);};
    const stopped=new Promise(resolve=>{recorder.onstop=resolve;});
    recorder.start();
    let aborted=false;
    const onAbort=()=>{aborted=true;};
    signal?.addEventListener('abort',onAbort);
    // setTimeout statt requestAnimationFrame: rAF wird von Browsern in nicht sichtbaren/fokussierten Tabs
    // gedrosselt oder ganz ausgesetzt (siehe S2-Bericht) — für eine zeitgetreue Aufnahme ist setTimeout mit
    // wall-clock-Neuausrichtung (nextAt+=Intervall) robuster. Jeder Schritt zeichnet hier nur noch ein in
    // Phase 1 fertig berechnetes Bild, nicht mehr die Szene selbst.
    const startedAt=performance.now();
    await new Promise(resolve=>{
      let nextAt=startedAt;
      let i=0;
      const step=async()=>{
        if(aborted||i>=frameBlobs.length){resolve();return;}
        const bitmap=await createImageBitmap(frameBlobs[i]);
        ctx.drawImage(bitmap,0,0,width,height);
        bitmap.close();
        track.requestFrame?.();
        onProgress?.({phase:'capture',elapsedMs:Math.min(i*frameIntervalMs,durationMs),durationMs,frameIndex:i,frameCount:frameBlobs.length});
        i+=1;
        if(aborted||i>=frameBlobs.length){resolve();return;}
        nextAt+=frameIntervalMs;
        setTimeout(step,Math.max(0,nextAt-performance.now()));
      };
      setTimeout(step,0);
    });
    signal?.removeEventListener('abort',onAbort);
    recorder.stop();
    await stopped;
    stream.getTracks().forEach(t=>t.stop());
    if(aborted)return null;
    return{blob:new Blob(chunks,{type:mimeType}),mimeType,frameCount:frameBlobs.length};
  }finally{
    canvas.remove();
  }
}
