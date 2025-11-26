# Ton-Bot-Gaming (WhatsApp + Site) - MVP

Ce dépôt contient :
- Un bot WhatsApp (Baileys) avec commandes : !roulette, !pvp, !recruter, !fiche, !tournoi, !classement.
- Un site web minimal (page d'accueil) pour afficher l'état / lien du groupe.
- Base de données légère (lowdb) persistée dans data/db.json.
- Scripts pour lancer sur Termux.

Attention : Utilisation de Baileys implique connexion via QR code (WhatsApp Web). Respecte les conditions d'utilisation de WhatsApp.

Installation (local / Termux)
1. Cloner :
   git clone <repo-url>
   cd <repo>

2. Copier l'exemple d'env :
   cp .env.example .env
   Édite .env et remplis les valeurs.

3. Installer :
   npm install

4. Lancer (dev):
   npm run start

Sur Termux
- Installer Node.js (pkg install nodejs git)
- Installer pm2 si tu veux daemoniser : npm i -g pm2
- Lancer : bash start-termux.sh

Fonctionnalités principales
- !roulette -> win / lose / crit / bonus (XP attribuée)
- !pvp @user -> simule duel; si pas de mention, le bot choisit automatiquement 2 joueurs (exclut numéro BOT_NUMBER).
- !recruter -> passe 5 questions et enregistre la fiche.
- !fiche @user -> affiche stats + niveau + loot (si activé)
- !tournoi créer / liste / rejoindre -> gestion basique de tournois
- !classement -> affiche XP total des joueurs du clan

DB Schema (lowdb)
- players: {id, number, name, xp, level, wins, losses, loot:[], joinedAt}
- tournaments: {id, name, date, participants:[]}
- recruitment_forms: []

Support / Notes
- Pour déployer sur un serveur ou Raspberry Pi, préférable d'utiliser PM2 ou systemd.
- Si tu veux que je pousse le repo sur GitHub, donne le nom du repo et un token personnel (ou je peux te fournir commandes `gh repo create` pour que tu le fasses localement).
