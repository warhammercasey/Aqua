const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config');


client.on('ready', () => {

    console.log('I am ready!');

});


// Runs when message is sent
client.on('message', message => {

    // Return if not in selected channel
    if (message.channel.name != config.channel) {
        return;
    }

    if (message.content === 'ping') {

        message.reply('No Fuck You'.toUpperCase());

    }
	if (message.content === 'pong') {

        message.reply('ping'.toUpperCase());

    }
});



// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret