const { stripIndents } = require("common-tags");

module.exports={
    name:'whois',
    description:"detail information of member",
    async execute(message, Discord){
        var user = message.mentions.users.first() || message.author;
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        const embed = new Discord.MessageEmbed()
            .setTitle(user.username)
            .setColor(randomColor)
            .setThumbnail(user.displayAvatarURL({size: 128}))
            .addField('Thông tin người dùng:', stripIndents `
            **- Tên người dùng**: ${user.username}
            **- Tạo vào lúc**: ${user.createdAt}
            `
            ,true);
        await message.channel.send(embed);
    }
}