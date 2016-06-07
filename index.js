var conf = require('./conf');
var TelegramBot = require('node-telegram-bot-api');
var fs = require('fs');
var https = require('https');

// Bot with polling
var bot = new TelegramBot(conf.token, {polling: true});


// Get the bot info
bot.getMe()
.then(function(data){
	 console.log(data);
 })
.catch(function(err){
	console.log("Error: ",err);
});




// Welcome message, list of available actions
bot.onText(/\/start/, function(msg, matches){
	
	var fromId = msg.from.id;
	var resp = "Hola!\n"+
		"Acciones disponibles: \n"+
		"/say \n"+
		"/photo\n"+
		
		"hola\n"+
		""+
		""+
		"Salúdame con un \"hola\"";
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
	if(msg.text.toLowerCase()!="hola"){
		console.log(msg.text);
		//bot.sendMessage(msg.from.id,"Escribe hola" );
	}else{	
		bot.sendPhoto(chatId, photo, {caption: 'Caracola'});
	}
});

// Receive a photo by sending its name
// TODO: enable extensions
bot.onText(/\/photo (.+)/, function(msg, match){
	
	var fromId = msg.from.id;
	var photoName = match[1];
	var photos = fs.readdirSync('images');
	
	photos.forEach(function(elem){

		console.log(elem, photoName);	
		if(elem==photoName){
			
			bot.sendPhoto(msg.chat.id, 'images/'+elem, {caption: "Aquí la tienes!"});
		}
	});


	console.log("acaba bucle", photoName);

});

// TODO: Get geo and photos from name
bot.onText(/\/place (.+)/, function(msg, match){

	var fromId = msg.from.id;
	var place = match[1];

	


});

// TODO: managing inline messages
bot.on("inlineTest", function(msg){
		
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







