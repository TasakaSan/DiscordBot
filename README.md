# DiscordBot

Un bot pour l'application Discord base sur l'API Discord.js

## Clés

### Discord

Créer une application Discord sur https://discordapp.com/developers/applications/me

Ajouter un bot à votre application

Créez un token

#### Inviter le bot sur le serveur
Pour inviter le bot sur un serveur, utilisez l'adresse suivante :
`https://discordapp.com/oauth2/authorize?client_id=[id_application]&scope=bot&permissions=0`
en prenant soin de remplacer id_application par l'id de votre application, puis choisissez le serveur dans lequel vous voulez inviter le bot


### Twitter

Créer une application Twitter sur https://apps.twitter.com/

Récupérez les valeurs :
- consumer_key
- consumer_secret
- access_token_key
- access_token_secret


## Installation normale

Ce bot fonctionne avec node.js. Pour plus d'information : https://nodejs.org/en/download/

Il utilise les modules suivants :

* Require Discord.js : https://www.npmjs.com/package/discord.js
* Require Request : https://www.npmjs.com/package/request
* Require Twitter : https://www.npmjs.com/package/twitter

Installer avec npm install

### Configuration

La configuration s'effectue dans auth.json, remplaçez les valeurs dans le fichier

### Running

Pour demarrer le bot il faut utiliser `node bot.js`


## Installation dans docker

Le projet peut utiliser Docker (http://www.docker.io)

Créez un fichier d'environnement config.env selon le modèle fourni dans config.env.tpl et remplaçez les valeurs dans ce fichier

Construisez le projet avec la commande `docker-compose build`

Lançez le bot avec la commande `docker-compose up`
