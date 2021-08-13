module.exports={
    name:'embedMessage',
    description:"send embed message",
    async execute(message, contents, Discord){
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        var user = message.author.username;
        const embed = new Discord.MessageEmbed()
            .setTitle(user)
            .setColor(randomColor)
            .setDescription(contents)
        await message.channel.send(embed);  
    }
}