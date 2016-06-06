var con = require('./con');
var TelegramBot = require('node-telegram-bot-api');
var fs = require('fs');
var https = require('https');

// Bot with polling
var bot = new TelegramBot(con.token, {polling: true});


// Get the bot info
bot.getMe()
.then(function(data){
	 console.log(data);
 })
.catch(function(err){
	console.log("Error: ",err);
});




// Welcome message, list of available actions
bot.onText(/\/start/, function(msg){
	
	var fromId = msg.from.id;
	var resp = "Hola!\n"+
		"Acciones disponibles: \n"+
		"/say mensaje \n"+
		"hola\n"+
		"";
	bot.sendMessage(fromId, resp);
			
});







// Command /say
bot.onText(/\/say (.+)/, function (msg, match) {
	
	var fromId = msg.from.id;
	
	// message without /say
	var resp = match[1];
	
	bot.sendMessage(fromId, resp);
});




// For every message (now only responds to "hola" message
bot.on('message', function (msg) {
	var chatId = msg.chat.id;
	// photo can be: a file path, a stream or a Telegram file_id
	var photo = 'images/hola.png';
	//console.log(msg.text);
	if(msg.text!="hola"){
		console.log(msg.text);
		//bot.sendMessage(msg.from.id,"Escribe hola" );
	}else{	
		bot.sendPhoto(chatId, photo, {caption: 'Caracola'});
	}
});

// Receive a photo
// TODO: search for local photo matches
bot.onText(/\/foto (.+)/, function(msg, match){
	
		var fromId = msg.from.id;
	var photoName = match[1];
	var photos = [];

	
	var resp = "No tenemos fotos de:"+photoName;
	console.log(match);
	bot.sendMessage(fromId, resp);

});

// TODO: Get geo and photos from name
bot.onText(/\/place (.+)/, function(msg, match){

	var fromId = msg.from.id;
	var place = match[1];
	console.log(place, match);

	


});

// TODO: managing inline messages
bot.onText("inlineTest", function(msg){
		
	var results = ["un", "dos", "tres"];
	var inlineQueryId= "23";

	bot.answerInlineQuery(inlineQueryId, results).then(function(response){
		console.log("test");
	});
});

// Downloads the voice file
// TODO: speech transcription
bot.on('voice', function(msg){

	var fromId = msg.from.id;

	
	// Voice file duration
	var sec=msg.voice.duration;
	var maxSec=40;
	
	// General response
	var resp="Has estado hablando "+sec+" segundos.\n El tamaño total de tu grabación es de: "+msg.voice.file_size;
	
	// Avoid long files
	if(msg.voice.file_size>100000){
		bot.sendMessage(fromId, "Nota de voz demasiado larga, llevas hablando más de "+sec+" segundos, intenta reducirlo a "+maxSec+" segundos ;)");
	}else{


		// Prepare the file
		var file = fs.createWriteStream("voice/"+msg.date+msg.voice.file_id+".ogg");

		// Get Telegram file info
		bot.getFile(msg.voice.file_id).then(function (filereq) {

			// Construct download url
			var voiceUrl = "https://api.telegram.org/file/bot"+con.token+"/"+filereq.file_path;
			
			// Download the voice file
			var request = https.get(voiceUrl, function(response){
				response.pipe(file);
			});

			bot.sendMessage(fromId, resp);
		});
		


	}
});







