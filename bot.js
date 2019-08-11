const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config');
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg');
const opus = require('node-opus');
const nhentai = require('nhentai-js');
const token = require('./token');

var connection;


client.on('ready', () => {

    console.log('I am ready!');

});


// Runs when message is sent
client.on('message', async message => {
    if (message.author.bot) return;
    messageString = message.content;

    // Check if it contains 6 didget number
    if (/\d{6}/.test(messageString)) {
        //if (message.mentions.members.first()){
        //    return;
        //}
        numbers = messageString.match(/\d{6}/);
        console.log(numbers);
            hentai = await nhentai.getDoujin(numbers[0]);
            if (typeof hentai.details.parodies !== 'undefined') {
                parodies = hentai.details.parodies;
            } else {
                parodies = "none";
            }
            if (typeof hentai.details.characters !== 'undefined') {
                characters = hentai.details.characters;
            } else {
                characters = "none";
            }
            if (typeof hentai.details.tags !== 'undefined') {
                tags = hentai.details.tags;
            } else {
                tags = "none";
            }
            message.channel.send(hentai.title + "\r" +
                "Parodies: " + parodies + "\r" +
                "Characters: " + characters + "\r" +
                "Tags: " + tags + "\r" +
                "Link: " + hentai.link);
    }

    // Return if not in selected channel or starts with a .
    if (!config.channel.includes(message.channel.name) || !messageString.startsWith(config.command)) {
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
        case "doujin":
            doujins = await nhentai.search(arguments[1], 1, "popular");
            while (true) {
                rnd = Math.floor(Math.random() * doujins.results.length);
                doujin = doujins.results[rnd];
                details = await nhentai.getDoujin(doujin.bookId);
                english = false;
                for (i = 0; i < details.details.languages.length; i++) {
                    if (details.details.languages[i].includes('english')) {
                        english = true;
                    }
                }
                if (english) {

                }

            }
            message.channel.send(doujin.title + "\r" +
                "Link: https://www.nhentai.net/g/" + doujin.bookId, {
                    file: doujin.thumbnail
                });
            break;
        case "pause":
            if (typeof audioStream !== 'undefined') {
                audioStream.pause();
            } else {
                message.reply('Nothing is playing');
            }
            break;
        case "resume":
            if (typeof audioStream !== 'undefined') {
                audioStream.resume();
            } else {
                message.reply('Nothing is playing');
            }
            break;
        case "stop":
            if (typeof audioStream !== 'undefined') {
                audioStream.end();
            } else {
                message.reply('Nothing is playing');
            }
            break;
        case "play":
            if (typeof connection !== 'undefined') {
                audioStream = connection.playStream(ytdl(arguments[1], { filter: 'audioonly' }));
            } else {
                // Only try to join the sender's voice channel if they are in one themselves
                if (message.member.voiceChannel) {
                    connection = await message.member.voiceChannel.join();
                    audioStream = connection.playStream(ytdl(arguments[1], { filter: 'audioonly' }));
                } else {
                    message.reply('You need to join a voice channel first!');
                }
            }
            break;
        case "join":
            // Only try to join the sender's voice channel if they are in one themselves
            if (message.member.voiceChannel) {
                connection = await message.member.voiceChannel.join();
            } else {
                message.reply('You need to join a voice channel first!');
            }
            break;
    }
});



// THIS  MUST  BE  THIS  WAY

client.login(token.token);//BOT_TOKEN is the Client Secret