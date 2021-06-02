const { MessageEmbed } = require("discord.js");

module.exports = (message) =>{
    return ()=>{
        message.channel.send(`hi ${message.author.username}`);	
    }
}