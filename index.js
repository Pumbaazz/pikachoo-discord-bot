const Discord = require('discord.js');
const client = new Discord.Client();

require('dotenv').config();

const prefix = '-';
 
const fs = require('fs');
 
client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}
 
 
client.once('ready', () => {
    console.log('bot is now online!');
});
 
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const contents = message.content.slice(prefix.length+command.length+1);

    switch(command){
        case "ping":
            client.commands.get('ping').execute(message);
            break;
        case "ava":
            client.commands.get('avatar').execute(message, Discord);
            break;
        case "say":
            client.commands.get('embedMessage').execute(message, contents, Discord);
            break;
        case "whois":
            client.commands.get('whois').execute(message, Discord);
            break;
        case "wea":
            if(contents.length === 0){
                message.channel.send("Thiếu thiếu cái gì á ta");
                break;
            }
            client.commands.get('weather').execute(message, Discord,contents, process.env.weather_api_key_2);
            break;
        case "girl":
            client.commands.get('girl').execute(message, Discord, process.env.usn, process.env.pwd, process.env.db, process.env.collection_1);
            break;
        case "gif":
            if(contents.length === 0){
                message.channel.send("Thiếu thiếu cái gì á ta");
                break;
            }
            client.commands.get('gif').execute(message, Discord,contents, process.env.tenor);
            break;
        case "help":
            client.commands.get('help').execute(message, Discord);
            break;
        default:
            message.channel.send("Sai cú pháp gì gì đó rồi không rõ nữa");
    }
});
client.login(process.env.token);