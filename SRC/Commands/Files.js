const { findPlayerByNumber } = require('../db');
const { formatPlayer } = require('../utils');

function runFiche({ targetNumber, sendMessage }) {
  const p = findPlayerByNumber(targetNumber);
  if (!p) return sendMessage('Aucune fiche trouvée pour cet utilisateur.');
  return sendMessage(formatPlayer(p));
}

module.exports = { runFiche };
