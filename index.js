var con = require('./con');
var TelegramBot = require('node-telegram-bot-api');
var fs = require('fs');
var https = require('https');

// Bot with polling
var bot = new TelegramBot(con.token, {polling: true});



// Command /say
bot.onText(/\/say (.+)/, function (msg, match) {
	var fromId = msg.from.id;
	
	// message without /say
	var resp = match[1];
		
	console.log(match[1]);
	bot.sendMessage(fromId, resp);
});




// For every message
bot.on('message', function (msg) {
	var chatId = msg.chat.id;
	// photo can be: a file path, a stream or a Telegram file_id
	var photo = 'images/hola.png';
	//console.log(msg.text);
	if(msg.text!="hola"){
		//bot.sendMessage(msg.from.id,"Escribe hola" );
	}else{	
		bot.sendPhoto(chatId, photo, {caption: 'Caracola'});
	}
});

// Send a photo
bot.onText(/\/foto (.+)/, function(msg, match){
	var fromId = msg.from.id;
	var photoName = match[1];
	var resp = "No tenemos fotos de:"+photoName;
	console.log(match);
	bot.sendMessage(fromId, resp);

});

// Trying inline answers
bot.onText(/aa/, function(msg){
		var results = ["un", "dos", "tres"];
		var inlineQueryId= "23";
		bot.answerInlineQuery(inlineQueryId, results).then(function(response){
				console.log("entra");
				});
		});

// Speech to text (only stores file)
bot.on('voice', function(msg){

	var fromId = msg.from.id;

	// General response
	var resp="No te entiendo";
	
	// Voice file duration
	var sec=msg.voice.duration;
	var maxSec=40;
	
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







