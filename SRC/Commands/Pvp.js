const { ensurePlayer, save, db } = require('../db');
const { addXp } = require('../utils');
const { randomUUID } = require('crypto');

function randInt(min, max){ return Math.floor(Math.random()*(max-min+1))+min; }

async function runPvP({ conn, from, groupId, mentioned, sendMessage, botNumber, admins }) {
  // mentioned: array of numbers mentioned in command
  // Exclude botNumber from selection
  let players = [];
  if (mentioned && mentioned.length >= 2) {
    players = mentioned.slice(0,2);
  } else {
    // fetch group participants
    try {
      const metadata = await conn.groupMetadata(groupId);
      const participants = metadata.participants.map(p => p.id);
      // filter bot and select 2 random
      const pool = participants.filter(p => !p.includes(botNumber));
      if (pool.length < 2) {
        return sendMessage('Pas assez de joueurs disponibles pour un PvP.');
      }
      // pick two
      while (players.length < 2) {
        const pick = pool[Math.floor(Math.random()*pool.length)];
        if (!players.includes(pick)) players.push(pick);
      }
    } catch (e) {
      console.error(e);
      return sendMessage('Impossible de récupérer participants du groupe.');
    }
  }

  const [p1num, p2num] = players;
  const p1 = ensurePlayer(p1num, p1num);
  const p2 = ensurePlayer(p2num, p2num);

  // simulate 3 rounds
  let p1Damage = 0, p2Damage = 0;
  for (let i=0;i<3;i++){
    p1Damage += randInt(10,30) + Math.floor(p1.level*0.5);
    p2Damage += randInt(10,30) + Math.floor(p2.level*0.5);
  }

  let winner, loser, winDmg, loseDmg;
  if (p1Damage === p2Damage) {
    // tie: decide randomly
    if (Math.random() > 0.5) { winner = p1; loser = p2; winDmg=p1Damage; loseDmg=p2Damage; } else { winner=p2; loser=p1; winDmg=p2Damage; loseDmg=p1Damage; }
  } else if (p1Damage > p2Damage) { winner = p1; loser = p2; winDmg=p1Damage; loseDmg=p2Damage; }
  else { winner = p2; loser = p1; winDmg=p2Damage; loseDmg=p1Damage; }

  // apply stats and xp
  winner.wins = (winner.wins||0)+1;
  loser.losses = (loser.losses||0)+1;
  addXp(winner.number, 50);
  addXp(loser.number, 15);
  await save();

  const msg = `PvP Résultat!\nGagnant: ${winner.number}\nDégâts: ${winDmg}\nPerdant: ${loser.number}\nDégâts: ${loseDmg}\nXP: +50 / +15`;
  sendMessage(msg);
}

module.exports = { runPvP };
