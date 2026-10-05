// S2e — Renderer-Werkstatt, Vorbereitung Stufe 3: geteilte Matchcenter-/Saison-Bausteine aus index.html
// herausgelöst (reines Verschieben, keine Logikänderung) — buildSocialVideoSpec (social-video-renderer.js)
// UND die Werkstatt (social-video-lab.html) brauchen diese ~84 Funktionen, index.html braucht sie weiterhin
// für den Rest der App (Matchcenter-Seite, Lineup-Analyse usw.). Deshalb in eine vierte, geteilte Datei statt
// in social-video-renderer.js (dort hätten sie nichts verloren — nicht ausschließlich vom Renderer genutzt,
// siehe CLAUDE.md-Leseregel/Stufe-1-Abgrenzung). Klassisches Skript (kein type="module"), lädt analog zu
// season-data-embedded.js/social-video-assets.js VOR dem jeweiligen Haupt-<script>.

const ULM_TEAM_ALIASES=[
  'VfB Ulm',
  'SG Sparks Ulm-Tübingen',
  'SG Sparks Tübingen-Ulm'
];
const MOJIBAKE_RUN_RE=/[\u0080-\u00ff\u0152\u0153\u0160\u0161\u0178\u2018-\u201d\u2020-\u2026\u2030\u2039\u203a\u20ac\u2122]+/g;
const CP1252_REVERSE_BYTES={
  0x20ac:0x80,0x201a:0x82,0x0192:0x83,0x201e:0x84,0x2026:0x85,0x2020:0x86,0x2021:0x87,
  0x02c6:0x88,0x2030:0x89,0x0160:0x8a,0x2039:0x8b,0x0152:0x8c,0x017d:0x8e,
  0x2018:0x91,0x2019:0x92,0x201c:0x93,0x201d:0x94,0x2022:0x95,0x2013:0x96,0x2014:0x97,
  0x02dc:0x98,0x2122:0x99,0x0161:0x9a,0x203a:0x9b,0x0153:0x9c,0x017e:0x9e,0x0178:0x9f,
};
const UI_TEXT_REPLACEMENTS=[
  [/\bUebersicht\b/g,'Übersicht'],[/\buebersicht\b/g,'übersicht'],
  [/\bVerfuegbarkeit\b/g,'Verfügbarkeit'],[/\bverfuegbar\b/g,'verfügbar'],[/\bverfuegbare\b/g,'verfügbare'],[/\bverfuegbaren\b/g,'verfügbaren'],[/\bVerfuegbar\b/g,'Verfügbar'],[/\bVerfuegbare\b/g,'Verfügbare'],
  [/\bauswaehlen\b/g,'auswählen'],[/\bauswaehlt\b/g,'auswählt'],[/\bausgewaehlt\b/g,'ausgewählt'],[/\bgewaehlt\b/g,'gewählt'],[/\bAusgewaehlte\b/g,'Ausgewählte'],[/\bGewaehlt\b/g,'Gewählt'],[/\bWaehle\b/g,'Wähle'],[/\bWaehlen\b/g,'Wählen'],[/\bwaehle\b/g,'wähle'],[/\bwaehlen\b/g,'wählen'],
  [/\boeffnen\b/g,'öffnen'],[/\boeffnet\b/g,'öffnet'],[/\boffen\b/g,'offen'],
  [/\bmoeglich\b/g,'möglich'],[/\bmoegliche\b/g,'mögliche'],[/\bmoeglichen\b/g,'möglichen'],[/\bmoeglichst\b/g,'möglichst'],[/\bMoegliche\b/g,'Mögliche'],
  [/\bSchluesselspieler\b/g,'Schlüsselspieler'],[/\bSchluesselduo\b/g,'Schlüsselduo'],[/\bSchluesselduos\b/g,'Schlüsselduos'],[/\bSchluesselakteure\b/g,'Schlüsselakteure'],
  [/\bStaerke\b/g,'Stärke'],[/\bStaerken\b/g,'Stärken'],[/\bstaerksten\b/g,'stärksten'],[/\bstaerkste\b/g,'stärkste'],[/\bstaerker\b/g,'stärker'],[/\bpraegende\b/g,'prägende'],
  [/\bErgaenzung\b/g,'Ergänzung'],[/\bErgaenzungen\b/g,'Ergänzungen'],[/\bergaenzen\b/g,'ergänzen'],[/\bergaenzt\b/g,'ergänzt'],[/\bErgaenzungsbaustein\b/g,'Ergänzungsbaustein'],
  [/\bLuecke\b/g,'Lücke'],[/\bLuecken\b/g,'Lücken'],[/\bLueckenanalyse\b/g,'Lückenanalyse'],
  [/\bGegnerqualitaet\b/g,'Gegnerqualität'],[/\bEigenstaendigkeit\b/g,'Eigenständigkeit'],[/\bKreativitaet\b/g,'Kreativität'],[/\bStabilitaet\b/g,'Stabilität'],
  [/\bUeberzahl\b/g,'Überzahl'],[/\bUeberzahltore\b/g,'Überzahltore'],[/\bueber\b/g,'über'],[/\bUeber\b/g,'Über'],
  [/\bTorschuetzen\b/g,'Torschützen'],[/\bRueckschlaege\b/g,'Rückschläge'],[/\bRueckenwind\b/g,'Rückenwind'],
  [/\bfrueh\b/g,'früh'],[/\bFrueh\b/g,'Früh'],[/\bspaet\b/g,'spät'],[/\bSpaet\b/g,'Spät'],[/\bhaeufige\b/g,'häufige'],[/\bauffaellig\b/g,'auffällig'],[/\bauffaelligste\b/g,'auffälligste'],
  [/\bkuenstlichen\b/g,'künstlichen'],[/\bkuenstliche\b/g,'künstliche'],[/\bduerfen\b/g,'dürfen'],[/\bduerfte\b/g,'dürfte'],[/\bmoechte\b/g,'möchte'],
  [/\bgrossen\b/g,'großen'],[/\bgrosse\b/g,'große'],[/\bgrosses\b/g,'großes'],[/\bgroesseren\b/g,'größeren'],[/\bgroesste\b/g,'größte'],
  [/\bfuer\b/g,'für'],[/\bFuer\b/g,'Für']
];
const ULM_TEAM_ALIAS_KEYS=ULM_TEAM_ALIASES.map(normalizeTeamName);
const TEAM_ALIAS_RULES=[
  {canonical:'VfB Ulm',aliases:['VfB Ulm','Ulm','Ulm / SG'],role:'ownTeam'},
  {canonical:'VfB Ulm',aliases:['SG Sparks Ulm-Tuebingen','SG Sparks Tuebingen-Ulm','SG Ulm-Tuebingen','SG Tuebingen-Ulm'],seasons:['21/22','22/23','23/24'],role:'ownTeam'},
  {canonical:'Breisgau Bandits',aliases:['SG Freiburg-Tuebingen','SG Tuebingen-Freiburg','Freiburg-Tuebingen','Freiburg Tuebingen'],seasons:['24/25','25/26','26/27'],role:'opponentAlias'},
  {canonical:'SV Tuebingen Sharks',aliases:['SG Freiburg-Tuebingen','SG Tuebingen-Freiburg','Freiburg-Tuebingen','Freiburg Tuebingen'],seasons:['24/25','25/26','26/27'],role:'opponentAlias'},
  {canonical:'SV Tuebingen Sharks',aliases:['SV Tuebingen Sharks','Tuebingen Sharks','Tuebingen'],role:'opponentAlias'},
  {canonical:'Breisgau Bandits',aliases:['Breisgau Bandits','Freiburg','Breisgau'],role:'opponentAlias'}
];

