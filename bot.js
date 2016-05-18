// Get npm modules discord.js
try {
	var Discord = require("discord.js");
} catch (e){
	console.log(e.stack);
	console.log(process.version);
	console.log("Please run npm install and ensure it passes with no errors!");
	process.exit();
}

// Get npm modules request
try {
	var request = require("request");
} catch (e){
	console.log(e.stack);
	console.log(process.version);
	console.log("Please run npm install and ensure it passes with no errors!");
	process.exit();
}

// Get authentication data
try {
	var AuthDetails = require("./auth.json");
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

//  Get Rtwitter 
try {
	var exec = require('child_process').exec;
} catch (e){
	console.log("Please verify Rtwitter configuration");
	process.exit();
}

// RtwitterBot : https://github.com/rancoud/RTwitterBot
//  Get Rtwitter 
try {
	var cmd = 'exec node /usr/lib/node_modules/RTwitterBot/job.js lasttweet "TasakaSama"';
} catch (e){
	console.log("Please verify and select Twitter Account in job");
	process.exit();
}

//  Get Rtwitter 
try {
	var lastwolf = 'exec node /usr/lib/node_modules/RTwitterBot/job.js lasttweet "lastwolfplays"';
} catch (e){
	console.log("Please verify and select Twitter Account in job");
	process.exit();
}

//  Get Rtwitter 
try {
	var TheDivisionGame = 'exec node /usr/lib/node_modules/RTwitterBot/job.js lasttweet "TheDivisionGame"';
} catch (e){
	console.log("Please verify and select Twitter Account in job");
	process.exit();
}

//  Define & Connect Bot on Discord 
try {
	var bot = new Discord.Client();
} catch (e){
	console.log("");
	process.exit();
}


bot.on("message", function(message){
	 var input = message.content.toLowerCase().trim(); 

//Command List
    if(input === "!command")
        {
            mybot.reply(message, "Hey voici la liste des choses que je peux faire : !rules \n !social \n !thedivision \n !farmroad \n !diablo3 \n !drahquebible \n !stream \n !donnation \n !hardware \n !nvidia \n !planning \n !tasaka \n !lastwolfplay \n !thedivision");
        }
	
	
	//Commande de bienvenu
	if(input === "yop tout le monde")
        {
            mybot.reply(message, "Hey coucou toi bienvenu");
        }
	if(input === "yop")
        {
            mybot.reply(message, "Hey coucou toi bienvenu");
        }
	if(input === "salut la meute")
        {
            mybot.reply(message, "Hey coucou toi bienvenu");
        }
	if(input === "bonjour")
        {
            mybot.reply(message, "Hey coucou toi bienvenu");
        }
	if(input === "hi")
        {
            mybot.reply(message, "Hey coucou toi bienvenu");
        }
	if(input === "salut")
        {
            mybot.reply(message, "Hey coucou toi bienvenu");
        }
	
	
	//Command Bot Twitch
    if(input === "!rules")
        {
            mybot.sendMessage(message, "Bienvenu(e)s dans la meute ! \n Ici les deux seules règles qui prévalent sont le respect des autres et de l'orthographe. \n Les traits d'esprits sont vivement encouragés et n'oubliez pas qu'en écrivant sur le tchat vos écrits sont publics ! \n Bon jeu");
        }
    if(input === "!social")
        {
            mybot.sendMessage(message, "Le dernier loup sur la toile c'est par là : https://twitter.com/lastwolfplays \n https://www.facebook.com/lastwolfplays \n https://www.youtube.com/channel/UC_D3dHEqqZrx_k82v5lJglQ");
        }
    if(input === "!thedivision")
        {
            mybot.sendMessage(message, "Un des gdoc de référence sur le jeu : https://goo.gl/aLkMld  \n Map de la DZ complète avec filtres  http://goo.gl/JhFEGU \n le gdoc de pandé avec les builds dps et supports => https://goo.gl/zuFN36");
        }
    if(input === "!farmroad")
        {
            mybot.sendMessage(message, "https://youtu.be/qkAqSGHir30");
        }
    if(input === "!diablo3")
        {
            mybot.sendMessage(message, "Voici la liste de mes personnages : http://eu.battle.net/d3/fr/profile/Lastwolf-2869/hero/54563586");
        }
    if(input === "!drahquebible")
        {
            mybot.sendMessage(message, "Voici le Gdoc de référence sur le start de saison sur Diablo 3 : https://docs.google.com/spreadsheets/d/1gCq8ihJBcYDZpPICFqA407fL0Fl_K9PMBp83npy5DcM/htmlview?usp=sharing&sle=true");
        }
    if(input === "!stream")
        {
            mybot.sendMessage(message, "hey voici le stream de lastwolf : https://www.twitch.tv/lastwolfplay");
        }
	if(input === "!nvidia")
        {
            mybot.sendMessage(message, "hey Lastwolfplay lance son stream sur NvidiaFrance : https://www.twitch.tv/nvidiafrance");
        }
    if(input === "!donnation")
        {
            mybot.sendMessage(message, "hey si toi aussi tu veux soutenir le stream de lastwolf : https://www.twitchalerts.com/donate/lastwolfplay \n les donnations ne sont pas obligatoire mais elles aident pour l'amélioration du stream");
        }
    if(input === "!hardware")
        {
            mybot.sendFile(message, "./Assets/hardware.jpg");
        }

// Sends the last tweet @Username
if(input === "!tasaka"){
	exec(cmd, function(error, stdout, stderr) {
	mybot.sendMessage(message, "Tasaka viens de tweet : " + stdout);
    });
}

// Sends the last tweet @Username
if(input === "!lastwolf"){
	exec(lastwolf, function(error, stdout, stderr) {
	mybot.sendMessage(message, "Lastwolf viens de tweet : " + stdout);	
    });
}

// Sends the last tweet @Username
if(input === "!tweetdivision"){
	exec(TheDivisionGame, function(error, stdout, stderr) {
	mybot.sendMessage(message, "TheDivisionGame viens de tweet : " + stdout);	
    });
}

//Parse json API Twitch
	if(input === "!planning")
        {
			request({
				url: url,
				json: true
			}, function (error, response, body) {

	if (!error && response.statusCode === 200) {
			bot.sendFile(message, body.video_banner);}
				})
    	}

// bot function close
});

 
// login Discord TasakaBot
bot.login(AuthDetails.token);
