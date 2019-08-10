const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config');


client.on('ready', () => {

    console.log('I am ready!');

});


// Runs when message is sent
client.on('message', message => {

    messageString = message.content;

    // Return if not in selected channel or starts with a .
    if (!config.channel.includes(message.channel.name) || !messageString.startsWith(".")) {
        return;
    }
    
    // Cut off .
    messageString = messageString.slice(1);

    if (messageString === 'ping') {

        message.reply('No Fuck You'.toUpperCase());

    }
	if (messageString === 'pong') {

        message.reply('ping'.toUpperCase());

    }
});



// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret