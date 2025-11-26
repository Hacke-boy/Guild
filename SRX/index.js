const bot = require('./bot');
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', bot: bot.isReady ? 'connected' : 'disconnected' });
});

app.listen(PORT, () => {
  console.log(`Web server running on http://localhost:${PORT}`);
});
