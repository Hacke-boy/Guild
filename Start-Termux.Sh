#!/usr/bin/env bash
# Script d'aide pour Termux
# Exécuter : bash start-termux.sh

# Installer dépendances si besoin
pkg update -y
pkg upgrade -y
pkg install -y nodejs git

# Installer pm2 si voulu
npm i -g pm2 || true

# Installer dépendances du projet
npm install

# Lancer en arrière-plan via pm2
pm2 start src/index.js --name ton-bot-gaming --watch
pm2 save

echo "Bot démarré via pm2. Voir logs: pm2 logs ton-bot-gaming"
