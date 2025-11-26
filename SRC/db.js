const { Low, JSONFile } = require('lowdb');
const { join } = require('path');
const fs = require('fs');
require('dotenv').config();

const DATA_DIR = process.env.DATA_DIR || './data';
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const file = join(DATA_DIR, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

async function init() {
  await db.read();
  db.data = db.data || { players: [], tournaments: [], recruitment_forms: [] };
  await db.write();
}

function findPlayerByNumber(number) {
  return db.data.players.find(p => p.number === number);
}

function ensurePlayer(number, name = '') {
  let p = findPlayerByNumber(number);
  if (!p) {
    p = { id: number, number, name, xp: 0, level: 0, wins: 0, losses: 0, loot: [], joinedAt: new Date().toISOString() };
    db.data.players.push(p);
  }
  return p;
}

async function save() {
  await db.write();
}

module.exports = { db, init, findPlayerByNumber, ensurePlayer, save };