function getSeasonData(seasonKey=getActiveSeasonKey()){
  const bucket=SEASONS[seasonKey]||createSeasonBucket(seasonKey,SEASON_CONFIG[seasonKey]||{label:seasonKey});
  const data=bucket.data||{};
  return{
    games:data.games||data.gamesData||[],
    gamesData:data.gamesData||[],
    rawGames:data.rawGames||[],
    loadedGames:data.loadedGames||data.rawGames||[],
    failedGames:data.failedGames||[],
    rawLeagueGames:data.rawLeagueGames||[],
    relevantLeagueGames:data.relevantLeagueGames||[],
    excludedGames:data.excludedGames||data.excludedScheduledGames||[],
    excludedScheduledGames:data.excludedScheduledGames||[],
    flaggedSuspiciousGames:data.flaggedSuspiciousGames||[],
    players:data.players||[],
    playersMap:data.playersMap||{},
    events:data.events||{},
    eventsList:data.eventsList||[],
    penalties:data.penalties||{},
    specialTeams:data.specialTeams||null,
    teamStats:data.teamStats||{},
    teamGoalsPerGame:data.teamGoalsPerGame||{},
    standings:data.standings||[],
    playerRegistry:data.playerRegistry||null,
    playerStatus:data.playerStatus||null,
    allTime:data.allTime||null,
    warnings:data.warnings||[],
  };
}
function mojibakeScore(value){
  const s=String(value??'');
  return (s.match(/(?:[\u00c2-\u00c5].|\u00e2.|\u00f0\u0178|\u00ef\u00b8|\ufffd)/g)||[]).length+
    (s.match(/[\u0080-\u009f]/g)||[]).length;
}
function decodeCp1252AsUtf8(value){
  const bytes=[];
  for(const ch of String(value??'')){
    const code=ch.charCodeAt(0);
    const byte=code<=0xff?code:CP1252_REVERSE_BYTES[code];
    if(byte===undefined)return value;
    bytes.push(byte);
  }
  try{
    return new TextDecoder('utf-8',{fatal:false}).decode(new Uint8Array(bytes));
  }catch(e){
    return value;
  }
}
function repairMojibake(value){
  if(value===undefined||value===null)return value;
  let out=String(value);
  for(let pass=0;pass<3;pass++){
    let changed=false;
    out=out.replace(MOJIBAKE_RUN_RE,run=>{
      if(!/[\u00c2-\u00c5\u00e2\u00f0\u00ef\ufffd]/.test(run)&&mojibakeScore(run)===0)return run;
      const decoded=decodeCp1252AsUtf8(run);
      if(decoded!==run&&mojibakeScore(decoded)<mojibakeScore(run)){
        changed=true;
        return decoded;
      }
      return run;
    });
    if(!changed)break;
  }
  return out;
}
function fixKnownUiTransliterations(value){
  let out=String(value??'');
  for(const [pattern,replacement] of UI_TEXT_REPLACEMENTS)out=out.replace(pattern,replacement);
  return out;
}
function cleanText(value){
  return fixKnownUiTransliterations(repairMojibake(String(value??'')));
}
function normalizeTeamName(name){
  return cleanText(name)
    .trim()
    .toLowerCase()
    .replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss')
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9]+/g,' ')
    .trim()
    .replace(/\s+/g,' ');
}
function normalizeOpponentNameForAllTime(name,seasonKey=''){
  const raw=cleanText(name).trim();
  const n=normalizeTeamName(raw);
  if(!raw)return'?';
  if(isFreiburgTuebingenSgName(n))return'SG Freiburg-T\u00fcbingen';
  if(isMannheimLudwigshafenSgName(n))return'SG Mannheim-Ludwigshafen';
  if(n==='freiburg'||n==='breisgau bandits')return'Breisgau Bandits';
  if(n==='tubingen'||n==='tuebingen'||n==='sv tubingen sharks'||n==='sv tuebingen sharks')return'SV T\u00fcbingen Sharks';
  if(seasonKey==='22/23'&&n==='sportvg feuerbach 1')return'Sportvg Feuerbach';
  return raw;
}
function isFreiburgTuebingenSgName(n){
  return !!n&&n.includes('sg')&&n.includes('freiburg')&&(n.includes('tubingen')||n.includes('tuebingen'));
}
function isMannheimLudwigshafenSgName(n){
  return !!n&&n.includes('sg')&&n.includes('mannheim')&&n.includes('ludwigshafen');
}
function isUlmTeamName(name){
  const n=normalizeTeamName(name);
  if(!n)return false;
  return ULM_TEAM_ALIAS_KEYS.some(alias=>n===alias||n.includes(alias))||
    (n.includes('vfb')&&n.includes('ulm'));
}
function pFull(p){
  if(!p||typeof p!=='object')return'';
  const first=p.player_firstname??p.first_name??p.firstname??p.firstName??'';
  const last=p.player_name??p.last_name??p.lastname??p.lastName??'';
  const joined=(cleanText(first)+' '+cleanText(last)).trim();
  return normalizePlayerDisplayName(joined||cleanText(p.name??p.full_name??p.fullName??p.playerName??p.displayName??p.label??'').trim());
}
function normalizePlayerDisplayName(name){
  const cleaned=cleanText(name)
    .trim()
    .replace(/\bMichael\s+Stanek\b/gi,'Michael Staněk')
    .replace(/\bMichael\s+Staněk\b/g,'Michael Staněk')
    .replace(/\bJaroslav\s+Å[\u00a0 ]torek\b/g,'Jaroslav Štorek');
  const key=cleaned.toLowerCase()
    .replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss')
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9]+/g,' ')
    .trim()
    .replace(/\s+/g,' ');
  if(key==='michael stanek')return'Michael Staněk';
  if(key==='jaroslav storek')return'Jaroslav Štorek';
  return cleaned;
}
function gameStableId(g){
  return g?.id||`${g?.date||g?.game_date||''}-${g?.home_team_name||''}-${g?.guest_team_name||''}`;
}
function parseGameClock(time){
  if(time===undefined||time===null||time==='')return null;
  const raw=String(time).trim();
  const match=raw.match(/^(\d{1,2})(?::(\d{1,2}))?$/);
  if(!match)return null;
  const minutes=Number(match[1]);
  const seconds=match[2]===undefined?0:Number(match[2]);
  if(!Number.isFinite(minutes)||!Number.isFinite(seconds)||seconds<0||seconds>=60)return null;
  return minutes*60+seconds;
}
function getPhaseKey(period,time){
  const p=Number(period);
  const s=parseGameClock(time);
  if(!Number.isFinite(p)||s===null)return'Unbekannt';
  if(p===1&&s<=600)return'1.D 0-10min';
  if(p===1)return'1.D 10-20min';
  if(p===2&&s<=600)return'2.D 0-10min';
  if(p===2)return'2.D 10-20min';
  if(p===3&&s<=600)return'3.D 0-10min';
  if(p===3)return'3.D 10-20min';
  return'Unbekannt';
}
function isYouthGame(g){
  const YOUTH=/\bU\s*\d{2}\b|Jugend|Junior|Youth|Nachwuchs/i;
  const fields=[
    g.competition_type,g.match_type,g.game_type,
    g.spielplan_name,g.league_name,g.competition_name,
    g.season_name,g.league?.name,g.season?.name,g.spielplan?.name,
  ].filter(Boolean);
  return fields.some(f=>YOUTH.test(String(f)));
}
function gameStatusText(game){
  return [
    game?.status,game?.game_status,game?.state,game?.notice_type,game?.notice_string,
    game?.remarks,game?.remark,game?.comment,game?.comments,
    game?.result?.postfix?.short,game?.result?.postfix?.long,
  ].map(v=>cleanText(v||'')).join(' ').trim().toLowerCase();
}
function gameScore(game){
  const hg=game?.home_goals??game?.home_score??game?.result?.home_goals??game?.result?.home;
  const gg=game?.guest_goals??game?.guest_score??game?.result?.guest_goals??game?.result?.guest;
  const home=Number.parseInt(hg,10);
  const guest=Number.parseInt(gg,10);
  return{
    home,guest,
    hasScore:Number.isFinite(home)&&Number.isFinite(guest),
  };
}
function isGameAtOrBeforeAsOf(game,asOf){
  const asOfDate=String(asOf?.date??'');
  if(!asOfDate)return true;
  const gameDate=String(game?.date??'');
  if(gameDate!==asOfDate)return gameDate<asOfDate;
  const hasAsOfTime=asOf?.startTime!==undefined&&asOf?.startTime!==null&&asOf?.startTime!=='';
  if(!hasAsOfTime)return true;
  const gameTime=String(game?.start_time??'');
  const asOfTime=String(asOf.startTime);
  return gameTime<=asOfTime;
}
/** Heutiges Datum als "YYYY-MM-DD", lokale Zeit — für den Vergleich mit game.date (Aufgabe 7a). */
function todayDateString(){
  const d=new Date();
  return`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
/** Deutsches Datumsformat TT.MM.JJJJ aus einem "YYYY-MM-DD"-String, für Begründungstexte. */
function formatGermanDateFromIso(iso){
  const m=/^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso||''));
  return m?`${m[3]}.${m[2]}.${m[1]}`:String(iso||'');
}
/**
 * Aufgabe 7a (S2e-Kaltstart-Phase): "zählt für Statistiken" (countsForStats) und "wird angezeigt" sind zwei
 * getrennte Fragen — vorher landete jedes Spiel ohne Endstand/Events im selben status:'unplayed', egal ob
 * es abgesagt wurde oder erst in der Zukunft stattfindet, mit der irreführenden Begründung "Kein Endstand
 * und keine Events vorhanden". Ein Spiel mit Datum in der Zukunft (oder heute) ist "geplant"
 * (status:'scheduled') — ein eigener, dritter Zustand neben 'cancelled'/'postponed'. countsForStats bleibt
 * für 'scheduled' false (korrekt: zählt nicht für Statistiken), aber die Unterscheidung von 'unplayed'
 * erlaubt Aufrufern wie buildStandings(), ein geplantes Spiel trotzdem zu berücksichtigen (siehe dort) —
 * genau die Trennung, die diese Aufgabe verlangt. isEffectivelyEnded() in scripts/game-status.mjs löst den
 * umgekehrten Fall (ended fälschlich false trotz echtem Ergebnis); hier geht es um das Gegenstück (kein
 * Ergebnis, weil das Spiel einfach noch nicht stattgefunden hat).
 */
function classifyGameForStats(game,season=null,asOf=null){
  if(asOf&&!isGameAtOrBeforeAsOf(game,asOf)){
    return{isRelevantLeagueGame:false,status:'future',reason:'Spielzeitpunkt liegt nach dem gewählten asOf-Zeitpunkt',countsForStats:false};
  }
  const statusText=gameStatusText(game);
  const score=gameScore(game);
  const events=Array.isArray(game?.events)?game.events:[];
  const goalEvents=events.filter(e=>e?.event_type==='goal').length;
  const eventCount=events.length;
  const finished=game?.ended===true||
    /match_record_closed|finalized|aftergame|finished|finish|closed|beendet|gespielt/.test(statusText);
  const started=game?.started===true||eventCount>0;
  const isForfeit=!!game?.result?.forfait||/forfait|kampflos/.test(statusText);
  const cancelled=!!(game?.canceled||game?.cancelled||game?.is_canceled)||
    /cancelled|canceled|cancel|abgesagt/.test(statusText);
  const postponed=!!game?.postponed||!!game?.is_postponed||
    /postponed|postpone|verschoben|verlegt/.test(statusText);
  const hasRealResult=score.hasScore&&(goalEvents>0||eventCount>0||finished||isForfeit);
  const hasPlayedEvidence=goalEvents>0||(finished&&score.hasScore)||(isForfeit&&score.hasScore);
  if(isYouthGame(game)){
    return{isRelevantLeagueGame:false,status:'unplayed',reason:'Nachwuchs-/Jugendspiel',countsForStats:false};
  }
  if(cancelled){
    return{isRelevantLeagueGame:false,status:'cancelled',reason:'Saisonmanager markiert das Spiel als abgesagt',countsForStats:false};
  }
  if(postponed&&!hasPlayedEvidence){
    return{isRelevantLeagueGame:false,status:'postponed',reason:'Saisonmanager markiert das Spiel als verschoben und es gibt keinen echten Endstand/keine Events',countsForStats:false};
  }
  if(postponed&&hasPlayedEvidence){
    return{isRelevantLeagueGame:true,status:'suspicious',reason:'Verschoben-Flag vorhanden, aber Endstand/Events deuten auf ausgetragenes Spiel hin',countsForStats:true};
  }
  if(!score.hasScore&&!eventCount){
    const gameDate=String(game?.date??'');
    // Aufgabe 10: ergebnisbasiert statt datumsbasiert. Ein Vergleich gegen das echte Kalenderdatum
    // (todayDateString()) würde den Status am Tag NACH dem Spiel automatisch zurück auf 'unplayed' kippen
    // lassen, sobald niemand das Ergebnis importiert hat — geprüft mit gesetztem Datum: am 12.10. (Spiel war
    // am 11.10.) kippt 'scheduled' sonst zurück auf 'unplayed', und 'unplayed' landet in
    // excludedScheduledGames([...,'unplayed']) — das reaktiviert sowohl die fehlende Nullzeile in
    // buildStandings als auch die individuelle "56 Warnungen"-Zeile pro Spiel, die 7a/7c beheben sollten.
    // Drei Zustände statt zwei: 'scheduled' (Datum liegt noch nicht hinter uns), 'awaitingResult' (Datum ist
    // vorbei, aber noch kein Ergebnis — der Zustand am Spieltagnachmittag zwischen Schlusspfiff und Import),
    // 'unplayed' bleibt reserviert für den echten Datenfehler "gar kein Datum vorhanden".
    if(gameDate){
      if(gameDate>=todayDateString()){
        return{isRelevantLeagueGame:false,status:'scheduled',reason:`Spiel findet am ${formatGermanDateFromIso(gameDate)} statt`,countsForStats:false};
      }
      return{isRelevantLeagueGame:false,status:'awaitingResult',reason:`Spiel fand am ${formatGermanDateFromIso(gameDate)} statt — Ergebnis steht noch aus`,countsForStats:false};
    }
    return{isRelevantLeagueGame:false,status:'unplayed',reason:'Kein Endstand und keine Events vorhanden',countsForStats:false};
  }
  if(hasPlayedEvidence){
    return{isRelevantLeagueGame:true,status:'played',reason:isForfeit?'Offizielles Forfait-Ergebnis':'Ausgetragenes Spiel mit Endstand/Eventdaten',countsForStats:true};
  }
  if(hasRealResult){
    return{isRelevantLeagueGame:true,status:'played',reason:'Offizieller Endstand vorhanden',countsForStats:true};
  }
  return{isRelevantLeagueGame:false,status:'suspicious',reason:'Status/Endstand/Eventdaten sind nicht eindeutig genug für Statistikzählung',countsForStats:false};
}
function getRelevantSeasonGames(season,asOf=null){
  let games=[],seasonInfo=null;
  if(Array.isArray(season)){
    games=season;
  }else if(season?.gamesData){
    games=season.gamesData;
    seasonInfo=season;
  }else if(season?.games){
    games=season.games;
    seasonInfo=season;
  }else if(season?.data){
    const data=season.data;
    games=data.rawLeagueGames?.length?data.rawLeagueGames:
      data.relevantLeagueGames?.length?data.relevantLeagueGames:
      data.gamesData?.length?data.gamesData:
      data.games||[];
    seasonInfo=season;
  }
  return (games||[]).filter(g=>classifyGameForStats(g,seasonInfo,asOf).countsForStats);
}
function getSeasonStatsAsOf(seasonKey,asOf=deriveAsOfForSeason(seasonKey,S.asOf)){
  const bucket=SEASONS[seasonKey];
  if(!bucket?.data)return null;
  const seasonConfig=SEASON_CONFIG[seasonKey]||SEASON_CONFIG[CURRENT_SEASON_KEY];
  return cachedAnalysis(analysisCacheKey('season-stats-asof',{seasonKey},asOf),()=>{
    const relevantLeagueGames=getRelevantSeasonGames(bucket.data.rawLeagueGames||[],asOf);
    // Aufgabe 7b: Tabelle aus ALLEN Liga-Spielen (nicht nur den für Statistik zählenden) — buildStandings()
    // nimmt jedes Team mit einer Nullzeile auf, sobald es ein geplantes Spiel hat (siehe dort). asOf MUSS
    // durchgereicht werden, sonst zählen Spiele nach dem gewählten Zeitpunkt fälschlich mit (siehe
    // Kommentar an buildStandings()).
    const standings=buildStandings(bucket.data.rawLeagueGames||[],seasonConfig,asOf);
    const relevantLeagueGameKeys=new Set(relevantLeagueGames.map(g=>String(g.id||gameStableId(g))));
    const statGamesData=(bucket.data.rawGames||[]).filter(g=>detectSide(g)&&classifyGameForStats(g,null,asOf).countsForStats&&relevantLeagueGameKeys.has(String(g.id||gameStableId(g))));
    return{seasonKey,asOf,relevantLeagueGames,standings,statGamesData};
  });
}
function compareGamesChronologically(a,b){
  const dateA=String(a?.date??'');
  const dateB=String(b?.date??'');
  if(dateA!==dateB)return dateA<dateB?-1:1;
  const startA=String(a?.start_time??'');
  const startB=String(b?.start_time??'');
  if(startA!==startB)return startA<startB?-1:1;
  const numA=Number(a?.game_number)||0;
  const numB=Number(b?.game_number)||0;
  if(numA!==numB)return numA-numB;
  const idA=Number(a?.id)||0;
  const idB=Number(b?.id)||0;
  return idA-idB;
}
function buildMatchdays(seasonData){
  const seasonKey=seasonData?.season??'';
  const games=Array.isArray(seasonData?.games)?seasonData.games:[];
  const groups=new Map();
  for(const game of games){
    const gameDayNumber=game?.game_day?.game_day_number;
    const hasNumber=gameDayNumber!==undefined&&gameDayNumber!==null&&gameDayNumber!=='';
    const groupKey=hasNumber?`num:${gameDayNumber}`:`date:${String(game?.date??'')}`;
    if(!groups.has(groupKey))groups.set(groupKey,[]);
    groups.get(groupKey).push(game);
  }
  const matchdays=[];
  for(const groupGames of groups.values()){
    const sortedGames=[...groupGames].sort(compareGamesChronologically);
    const rawNumber=sortedGames[0]?.game_day?.game_day_number;
    const number=rawNumber!==undefined&&rawNumber!==null&&rawNumber!==''?Number(rawNumber):null;
    const date=String(sortedGames[0]?.date??'');
    const teamGames={};
    for(const g of sortedGames){
      for(const rawName of[g?.home_team_name,g?.guest_team_name]){
        if(!rawName)continue;
        const teamKey=String(rawName).trim();
        if(!teamKey)continue;
        if(!teamGames[teamKey])teamGames[teamKey]=[];
        teamGames[teamKey].push(g.id);
      }
    }
    const endedFlags=sortedGames.map(g=>g?.ended===true);
    const allEnded=endedFlags.length>0&&endedFlags.every(Boolean);
    const noneEnded=endedFlags.every(f=>!f);
    const status=allEnded?'abgeschlossen':noneEnded?'geplant':'unvollstaendig';
    matchdays.push({
      key:`${seasonKey}#${number!==null?number:`date:${date}`}`,
      seasonKey,number,date,games:sortedGames,teamGames,status,
    });
  }
  matchdays.sort((a,b)=>{
    if(a.number!==null&&b.number!==null&&a.number!==b.number)return a.number-b.number;
    return a.date<b.date?-1:a.date>b.date?1:0;
  });
  return matchdays;
}
function getSeasonMatchdays(seasonKey){
  const bucket=SEASONS[seasonKey];
  if(!bucket?.data)return[];
  return cachedAnalysis(analysisCacheKey('matchdays',{seasonKey}),()=>buildMatchdays({season:seasonKey,games:bucket.data.rawLeagueGames||[]}));
}
function matchdayAsOfCutoff(matchday){
  const games=matchday?.games||[];
  const last=games[games.length-1];
  if(!last)return null;
  const date=String(last.date||'');
  if(!date)return null;
  const startTime=String(last.start_time||'');
  return startTime?{date,startTime}:{date};
}
function formatDateDE(isoDate){
  const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(isoDate||''));
  return m?`${m[3]}.${m[2]}.${m[1]}`:String(isoDate||'');
}
/**
 * Aufgabe 7b: eine Tabelle vor dem ersten Spieltag ist nicht leer, sie ist auf null — genau wie der
 * Saisonmanager selbst sie zeigt. Ein geplantes Spiel (status:'scheduled', siehe classifyGameForStats)
 * zählt weiterhin nicht für Statistiken, sorgt aber dafür, dass beide beteiligten Mannschaften mit einer
 * Nullzeile erscheinen. Betrifft ausschließlich künftig datierte Spiele — an archivierten Saisons (dort
 * hat kein Spiel mehr den Status 'scheduled') ändert sich dadurch nichts.
 *
 * asOf (optional): muss durchgereicht werden, sobald gamesData NICHT mehr auf den asOf-Zeitpunkt
 * vorgefiltert ist (siehe getSeasonStatsAsOf in index.html, das seit 7b die vollständige rawLeagueGames-
 * Liste statt der bereits gefilterten relevantLeagueGames übergibt, damit geplante Spiele Nullzeilen
 * bekommen) — sonst zählen Spiele NACH dem gewählten asOf-Zeitpunkt fälschlich für eine historische
 * Tabellen-Momentaufnahme mit (gefunden über test-social-video.mjs, siehe Build-Bericht).
 */
