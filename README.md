# DiscordBot

Un bot pour l'application Discord base sur l'API Discord.js

## Clés

### Discord

Créer une application Discord sur https://discordapp.com/developers/applications/me

Ajouter un bot à votre application

Créez un token

#### Inviter le bot sur le serveur
Pour inviter le bot sur un serveur, utilisez l'adresse suivante :
`https://discordapp.com/oauth2/authorize?client_id=[id_application]&scope=bot&permissions=[Valeur_Permission]`
en prenant soin de remplacer id_application par l'id de votre application ainsi que de modifier les permissions (permission administration : 66321471) https://discordapp.com/developers/docs/topics/permissions#bitwise-permission-flags, puis choisissez le serveur dans lequel vous voulez inviter le bot


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

Installer avec `npm install`

(sur un raspberry pi le support audio n'est pas disponible : `npm install --no-optional` pour désactiver l'option)

### Configuration

Créez un fichier auth.json selon le modèle fourni dans auth.json.tpl et remplaçez les valeurs dans ce fichier

### Running

Pour demarrer le bot il faut utiliser `node bot.js`


## Installation dans docker

Le projet peut utiliser Docker (http://www.docker.io)

### Configuration

Créez un fichier d'environnement config.env selon le modèle fourni dans config.env.tpl et remplaçez les valeurs dans ce fichier (la création d'un fichier auth.json est automatique dans ce cas)

La configuration est externalisée afin de permettre l'utilisation du conteneur sur des environnements différents sans devoir le rebuild.

### Running

Construisez le projet avec la commande `docker-compose build`

Lançez le bot avec la commande `docker-compose up`

### Developpement

Pour modifier le code du bot sans rebuild à chaque fois, il sufit de décommenter le volume dans docker-compose.yml pour utiliser le fichier source au lieu du fichier dans le conteneur

## Architecture des modules

Il est maintenant possible de créer des modules d'autoréponse aux messages de type `!command`

Pour créer un nouveau module, s'inspirer du fichier `message/message_hello.js`

Une commande `!test` va charger dynamiquement le fichier `message/message_test.js` et executer la fonction qui est exportée.

Les objets `message`, `mybot`, `input` sont automatiquement envoyés à la fonction `message()`
