#TELEGRAM BOT EXAMPLE WITH NODE.JS

This is a telegram bot example using Node.js with these modules:

**node-telegram-bot-api** - ([@yagop](https://github.com/yagop))

[https://github.com/yagop/node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)

**https**

[https://nodejs.org/api/https.html](https://nodejs.org/api/https.html)

**fs**

[https://nodejs.org/api/fs.html](https://nodejs.org/api/fs.html)

## Setting up your bot


### 1. Create a bot using @botfather

Add the `@botfather` to your telegram contact list.
You can add it directly by clicking here: [@botfather](http://telegram.me/botfather)


>Write `/newbot`

Now you can choose a name for your bot

>Write your bot name

>Finally, choose a bot name for your bot in this format `_name_bot`

You will receive your bot url and a token. Copy and save your token for the next step.

### 2. Create a file with your token

If you want to use this example, write your token in json format and export it.
You can do it by writing this unix command 

```shell
$ echo "module.exports = { token : 'YOUR_BOT_TOKEN'}" } > con.js
```

or create a new `con.js` file with this:

```
module.exports = {
	token : 'YOUR_TOKEN'
}
```

### 3. Install all dependences 

Right now, I'm using only an external dependence. You can add it in two ways:

**Using the `package.json` in this repository:**
```
npm install
```

_or_

**Installing modules manually**

- node-telegram-bot-api
```
npm install node-telegram-bot-api --save
```


### 4. Add and share your telegram bot

You can share and interact with your bot by adding it to your telegram contact list, just like you did before with @telegrambot
http://telegram.me/your-bot-name



## Bot actions in this example

### **Messages**

### /start

This is the initial required action to wake up your bot. It gives you the current actions.

### /say _something_

Simulates the echo function, the bot will say the same word you wrote.

### hola

A simple text message, the bot will answer to you with a photo ;)


### **Voice**

If you send a voice recording to the bot, it will download and store it in your `./voice` directory.
It will tell you the recording duration and the file size


## TODO:

- Search for local files in /photo action 
- Make a geo response in /place action
- Manage inline queries
- Voice speech recognition
- Make a response when receiving a photo














