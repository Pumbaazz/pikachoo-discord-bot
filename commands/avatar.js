module.exports={
    name: 'avatar',    
    description: "get avatar",
    async execute(message, Discord){
        const user = message.mentions.users.first() || message.author;
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        // console.log(user);
        const avatarEmbed = new Discord.MessageEmbed()
            .setColor(randomColor)
            .setAuthor(user.username)
            .setImage(user.displayAvatarURL({ size: 4096 }));
        await message.channel.send(avatarEmbed);
    }
}