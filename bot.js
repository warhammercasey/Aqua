const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config');


client.on('ready', () => {

    console.log('I am ready!');

});



client.on('message', message => {

    if (message.content === 'ping') {

        message.reply('pong'.toUpperCase());

    }

});



// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret