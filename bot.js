const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config');
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg');
const opus = require('node-opus');
const nhentai = require('nhentai-js');

var connection;


client.on('ready', () => {

    console.log('I am ready!');
    console.log(nhentai);

});


// Runs when message is sent
client.on('message', async message => {

    messageString = message.content;

    // Check if it contains 6 didget number
    if (/\d{6}/.test(messageString)) {
        numbers = messageString.match(/\d{6}/);
        hentai = nhentai.getDoujin(numbers)
        message.reply(hentai.title);
    }

    // Return if not in selected channel or starts with a .
    if (!config.channel.includes(message.channel.name) || !messageString.startsWith(".")) {
        return;
    }
    
    // Cut off .
    messageString = messageString.slice(1);

    // Cut off everything except for the command part of the command
    command = messageString.split(" ")[0];
    arguments = messageString.split(" ");
    console.log(arguments);
    console.log(command);

    switch (command) {
        case "pause":
            audioStream.pause();
        case "resume":
            audioStream.resume();
        case "stop":
            audioStream.end();
        case "play":
            audioStream = connection.playStream(ytdl(arguments[1], { filter: 'audioonly' }));
        case "join":
            // Only try to join the sender's voice channel if they are in one themselves
            if (message.member.voiceChannel) {
                connection = await message.member.voiceChannel.join();
            } else {
                message.reply('You need to join a voice channel first!');
            }
    }

});



// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret