const { db, save } = require('../db');
const { nanoid } = require('nanoid');

async function startRecruitFlow({ conn, from, sendMessage, requesterNumber }) {
  // simplified: store an empty form and instruct user to DM bot with answers
  const id = nanoid(8);
  db.data.recruitment_forms.push({ id, by: requesterNumber, status: 'open', answers: [], createdAt: new Date().toISOString() });
  await save();
  sendMessage(`Recrutement démarré (id: ${id}). Réponds en privé au bot avec tes 5 réponses dans l'ordre: rang, ID, style de jeu, disponibilité, commentaire.`);
}

module.exports = { startRecruitFlow };
