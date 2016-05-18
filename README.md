# DiscordBot

Un bot pour l'application Discord base sur l'API Discord.js

## Installation

Ce bot fonctionne avec node.js. Pour plus d'information : https://nodejs.org/en/download/

Il est necessaire d'installer les nodes modules suivant :

1. Require Discord.js : https://www.npmjs.com/package/discord.js
2. Require Request : https://www.npmjs.com/package/request

Le bot utilise egalement un autre service qui est [Rtwitterbot](https://github.com/rancoud/RTwitterBot)
Qui necessite aussi une configuration...

Creer une application Twitter sur https://apps.twitter.com/
1. Installer les dependances avec npm install
2. Modifier le fichier conf.twitter.app.js
3. Ajouter les name , consumer_key , consumer_secret , access_token_key , access_token_secret (callback_url is for user authentification)

## Running


Avant de lancer votre application il est necessaire de modifier le fichier auth.json et d'y ajouter vos authentifications.

    "token": "Generation du token de l'app via https://discordapp.com/developers/applications" 
    "email": "Optionnel"
    "password": "Optionnel"

Pour demarrer le bot il faut utiliser "node bot.js"