function buildStandings(gamesData,seasonConfig=ACTIVE_SEASON_CONFIG,asOf=null){
  const seasonId=seasonConfig.seasonId;
  const seasonStart=seasonConfig.dateRange?.start||SEASON_START;
  const seasonEnd=seasonConfig.dateRange?.end||SEASON_END;
  const map={};
  const seenIds=new Set(); // deduplicate: same game may appear from season-API + team-API fetch
  for(const g of gamesData){
    // classifyGameForStats() selbst wertet asOf aus (liefert status:'future' statt 'scheduled' für Spiele
    // nach dem gewählten Zeitpunkt) — kein zusätzlicher Vorab-Filter nötig, nur durchreichen.
    const classification=classifyGameForStats(g,seasonConfig,asOf);
    // Aufgabe 10: 'awaitingResult' (Datum vorbei, Ergebnis noch nicht importiert) bekommt dieselbe
    // Nullzeilen-Behandlung wie 'scheduled' — sonst verliert ein Team seine Zeile genau in dem Fenster
    // zwischen Spielende und Import, obwohl am Status selbst nichts "falsch" ist.
    const isScheduled=classification.status==='scheduled'||classification.status==='awaitingResult';
    if(!classification.countsForStats&&!isScheduled)continue;
    // ── Date range guard (this season only) ──────────────
    const gd=g.date||g.game_date||'';
    const _bsid=Number(g.season_id??g.league_season_id??g.season?.id??0);
    if(seasonId&&_bsid&&_bsid!==seasonId)continue;
    if(!gd&&seasonId&&_bsid!==seasonId)continue; // no date + no season_id → Süddeutsche
    if(gd&&((seasonStart&&gd<seasonStart)||(seasonEnd&&gd>seasonEnd)))continue;
    const hn=g.home_team_name||'?',gn=g.guest_team_name||'?';
    if(!map[hn])map[hn]={name:hn,sp:0,w:0,d:0,l:0,gf:0,ga:0,gameIds:new Set()};
    if(!map[gn])map[gn]={name:gn,sp:0,w:0,d:0,l:0,gf:0,ga:0,gameIds:new Set()};
    if(isScheduled)continue; // Nullzeile existiert jetzt, aber kein Spiel zum Auszählen
    // ── Deduplication by game ID ──────────────────────────
    const gid=Number(g.id||0);
    if(gid){if(seenIds.has(gid))continue;seenIds.add(gid);}
    // ── Score validity ────────────────────────────────────
    const hg=parseInt(g.home_goals),gg=parseInt(g.guest_goals);
    if(isNaN(hg)||isNaN(gg))continue;
    // ── Reject postponed/cancelled ────────────────────────
    // ── 0:0 requires real events (not just a placeholder) ─
    // Safety: skip if game ID already counted for this team
    if(gid&&(map[hn].gameIds.has(gid)||map[gn].gameIds.has(gid)))continue;
    if(gid){map[hn].gameIds.add(gid);map[gn].gameIds.add(gid);}
    map[hn].sp++;map[gn].sp++;
    map[hn].gf+=hg;map[hn].ga+=gg;
    map[gn].gf+=gg;map[gn].ga+=hg;
    if(hg>gg){map[hn].w++;map[gn].l++;}
    else if(hg<gg){map[gn].w++;map[hn].l++;}
    else{map[hn].d++;map[gn].d++;}
  }
  const teams=Object.values(map).map(t=>({...t,pts:t.w*3+t.d,diff:t.gf-t.ga}));
  teams.sort((a,b)=>b.pts-a.pts||b.diff-a.diff||b.gf-a.gf);
  teams.forEach((t,i)=>t.rank=i+1);
  return teams;
}
function normalizeGame(g){
  if(!g||typeof g!=='object')return g;
  const gameId=g.id??g.game_id??g.game?.id??null;
  // Score: try home_goals, home_score, result.home_goals, result.home
  const hg=g.home_goals??g.home_score??g.result?.home_goals??g.result?.home??null;
  const gg=g.guest_goals??g.guest_score??g.result?.guest_goals??g.result?.guest??null;
  // Team names: try home_team_name, home_team.name, home.name
  const hn=g.home_team_name??g.home_team?.name??g.home?.name??null;
  const gn=g.guest_team_name??g.guest_team?.name??g.guest?.name??null;
  // Events: might be nested under game.events or at top level
  const evs=g.events??g.goals??[];
  return{
    ...g,
    id:gameId,
    home_goals:hg!==null?String(hg):null,
    guest_goals:gg!==null?String(gg):null,
    home_team_name:hn??g.home_team_name,
    guest_team_name:gn??g.guest_team_name,
    events:Array.isArray(evs)?evs:[],
    _raw:undefined,// don't bloat state
  };
}
function seasonOrderIndex(seasonKey){
  const keys=Object.keys(SEASON_CONFIG);
  const idx=keys.indexOf(seasonKey);
  return idx===-1?999:idx;
}
function matchcenterClamp(value,min=0,max=100){
  const n=Number(value);
  if(!Number.isFinite(n))return min;
  return Math.max(min,Math.min(max,n));
}
function matchcenterNum(value,fallback=0){
  const n=Number(value);
  return Number.isFinite(n)?n:fallback;
}
function matchcenterFmt(value,digits=1){
  const n=Number(value);
  if(!Number.isFinite(n))return '-';
  return n.toFixed(digits).replace('.',',');
}
function matchcenterDateValue(g){
  const raw=g?.date||g?.game_date||g?.starts_at||'';
  const t=Date.parse(raw);
  return Number.isFinite(t)?t:0;
}
function matchcenterSortGamesAsc(a,b){
  return matchcenterDateValue(a)-matchcenterDateValue(b)||
    matchcenterNum(a?.game_number,0)-matchcenterNum(b?.game_number,0)||
    matchcenterNum(a?.id,0)-matchcenterNum(b?.id,0);
}
function matchcenterSeasonKeys(){
  return [...new Set([...Object.keys(SEASON_CONFIG||{}),...Object.keys(STATIC_SEASON_DATA||{})])]
    .sort((a,b)=>seasonOrderIndex(a)-seasonOrderIndex(b));
}
function matchcenterSeasonLabel(seasonKey){
  return SEASON_CONFIG[seasonKey]?.label||STATIC_SEASON_DATA[seasonKey]?.label||seasonKey;
}
function matchcenterSeasonIsUlmTuebingenSgEra(seasonKey=''){
  if(!seasonKey)return true;
  return seasonOrderIndex(seasonKey)<=seasonOrderIndex('23/24');
}
function teamAliasSeasonMatches(rule,seasonKey=''){
  if(!rule?.seasons?.length)return true;
  const label=matchcenterSeasonLabel(seasonKey);
  const keys=new Set([seasonKey,label].filter(Boolean).map(String));
  return rule.seasons.some(season=>keys.has(String(season)));
}
function normalizeTeamKey(name){
  return normalizeTeamName(name||'');
}
function teamAliasRuleMatches(rule,name,seasonKey=''){
  const key=normalizeTeamKey(name);
  if(!key||!teamAliasSeasonMatches(rule,seasonKey))return false;
  return [rule.canonical,...(rule.aliases||[])].some(alias=>normalizeTeamKey(alias)===key);
}
function isOwnTeam(name,seasonKey=''){
  const key=normalizeTeamKey(name);
  if(!key)return false;
  const explicit=TEAM_ALIAS_RULES.some(rule=>rule.role==='ownTeam'&&teamAliasRuleMatches(rule,name,seasonKey));
  if(explicit)return true;
  if(key.includes('freiburg')&&(key.includes('tubingen')||key.includes('tuebingen')))return false;
  if(key==='ulm'||key==='ulm sg'||(key.includes('vfb')&&key.includes('ulm')))return true;
  if(key.includes('ulm')&&(key.includes('tubingen')||key.includes('tuebingen')))return matchcenterSeasonIsUlmTuebingenSgEra(seasonKey);
  if(key.includes('sg sparks')&&key.includes('ulm'))return matchcenterSeasonIsUlmTuebingenSgEra(seasonKey);
  return false;
}
function getCanonicalTeamName(name,seasonKey='',context='season'){
  if(isOwnTeam(name,seasonKey))return context==='display'?'Ulm / SG':'VfB Ulm';
  const rule=TEAM_ALIAS_RULES.find(row=>row.role==='opponentAlias'&&teamAliasRuleMatches(row,name,seasonKey));
  if(rule)return rule.canonical;
  return cleanText(normalizeOpponentNameForAllTime(name,seasonKey));
}
function getOpponentAliasKeys(opponentName,seasonKey='',mode='season'){
  const rawKey=normalizeTeamKey(opponentName||'');
  const canonical=getCanonicalTeamName(opponentName,seasonKey,'opponent');
  const canonicalKey=normalizeTeamKey(canonical);
  const keys=new Set([rawKey,canonicalKey].filter(Boolean));
  if(matchcenterAliasModeForContext(mode)!=='alltime')return[...keys];
  for(const rule of TEAM_ALIAS_RULES.filter(row=>row.role==='opponentAlias')){
    const ruleKey=normalizeTeamKey(rule.canonical);
    const aliasKeys=(rule.aliases||[]).map(normalizeTeamKey);
    if(ruleKey===canonicalKey||ruleKey===rawKey||aliasKeys.includes(rawKey)||aliasKeys.includes(canonicalKey)){
      keys.add(ruleKey);
      aliasKeys.forEach(key=>keys.add(key));
    }
  }
  const sgKey=normalizeTeamKey('SG Freiburg-Tuebingen');
  const base=canonicalKey||rawKey;
  const isBreisgau=base.includes('breisgau')||base.includes('freiburg');
  const isTuebingen=base.includes('tubingen')||base.includes('tuebingen');
  if(isBreisgau||isTuebingen)keys.add(sgKey);
  return[...keys].filter(Boolean);
}
function matchcenterIsUlmTeamName(teamName,seasonKey=''){
  return isOwnTeam(teamName,seasonKey);
}
function normalizeTeamNameForMatchcenter(teamName,seasonKey=''){
  const cleaned=cleanText(teamName||'').trim();
  if(!cleaned)return'?';
  return getCanonicalTeamName(cleaned,seasonKey,'display');
}
function matchcenterDetectUlmSide(g,seasonKey=g?._mcSeasonKey||''){
  const h=matchcenterGameTeamName(g,'home');
  const gu=matchcenterGameTeamName(g,'guest');
  if(matchcenterIsUlmTeamName(h,seasonKey))return'home';
  if(matchcenterIsUlmTeamName(gu,seasonKey))return'guest';
  return null;
}
function matchcenterTeamDisplay(name,seasonKey=''){
  return normalizeTeamNameForMatchcenter(name,seasonKey);
}
function matchcenterTeamKey(name,seasonKey=''){
  if(matchcenterIsUlmTeamName(name,seasonKey))return'ulm';
  const display=matchcenterTeamDisplay(name,seasonKey);
  return normalizeTeamName(display);
}
function matchcenterAliasModeForContext(context='season'){
  return context==='alltime'||context==='h2h5'||context==='history'||context==='direct'?'alltime':'season';
}
function getOpponentAliasKeysForMatchcenter(opponentName,seasonKey='',mode='season'){
  return getOpponentAliasKeys(opponentName,seasonKey,mode);
  const rawKey=normalizeTeamName(opponentName||'');
  const display=normalizeTeamNameForMatchcenter(opponentName||'',seasonKey);
  const displayKey=display&&display!=='?'?normalizeTeamName(display):'';
  const baseKey=displayKey||rawKey;
  const keys=new Set([baseKey].filter(Boolean));
  if(matchcenterAliasModeForContext(mode)!=='alltime')return[...keys];
  const sgKey=normalizeTeamName('SG Freiburg-Tübingen');
  const breisgauKey=normalizeTeamName('Breisgau Bandits');
  const freiburgKey=normalizeTeamName('Freiburg');
  const tuebingenKey=normalizeTeamName('SV Tübingen Sharks');
  const tuebingenPlainKey=normalizeTeamName('Tübingen');
  const isBreisgau=baseKey===breisgauKey||baseKey===freiburgKey||baseKey.includes('breisgau')||baseKey.includes('freiburg');
  const isTuebingen=baseKey===tuebingenKey||baseKey===tuebingenPlainKey||baseKey.includes('tubingen')||baseKey.includes('tuebingen');
  if(isBreisgau){
    keys.add(breisgauKey);
    keys.add(sgKey);
  }
  if(isTuebingen){
    keys.add(tuebingenKey);
    keys.add(sgKey);
  }
  if(isFreiburgTuebingenSgName(baseKey))keys.add(sgKey);
  return[...keys].filter(Boolean);
}
function matchcenterGameTeamName(g,side){
  return cleanText(g?.[side==='home'?'home_team_name':'guest_team_name']||'?');
}
function matchcenterGameSideForTeam(g,teamKey,seasonKey=''){
  if(teamKey==='ulm')return matchcenterDetectUlmSide(g,seasonKey||g?._mcSeasonKey||'');
  const homeKey=matchcenterTeamKey(matchcenterGameTeamName(g,'home'),seasonKey);
  const guestKey=matchcenterTeamKey(matchcenterGameTeamName(g,'guest'),seasonKey);
  if(homeKey===teamKey)return'home';
  if(guestKey===teamKey)return'guest';
  return null;
}
function matchcenterGameSideForOpponentKey(g,opponentKey,seasonKey='',mode='season'){
  const aliases=new Set(getOpponentAliasKeysForMatchcenter(opponentKey,seasonKey,mode));
  const matches=[];
  for(const side of ['home','guest']){
    const rawName=matchcenterGameTeamName(g,side);
    if(matchcenterIsUlmTeamName(rawName,seasonKey))continue;
    const key=matchcenterTeamKey(rawName,seasonKey);
    if(aliases.has(key))matches.push(side);
  }
  return matches.length===1?matches[0]:null;
}
function matchcenterGameScore(g){
  const score=gameScore(g);
  return score.hasScore?score:null;
}
function matchcenterOutcomeForTeam(g,teamKey,seasonKey=''){
  const side=matchcenterGameSideForTeam(g,teamKey,seasonKey);
  const score=matchcenterGameScore(g);
  if(!side||!score)return null;
  const gf=side==='home'?score.home:score.guest;
  const ga=side==='home'?score.guest:score.home;
  const result=gf>ga?'W':gf<ga?'L':'D';
  return{game:g,side,gf,ga,diff:gf-ga,result,points:result==='W'?3:result==='D'?1:0,total:gf+ga};
}
function matchcenterAllGamesForSeason(seasonKey){
  const data=getSeasonData(seasonKey);
  let source=data.rawLeagueGames?.length?data.rawLeagueGames:
    data.relevantLeagueGames?.length?data.relevantLeagueGames:
    data.gamesData?.length?data.gamesData:
    data.games?.length?data.games:
    [];
  if(!source.length&&S.activeSeasonKey===seasonKey&&Array.isArray(S.gamesData)&&S.gamesData.length)source=S.gamesData;
  if(!source.length)source=getStaticSeasonGames(seasonKey);
  const seen=new Set();
  return (source||[]).map(g=>({...normalizeGame(g),_mcSeasonKey:seasonKey}))
    .filter(g=>classifyGameForStats(g,{seasonKey,seasonConfig:SEASON_CONFIG[seasonKey]}).countsForStats)
    .filter(g=>{
      const key=String(g.id||gameStableId(g)||`${g.date}|${g.home_team_name}|${g.guest_team_name}`);
      if(seen.has(key))return false;
      seen.add(key);
      return true;
    })
    .sort(matchcenterSortGamesAsc);
}
function matchcenterAllGames(){
  return matchcenterSeasonKeys().flatMap(key=>matchcenterAllGamesForSeason(key));
}
function matchcenterDirectGames(opponentKey,mode='season'){
  const aliasMode=matchcenterAliasModeForContext(mode);
  const seen=new Set();
  return matchcenterAllGames()
    .filter(g=>{
      if(!matchcenterDetectUlmSide(g,g._mcSeasonKey))return false;
      if(!matchcenterGameSideForOpponentKey(g,opponentKey,g._mcSeasonKey,aliasMode))return false;
      const key=matchcenterGameKey(g);
      if(seen.has(key))return false;
      seen.add(key);
      return true;
    })
    .sort(matchcenterSortGamesAsc);
}
function matchcenterContextGames(directGames,context,seasonKey){
  const sorted=[...directGames].sort(matchcenterSortGamesAsc);
  if(context==='alltime')return sorted;
  if(context==='h2h5')return sorted.slice(-5);
  return sorted.filter(g=>g._mcSeasonKey===seasonKey);
}
function matchcenterGameKey(g){
  return String(g?.id||gameStableId(g)||`${g?.date||''}|${g?.home_team_name||''}|${g?.guest_team_name||''}`);
}
function matchcenterScoutingGames(opponentKey,context,seasonKey){
  const aliasMode=matchcenterAliasModeForContext(context);
  if(context==='h2h5')return matchcenterContextGames(matchcenterDirectGames(opponentKey,aliasMode),'h2h5',seasonKey);
  const seen=new Set();
  return matchcenterAllGames()
    .filter(g=>{
      if(!matchcenterGameSideForOpponentKey(g,opponentKey,g._mcSeasonKey,aliasMode))return false;
      const key=matchcenterGameKey(g);
      if(seen.has(key))return false;
      seen.add(key);
      return true;
    })
    .filter(g=>context==='alltime'||g._mcSeasonKey===seasonKey)
    .sort(matchcenterSortGamesAsc);
}
function matchcenterRosterPlayers(g,side){
  const players=g?.players?.[side];
  return Array.isArray(players)?players:[];
}
function matchcenterPlayerDisplayName(player,number=''){
  const name=cleanText(pFull(player)||'').trim();
  if(name)return name;
  const n=String(number||player?.trikot_number||'').trim();
  return n?`Nr. ${n}`:'Unbekannter Spieler';
}
function matchcenterFindRosterPlayer(g,side,number){
  const n=String(number??'').trim();
  if(!n||n==='0')return null;
  return matchcenterRosterPlayers(g,side).find(p=>String(p?.trikot_number??'').trim()===n)||null;
}
function matchcenterPlayerKey(player,teamKey,number=''){
  const id=player?.player_id??player?.id;
  if(id!==undefined&&id!==null&&String(id).trim())return`${teamKey}:id:${String(id).trim()}`;
  const name=matchcenterPlayerDisplayName(player,number);
  return`${teamKey}:name:${normalizeTeamName(name)}:${String(number||'')}`;
}
function matchcenterEventNumber(ev,field='number'){
  const raw=ev?.[field];
  const n=String(raw??'').trim();
  return n&&n!=='0'?n:'';
}
function matchcenterPenaltyMinutes(ev){
  const direct=Number(ev?.personalPenaltyMinutes??ev?.penaltyMinutes??ev?.minutes);
  if(Number.isFinite(direct))return Math.max(0,direct);
  const raw=cleanText(`${ev?.penalty_type_string||''} ${ev?.penalty_type||''}`).toLowerCase();
  if(/match|ms/.test(raw))return 0;
  if(/10/.test(raw))return 10;
  if(/2\s*\+\s*2|2\+2/.test(raw))return 4;
  const m=raw.match(/(\d+)/);
  return m?Number(m[1]):0;
}
function matchcenterIsLateGoalEvent(ev){
  const p=Number(ev?.period);
  const s=parseGameClock(ev?.time);
  return Number.isFinite(p)&&p>=2&&s!==null&&s>=900;
}
function matchcenterIsClutchGoalEvent(ev,side){
  const hg=Number(ev?.home_goals),gg=Number(ev?.guest_goals);
  if(!Number.isFinite(hg)||!Number.isFinite(gg))return false;
  const afterFor=side==='home'?hg:gg;
  const afterAgainst=side==='home'?gg:hg;
  const beforeFor=afterFor-1;
  const beforeAgainst=afterAgainst;
  const afterDiff=afterFor-afterAgainst;
  const beforeDiff=beforeFor-beforeAgainst;
  return afterDiff===0||afterDiff===1&&beforeDiff<=0||afterDiff>0&&beforeDiff<0;
}
function matchcenterEnsureOpponentPlayer(map,player,teamName,teamKey,number=''){
  if(teamKey==='ulm')return null;
  const key=matchcenterPlayerKey(player,teamKey,number);
  if(!key||key.includes('unbekannter spieler:'))return null;
  if(!map.has(key)){
    map.set(key,{
      key,
      playerId:player?.player_id??player?.id??null,
      name:matchcenterPlayerDisplayName(player,number),
      teamName:matchcenterTeamDisplay(teamName),
      jersey:number||player?.trikot_number||'',
      gamesSet:new Set(),
      last5GamesSet:new Set(),
      vsUlmGamesSet:new Set(),
      gamePoints:{},
      goals:0,assists:0,points:0,penaltyMinutes:0,
      last5:{games:0,goals:0,assists:0,points:0,pointsPerGame:0,scoringStreak:0},
      vsUlm:{games:0,goals:0,assists:0,points:0,pointsPerGame:0,goalsPerGame:0,clutchGoals:0,lateGoals:0,penaltyMinutes:0},
      goalShare:0,assistShare:0,dangerScore:0,dangerReason:'',formBadge:'stabil',
      noDirectUlmData:false,ulmFit:null,
    });
  }
  return map.get(key);
}
function matchcenterRegisterPlayerGame(profile,gameKey,bucket='gamesSet'){
  if(profile?.[bucket])profile[bucket].add(gameKey);
}
function matchcenterAddScoring(profile,gameKey,type,scope){
  if(!profile)return;
  if(type==='goal')profile.goals+=1;
  if(type==='assist')profile.assists+=1;
  profile.points+=1;
  profile.gamePoints[gameKey]=(profile.gamePoints[gameKey]||0)+1;
  if(scope.last5){
    if(type==='goal')profile.last5.goals+=1;
    if(type==='assist')profile.last5.assists+=1;
    profile.last5.points+=1;
  }
  if(scope.vsUlm){
    if(type==='goal')profile.vsUlm.goals+=1;
    if(type==='assist')profile.vsUlm.assists+=1;
    profile.vsUlm.points+=1;
  }
}
function matchcenterFinalizeOpponentPlayerProfiles(map,last5GameKeys,totalGoals,totalAssists){
  const rows=[...map.values()].map(p=>{
    p.games=p.gamesSet.size;
    p.pointsPerGame=p.games?p.points/p.games:0;
    p.goalsPerGame=p.games?p.goals/p.games:0;
    p.goalShare=totalGoals?p.goals/totalGoals:0;
    p.assistShare=totalAssists?p.assists/totalAssists:0;
    p.last5.games=p.last5GamesSet.size;
    p.last5.pointsPerGame=p.last5.games?p.last5.points/p.last5.games:0;
    let streak=0;
    for(const gameKey of [...last5GameKeys].reverse()){
      if((p.gamePoints[gameKey]||0)>0)streak+=1;
      else break;
    }
    p.last5.scoringStreak=streak;
    p.vsUlm.games=p.vsUlmGamesSet.size;
    p.vsUlm.pointsPerGame=p.vsUlm.games?p.vsUlm.points/p.vsUlm.games:0;
    p.vsUlm.goalsPerGame=p.vsUlm.games?p.vsUlm.goals/p.vsUlm.games:0;
    p.noDirectUlmData=p.vsUlm.games===0;
    p.ulmFit=p.vsUlm.games&&p.games&&p.pointsPerGame>0?p.vsUlm.pointsPerGame-p.pointsPerGame:null;
    const vsPpgScore=matchcenterClamp((p.vsUlm.pointsPerGame/2.6)*100);
    const vsGpgScore=matchcenterClamp((p.vsUlm.goalsPerGame/1.7)*100);
    const formScore=matchcenterClamp((p.last5.pointsPerGame/2.4)*80+Math.min(20,p.last5.scoringStreak*6));
    const generalScore=matchcenterClamp((p.pointsPerGame/2.3)*70+(p.goalsPerGame/1.4)*30);
    const clutchScore=matchcenterClamp((p.vsUlm.clutchGoals+p.vsUlm.lateGoals)*18);
    p.dangerScore=Math.round(p.vsUlm.games
      ?matchcenterClamp(vsPpgScore*.35+vsGpgScore*.2+formScore*.25+generalScore*.15+clutchScore*.05)
      :matchcenterClamp(formScore*.48+generalScore*.44+(p.goalsPerGame/1.4)*8));
    p.formBadge=p.last5.pointsPerGame>=1.5||p.last5.scoringStreak>=3?'hot':p.last5.pointsPerGame>=0.8?'stable':p.last5.points>0?'rising':'stabil';
    return p;
  });
  const topGoalGetter=[...rows].sort((a,b)=>b.goals-a.goals||b.points-a.points)[0];
  for(const p of rows){
    if(p.vsUlm.games&&p.vsUlm.pointsPerGame>=1){
      p.dangerReason=`${matchcenterFmt(p.vsUlm.pointsPerGame,1)} Punkte/Spiel gegen Ulm`;
    }else if(p.last5.points>=4){
      p.dangerReason=`${p.last5.points} Punkte in den letzten ${p.last5.games} Spielen`;
    }else if(topGoalGetter&&p.key===topGoalGetter.key&&p.goals>0){
      p.dangerReason='stärkster Torjäger des Gegners';
    }else if(p.noDirectUlmData&&p.last5.points>0){
      p.dangerReason='keine direkte Ulm-Datenbasis, aber aktuelle Form';
    }else{
      p.dangerReason=`${p.points} Punkte im gewählten Kontext`;
    }
  }
  return rows.filter(p=>p.points>0||p.penaltyMinutes>0);
}
function matchcenterBuildOpponentScouting(opponentKey,context,seasonKey){
  const games=matchcenterScoutingGames(opponentKey,context,seasonKey);
  const aliasMode=matchcenterAliasModeForContext(context);
  const directGames=matchcenterContextGames(matchcenterDirectGames(opponentKey,aliasMode),context==='alltime'?'alltime':context==='h2h5'?'h2h5':'current',seasonKey);
  const directKeys=new Set(directGames.map(matchcenterGameKey));
  const last5Games=[...games].sort(matchcenterSortGamesAsc).slice(-5);
  const last5Keys=new Set(last5Games.map(matchcenterGameKey));
  const profiles=new Map();
  let totalGoals=0,totalAssists=0;
  for(const g of games){
    const side=matchcenterGameSideForOpponentKey(g,opponentKey,g._mcSeasonKey,aliasMode);
    if(!side)continue;
    const teamName=matchcenterGameTeamName(g,side);
    const teamKey=matchcenterTeamKey(teamName,g._mcSeasonKey);
    const gameKey=matchcenterGameKey(g);
    const isLast5=last5Keys.has(gameKey);
    const isVsUlm=directKeys.has(gameKey);
    for(const rosterPlayer of matchcenterRosterPlayers(g,side)){
      if(rosterPlayer?.goalkeeper&&!(rosterPlayer?.scored||rosterPlayer?.points))continue;
      const p=matchcenterEnsureOpponentPlayer(profiles,rosterPlayer,teamName,teamKey,rosterPlayer?.trikot_number);
      if(!p)continue;
      matchcenterRegisterPlayerGame(p,gameKey,'gamesSet');
      if(isLast5)matchcenterRegisterPlayerGame(p,gameKey,'last5GamesSet');
      if(isVsUlm)matchcenterRegisterPlayerGame(p,gameKey,'vsUlmGamesSet');
    }
    for(const ev of g.events||[]){
      if(ev?.event_team!==side)continue;
      if(ev?.event_type==='goal'){
        totalGoals+=1;
        const scorerNumber=matchcenterEventNumber(ev,'number');
        const scorer=matchcenterFindRosterPlayer(g,side,scorerNumber);
        const scorerProfile=matchcenterEnsureOpponentPlayer(profiles,scorer,teamName,teamKey,scorerNumber);
        if(scorerProfile){
          matchcenterRegisterPlayerGame(scorerProfile,gameKey,'gamesSet');
          if(isLast5)matchcenterRegisterPlayerGame(scorerProfile,gameKey,'last5GamesSet');
          if(isVsUlm)matchcenterRegisterPlayerGame(scorerProfile,gameKey,'vsUlmGamesSet');
          matchcenterAddScoring(scorerProfile,gameKey,'goal',{last5:isLast5,vsUlm:isVsUlm});
          if(isVsUlm&&matchcenterIsLateGoalEvent(ev))scorerProfile.vsUlm.lateGoals+=1;
          if(isVsUlm&&matchcenterIsClutchGoalEvent(ev,side))scorerProfile.vsUlm.clutchGoals+=1;
        }
        const assistNumber=matchcenterEventNumber(ev,'assist');
        if(assistNumber){
          totalAssists+=1;
          const assister=matchcenterFindRosterPlayer(g,side,assistNumber);
          const assistProfile=matchcenterEnsureOpponentPlayer(profiles,assister,teamName,teamKey,assistNumber);
          if(assistProfile){
            matchcenterRegisterPlayerGame(assistProfile,gameKey,'gamesSet');
            if(isLast5)matchcenterRegisterPlayerGame(assistProfile,gameKey,'last5GamesSet');
            if(isVsUlm)matchcenterRegisterPlayerGame(assistProfile,gameKey,'vsUlmGamesSet');
            matchcenterAddScoring(assistProfile,gameKey,'assist',{last5:isLast5,vsUlm:isVsUlm});
          }
        }
      }else if(ev?.event_type==='penalty'){
        const number=matchcenterEventNumber(ev,'number');
        const penalized=matchcenterFindRosterPlayer(g,side,number);
        const profile=matchcenterEnsureOpponentPlayer(profiles,penalized,teamName,teamKey,number);
        const mins=matchcenterPenaltyMinutes(ev);
        if(profile&&mins){
          profile.penaltyMinutes+=mins;
          if(isVsUlm)profile.vsUlm.penaltyMinutes+=mins;
        }
      }
    }
  }
  const players=matchcenterFinalizeOpponentPlayerProfiles(profiles,[...last5Keys],totalGoals,totalAssists);
  const byDanger=[...players].sort((a,b)=>b.dangerScore-a.dangerScore||b.vsUlm.points-a.vsUlm.points||b.points-a.points).slice(0,5);
  const topPlayers=[...players].filter(p=>p.points>0).sort((a,b)=>b.points-a.points||b.goals-a.goals||b.pointsPerGame-a.pointsPerGame).slice(0,5);
  const vsUlm=[...players].filter(p=>p.vsUlm.points>0).sort((a,b)=>b.vsUlm.points-a.vsUlm.points||b.vsUlm.goals-a.vsUlm.goals||b.vsUlm.pointsPerGame-a.vsUlm.pointsPerGame).slice(0,5);
  const form=[...players].filter(p=>p.last5.points>0).sort((a,b)=>b.last5.points-a.last5.points||b.last5.pointsPerGame-a.last5.pointsPerGame).slice(0,5);
  const insights=matchcenterBuildOpponentPlayerInsights({players,byDanger,topPlayers,vsUlm,form,games,last5Games});
  return{players,byDanger,topPlayers,vsUlm,form,insights,games,last5Games,totalGoals,totalAssists};
}
function matchcenterBuildOpponentPlayerInsights(scout){
  const insights=[];
  const danger=scout.byDanger?.[0];
  if(danger)insights.push(`${danger.name} ist aktuell der hoechste Watchlist-Spieler (${danger.dangerScore}/100).`);
  const vs=scout.vsUlm?.[0];
  if(vs)insights.push(`${vs.name} war gegen Ulm am produktivsten: ${vs.vsUlm.points} Punkte in ${vs.vsUlm.games} Spiel${vs.vsUlm.games!==1?'en':''}.`);
  const hot=(scout.form||[]).filter(p=>p.last5.pointsPerGame>=1.5).length;
  if(hot)insights.push(`${hot} Gegner-Spieler liegen im Formfenster bei mindestens 1,5 Punkten pro Spiel.`);
  const missingDirect=(scout.byDanger||[]).filter(p=>p.noDirectUlmData).length;
  if(missingDirect)insights.push(`Bei ${missingDirect} Watchlist-Spieler${missingDirect!==1?'n':''} basiert die Bewertung stärker auf aktueller Form, weil direkte Ulm-Daten fehlen.`);
  const concentration=scout.topPlayers?.[0]&&scout.totalGoals?scout.topPlayers[0].goalShare:0;
  if(concentration>=0.35)insights.push('Die groesste Torgefahr buendelt sich stark auf einen einzelnen Gegner-Spieler.');
  return insights.slice(0,5);
}
function matchcenterResultLetter(result){
  return result==='W'?'S':result==='D'?'U':result==='L'?'N':'-';
}
function matchcenterStoryInitials(name){
  const parts=String(name||'').replace(/[^\p{L}\p{N}\s-]/gu,' ').split(/\s+/).filter(Boolean);
  if(!parts.length)return'??';
  const initials=parts.slice(0,2).map(part=>part[0]||'').join('').toUpperCase();
  return initials||'??';
}
function matchcenterStoryTeamAssetKey(name,seasonKey=''){
  const raw=cleanText(name||'').trim();
  if(!raw)return'';
  return normalizeTeamName(getCanonicalTeamName(raw,seasonKey,'season')).replace(/ /g,'-');
}
function matchcenterStoryShortTeamLabel(name){
  const raw=cleanText(name||'').trim();
  if(!raw)return'Team';
  if(/breisgau/i.test(raw))return'Breisgau';
  if(/feuerbach/i.test(raw))return'Feuerbach';
  if(/t[üu]bingen/i.test(raw))return'Tübingen';
  if(/schriesheim/i.test(raw))return'Schriesheim';
  if(/heidelberg/i.test(raw))return'Heidelberg';
  if(/mannheim/i.test(raw))return'Mannheim';
  if(/karlsruhe/i.test(raw))return'Karlsruhe';
  if(raw.length<=14)return raw;
  const compact=raw
    .replace(/^SV\s*03\s+/i,'')
    .replace(/^SV\s+/i,'')
    .replace(/^TV\s+/i,'')
    .replace(/^FBC\s+/i,'')
    .replace(/^DJK\s+Giants\s+/i,'')
    .replace(/^Floorball\s+/i,'')
    .replace(/^Sportvg\s+/i,'')
    .replace(/\s+Sharks$/i,'')
    .trim();
  if(compact&&compact.length<=16)return compact;
  return raw.split(/\s+/).slice(-2).join(' ');
}
function matchcenterStoryFormLetters(form){
  return (form?.last5||[]).map(row=>matchcenterResultLetter(row.result)).filter(letter=>letter&&letter!=='-');
}
function matchcenterStoryPlayer(row,teamLabel,kind='opponent'){
  if(!row)return{
    name:'Noch offen',
    team:teamLabel,
    stat:'Keine Scorerdaten',
    line:'Datenbasis offen',
    note:'Form offen'
  };
  const last5=row.last5||{};
  const season=row.season||{};
  const direct=row.direct||row.vsUlm||{};
  const lastGames=matchcenterNum(last5.games,0);
  const lastPoints=matchcenterNum(last5.points,0);
  const lastGoals=matchcenterNum(last5.goals,0);
  const lastAssists=matchcenterNum(last5.assists,0);
  const fallbackGames=matchcenterNum(row.games,0)||matchcenterNum(season.games,0)||matchcenterNum(direct.games,0);
  const points=lastGames?lastPoints:(matchcenterNum(row.points,0)||matchcenterNum(season.points,0)||matchcenterNum(direct.points,0));
  const goals=lastGames?lastGoals:(matchcenterNum(row.goals,0)||matchcenterNum(season.goals,0)||matchcenterNum(direct.goals,0));
  const assists=lastGames?lastAssists:(matchcenterNum(row.assists,0)||matchcenterNum(season.assists,0)||matchcenterNum(direct.assists,0));
  const games=lastGames||fallbackGames;
  const stat=games?`${points} Pkt. in ${games} Sp.`:'Scorerdaten offen';
  const clutch=kind==='ulm'
    ?matchcenterNum(row.clutchGoals,0)+matchcenterNum(row.leadGoals,0)+matchcenterNum(row.equalizerGoals,0)+matchcenterNum(row.lateGoals,0)
    :matchcenterNum(direct.clutchGoals,0)+matchcenterNum(direct.lateGoals,0);
  const note=clutch?`${clutch} wichtige Treffer`:(lastGames?'letzte Spiele':'Saison-/Direktdaten');
  return{
    name:row.name||'Unbekannt',
    team:teamLabel||row.teamName||'Team',
    stat,
    line:`${goals} Tore / ${assists} Assists`,
    note
  };
}
function matchcenterStoryFormRecord(form){
  const t=form?.totals||{};
  const games=matchcenterNum(t.games,0);
  if(!games)return'keine Spiele';
  return`${matchcenterNum(t.w,0)}S ${matchcenterNum(t.d,0)}U ${matchcenterNum(t.l,0)}N`;
}
