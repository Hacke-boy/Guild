const { addXp } = require('../utils');

function runRoulette({ from, sendMessage }) {
  const outcomes = [
    { name: 'win', xp: 20 },
    { name: 'lose', xp: 5 },
    { name: 'crit', xp: 60 },
    { name: 'bonus', xp: 35 }
  ];
  const r = outcomes[Math.floor(Math.random() * outcomes.length)];
  addXp(from, r.xp);
  sendMessage(`Résultat: *${r.name.toUpperCase()}*\nXP gagnée: ${r.xp}`);
}

module.exports = { runRoulette };
