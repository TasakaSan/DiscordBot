/*Object.prototype.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};*/

console.log('Start generating !');
// Get all required npm modules
try {
	var fs = require("fs");
	console.log("LIB : fs [OK]");
} catch(e) {
	console.log(e.stack);
	console.log(process.version);
	console.log("Please run npm install fs and ensure it passes with no errors!");
	process.exit();
}

console.log("Generating basics...");

try {
	var data = fs.readFileSync(__dirname+"/commands/basics.txt", 'utf8');
} catch(e) {
	console.log("File: commands/basics.txt READ ERROR");
	console.log(e.stack);
	process.exit();
}

var lines = data.split("\n");
var commands  = {};
var basics = {};
var nb_command = 0;
for (i in lines) {
	var line = lines[i].split(";");
	commands[line[0]] = {};
	commands[line[0]].description = line[1];
	if (line[2]) {
		commands[line[0]].message = line[2].replace("\r","");
	}
	basics[line[0]] = {};
	basics[line[0]].description = line[1];
	if (line[2]) {
		basics[line[0]].message = line[2].replace("\r","");
	}
	nb_command++;
}

var basics_datastring = JSON.stringify(basics, null, 4);

try {
	fs.writeFileSync(__dirname+"/commands/basics.json", basics_datastring, 'utf8');
} catch(e) {
	console.log("File: commands/basics.json WRITE ERROR");
	console.log(e.stack);
	process.exit();
}

console.log("Basics done! "+nb_command+" commands added.");

process.exit();