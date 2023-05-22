module.exports = {
    name: 'embedMessage',
    description: "send embed message",
    command: 'say',
    execute(message, Discord) {
        var randomColor = Math.floor(Math.random() * 16777215).toString(16);      // Get color code.
        var prefix = require('../constant').prefix;     // Load prefix.
        const contents = message.content.slice(prefix.length + this.command.length + 1);
        var user = message.author.username;
        const embed = new Discord.MessageEmbed()
            .setTitle(user)
            .setColor(randomColor)
            .setDescription(contents)
        message.channel.send(embed);
    }
}