console.log('Start');
// Get npm modules discord.js
try {
	var Discord = require("discord.js");
	console.log("LIB : discord.js [OK]");
} catch (e){
	console.log(e.stack);
	console.log(process.version);
	console.log("Please run npm install and ensure it passes with no errors!");
	process.exit();
}

// Get npm modules request
try {
	var request = require("request");
	console.log("LIB : request [OK]");
} catch (e){
	console.log(e.stack);
	console.log(process.version);
	console.log("Please run npm install and ensure it passes with no errors!");
	process.exit();
}

// Get authentication data
try {
	var AuthDetails = require("./auth.json");
	console.log("FILE : auth.json [OK]");
} catch (e){
	console.log("Please create an auth.json with at least an email and password.\n"+e.stack);
	process.exit();
}

// Get Twitch API data
try {
	var url = "https://api.twitch.tv/kraken/channels/lastwolfplay";
} catch (e){
	console.log("Please verify your username to twitch api");
	process.exit();
}

// File exists
var fs = require('fs');
function fileExists(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}

//  Define & Connect Bot on Discord
try {
	var mybot = new Discord.Client();
	console.log("OBJ : Discord.Client() [OK]");
} catch (e){
	console.log("Error Discord.Client");
	process.exit();
}

// Define message
mybot.on("message", function(message) {
	var input = message.content.toLowerCase().trim();

	// le bloc qui suit permet de charger à la volée des commandes custom
	if (input.startsWith("!")) { // les commandes démarrent avec !
		var command = input.replace("!",""); // je supprime le !
		if (command.indexOf(" ") > -1) { // si il y a un espace c'est qu'il y a une sous commande, donc ne prendre que la commande !commande
			command = command.substring(0, command.indexOf(' ')).trim();
		}

		// Chargement dynamique du module
		var filename = "./message/message_" + command + ".js";
		if (fileExists(filename)){
			console.log(filename + " [load ok]");
			require(filename).message(message, mybot, input);
		}
	}



	// Commande List
	if(input === "!command") {
		mybot.reply(message, "Hey voici la liste des choses que je peux faire : !rules \n !social \n !thedivision \n !farmroad \n !diablo3 \n !drahquebible \n !stream \n !donnation \n !hardware \n !nvidia \n !planning \n !tasaka \n !lastwolfplay \n !thedivision");
	}

	// Commande de bienvenu
	if(input === "yop tout le monde") {
		mybot.reply(message, "Hey coucou toi bienvenu");
	}
	if(input === "yop") {
		mybot.reply(message, "Hey coucou toi bienvenu");
	}
	if(input === "salut la meute") {
		mybot.reply(message, "Hey coucou toi bienvenu");
	}
	if(input === "bonjour") {
		mybot.reply(message, "Hey coucou toi bienvenu");
	}
	if(input === "hi") {
		mybot.reply(message, "Hey coucou toi bienvenu");
	}
	if(input === "salut") {
		mybot.reply(message, "Hey coucou toi bienvenu");
	}

	// Commande Bot Twitch
	if(input === "!rules") {
		mybot.sendMessage(message, "Bienvenu(e)s dans la meute ! \n Ici les deux seules règles qui prévalent sont le respect des autres et de l'orthographe. \n Les traits d'esprits sont vivement encouragés et n'oubliez pas qu'en écrivant sur le tchat vos écrits sont publics ! \n Bon jeu");
	}
	if(input === "!social") {
		mybot.sendMessage(message, "Le dernier loup sur la toile c'est par là : https://twitter.com/lastwolfplays \n https://www.facebook.com/lastwolfplays \n https://www.youtube.com/channel/UC_D3dHEqqZrx_k82v5lJglQ");
	}
	if(input === "!thedivision") {
		mybot.sendMessage(message, "Un des gdoc de référence sur le jeu : https://goo.gl/aLkMld  \n Map de la DZ complète avec filtres  http://goo.gl/JhFEGU \n le gdoc de pandé avec les builds dps et supports => https://goo.gl/zuFN36");
	}
	if(input === "!farmroad") {
		mybot.sendMessage(message, "https://youtu.be/qkAqSGHir30");
	}
	if(input === "!diablo3") {
		mybot.sendMessage(message, "Voici la liste de mes personnages : http://eu.battle.net/d3/fr/profile/Lastwolf-2869/hero/54563586");
	}
	if(input === "!drahquebible") {
		mybot.sendMessage(message, "Voici le Gdoc de référence sur le start de saison sur Diablo 3 : https://docs.google.com/spreadsheets/d/1gCq8ihJBcYDZpPICFqA407fL0Fl_K9PMBp83npy5DcM/htmlview?usp=sharing&sle=true");
	}
	if(input === "!stream") {
		mybot.sendMessage(message, "hey voici le stream de lastwolf : https://www.twitch.tv/lastwolfplay");
	}
	if(input === "!nvidia") {
		mybot.sendMessage(message, "hey Lastwolfplay lance son stream sur NvidiaFrance : https://www.twitch.tv/nvidiafrance");
	}
	if(input === "!donnation") {
		mybot.sendMessage(message, "hey si toi aussi tu veux soutenir le stream de lastwolf : https://www.twitchalerts.com/donate/lastwolfplay \n les donnations ne sont pas obligatoire mais elles aident pour l'amélioration du stream");
	}
	if(input === "!hardware") {
		mybot.sendFile(message, "./Assets/hardware.jpg");
	}

	// Parse json API Twitch
	if (input === "!planning") {
		request({
			url: url,
			json: true
		}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				mybot.sendFile(message, body.video_banner);
			}
		})
	}

// bot function close
});

mybot.on('ready', () => {
	console.log("Bot is ready.");
});

// login Discord TasakaBot
mybot.loginWithToken(AuthDetails.discord.token).then(bot_success).catch(bot_error);

function bot_success(token){
    // handle success
}

function bot_error(error){
    // handle error
		console.log('ERROR');
		console.log(error);
}
