console.log('Start');
// Get all required npm modules
var package_info = require("./package.json");
for(var dependency in package_info.dependencies) {
	var name = dependency.replace('.js','');
	console.log("Loading "+dependency);
	try {
		eval("var "+name+" = require(\""+dependency+"\")");
		console.log("LIB : "+dependency+" [OK]");
	} catch(e) {
		console.log(e.stack);
		console.log(process.version);
		console.log("Please run npm install "+dependency+" and ensure it passes with no errors!");
		process.exit();
	}
}

// Check the existance of a given file
function fileExists(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}

// Get authentication data
try {
	var AuthDetails = require("./auth.json");
	console.log("FILE : auth.json [OK]");
} catch (e){
	console.log("Please create an auth.json with at least an email and password.\n"+e.stack);
	process.exit();
}

//  Define & Connect Bot on Discord
try {
	var options = { autoReconnect: true };
	var mybot = new discord.Client(options);
	console.log("OBJ : discord.Client() [OK]");
} catch (e){
	console.log("Error discord.Client");
	process.exit();
}

mybot.on('ready', function () {
	//require("./plugins.js").init();
	console.log("Bot is ready.");
});

mybot.on("disconnected", function () {
	console.log("Disconnected!");
	process.exit(1); //exit node.js with an error
	
});

// Get command list
try {
	var commands = require("./commands/basics.json");
	console.log("FILE : commands/basics.json [OK]");
} catch (e){
	console.log("Please check the commands/basics.json file.\n"+e.stack);
	process.exit();
}

mybot.on("message", function(message) {
	if(message.author == mybot.user) {
		return;
	}
	
	var input = message.content.trim();
	
	// message is a command
	if(input[0] === '!') {		
		console.log("raw command: "+input);
	
		var user_cmd = {};
		user_cmd.name = input.split(" ")[0].substring(1);
		user_cmd.content = input.substring(user_cmd.name.length+2);
		
		user_cmd.name = user_cmd.name.toLowerCase();
		
		console.log("command "+user_cmd.name+" from "+message.author);
		
		//console.log("user_cmd: "+JSON.stringify(user_cmd));
		
		var command = commands[user_cmd.name];
		if(!command) {
			console.log("command "+user_cmd.name+" not defined in commands!");
		} else if (user_cmd.name == "command+" || user_cmd.name == "command") {
			// specific help command
			var info = command.message;
			for(var cmd in commands) {
				info += "\n!" + cmd;
				if (user_cmd.name == "command+") {
					var usage = commands[cmd].usage;
					if(usage){
						info += " " + usage;
					}
					var description = commands[cmd].description;
					if(description){
						info += "\n\t" + description;
					}
				}
			}
			mybot.sendMessage(message.channel, info);
		} else {
			//if (command.process) {}
			//if (command.file) {}
			if (command.message) {
				mybot.sendMessage(message.channel, command.message.replace(/#NL#/g,"\n"));
			} else {
				console.log("Empty command "+user_cmd.name+": "+JSON.stringify(command));
			}
		}
	} else if(input.indexOf(mybot.user.mention()) == 0) {
		// Bot is mentioned at beginning
		console.log("user "+message.author+" speak directly to Bot");
		try { 
			var user_cmd = {};
			user_cmd.mention = input.split(" ")[0];
			user_cmd.first = input.split(" ")[1];
			user_cmd.content = input.substring(mybot.user.mention().length+user_cmd.first.length+2);
			
			// do something ?
			
		} catch(e) { //no command 
			mybot.reply(message, "Oui ?");
		}
	} else if(message.isMentioned(mybot.user)) {
		// Bot is mentioned elsewhere
		console.log("user "+message.author+" mentioned Bot");
		mybot.sendMessage(message.channel, "On parle de moi ? :)");
	} else if(input.length >= 2 && input.length <= 24) {
		// Maybe dialog context is possible
		console.log("user may dialog with Bot");
		var dialogs = require("./dialogs/main.json");
		for(intro in dialogs) {
			if(input.toLowerCase().indexOf(intro) >= 0) {
				var answer = dialogs[intro];
				mybot.reply(message, answer.message);
				break;
			}
		}
	}
	
	// message is user speaking to/with bot
	if(input.indexOf(mybot.user.mention()) == 0) {
		console.log("user "+message.author+" is speaking with bot");
		// do something
	}

	// bot function close
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
