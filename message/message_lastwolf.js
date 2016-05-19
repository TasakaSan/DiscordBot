module.exports.message = function(message, mybot, input) {
  // get username
  username = "lastwolfplays";

  // Get authentication data
  try {
  	var AuthDetails = require("../auth.json");
  } catch (e){
  	console.log("Please create an auth.json with at least an email and password.\n"+e.stack);
  	process.exit();
  }

  // Get npm modules twitter
  try {
  	var Twitter = require('twitter');
  } catch (e){
  	console.log(e.stack);
  	console.log(process.version);
  	console.log("Please run npm install and ensure it passes with no errors!");
  	process.exit();
  }

  // Define twitter client
  try {
  	var twitter_client = new Twitter({
  	  consumer_key: AuthDetails.twitter.consumer_key,
  	  consumer_secret: AuthDetails.twitter.consumer_secret,
  	  access_token_key: AuthDetails.twitter.access_token_key,
  	  access_token_secret: AuthDetails.twitter.access_token_secret
  	});
  } catch (e){
  	console.log("Error Twitter.Client");
  	process.exit();
  }

  // Call twitter API
  var params = {screen_name: username};
  twitter_client.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error) {
      mybot.sendMessage(message, username + " viens de tweet : " + tweets[0].text);
    }
  });

}
