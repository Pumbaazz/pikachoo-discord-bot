const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const { MessageEmbed } = require("discord.js")	
const config = require("./config.json");
const PREFIX = '!';

var bot = new Discord.Client();


bot.on('ready', function()
{	  
    console.log("bot is now online");	
})	


bot.on("message", function(message) {	
    var args = message.content.substring(PREFIX.length).split(" ");

    if (!message.content.startsWith(PREFIX)) 
        return;	   
    switch (args[0].toLowerCase()) {	        
        case "ping":
            // show ping 
            message.channel.send(`Latency is ${Date.now() - message.createdTimestamp}ms.`);
            break;	        
        case "hi":	     
            // say hi to user
            message.channel.send(`hi ${message.author.username}`);	            
            break;
        case "ava":
            let avatarEmbed = getAvatar();
            message.channel.send(avatarEmbed);
            // console.log(user.displayAvatarURL());
            break;
        case "say":
            var embed = embedMessage(message, message.author);
            message.channel.send(embed);            
            break;
        case "whois":
            var _user = userInfo();
            message.channel.send(_user);
            break;
        default:
            message.channel.send("invalid message");
    }
// get user's avatar
    function getAvatar(){
        const user = message.mentions.users.first() || message.author;
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        // console.log(user);
        const avatarEmbed = new Discord.MessageEmbed()
            .setColor(randomColor)
            .setAuthor(user.username)
            .setImage(user.displayAvatarURL({ size: 4096 }));
        return avatarEmbed;
    }
//send embed message
    function embedMessage(fulltext){
        // let fulltext = message;
        var command ='say';
        let start = PREFIX.length+command.length+1;
        let end = fulltext.length;
        var subMessage = String(fulltext).substr(start, end);
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        var user = message.author.username;
        const embed = new MessageEmbed()
            .setTitle(user)
            .setColor(randomColor)
            .setDescription(subMessage)
        return embed;
    }
// view user's information
    function userInfo(){
        var user = message.mentions.users.first() || message.author;
        var randomColor = Math.floor(Math.random()*16777215).toString(16);

        const embed = new MessageEmbed()
            .setTitle(user.username)
            .setColor(randomColor)
            .setImage(user.displayAvatarURL({size: 1024}))
            .addField('Thông tin người dùng:', stripIndents `
            **- Tên người dùng**: ${user.username}
            **- Tạo vào lúc**: ${user.createdAt}

            `
                
                
            ,true);
        return embed;
    }
});



bot.login(config.token);