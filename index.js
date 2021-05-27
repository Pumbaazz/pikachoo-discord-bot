const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
var request = require('request');
const { MessageEmbed } = require("discord.js")	
require('dotenv').config();

const PREFIX = '.';

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

        case  "wea":
            weatherAPI();
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
            .setImage(user.displayAvatarURL({size: 128}))
            .addField('Thông tin người dùng:', stripIndents `
            **- Tên người dùng**: ${user.username}
            **- Tạo vào lúc**: ${user.createdAt}
            `
            ,true);
        return embed;
    }

    function weatherAPI(){
        var options = {
            'method': 'GET',
            'url': `http://api.airvisual.com/v2/nearest_city?key=${process.env.weather_api_key}`,
            'headers': {
            }
          };
        // fetch data respond
        request(options, function (error, response) {
            if (error) throw new Error(error);
            var parsedBody = JSON.parse(response.body);
            var randomColor = Math.floor(Math.random()*16777215).toString(16);
            var  weatherImg = "https://www.airvisual.com/images/"+ parsedBody.data.current.weather.ic+".png";

            const embed = new MessageEmbed()
                .setTitle("hihi")
                .setColor(randomColor)
                .setThumbnail(weatherImg)
                .addField(`Thanh pho`,`${parsedBody.data.city}`, true)
                .addField(`Nhiet do hien tai la: `,`${parsedBody.data.current.weather.tp}`)
                .addField(`Do am hien tai la: `,`${parsedBody.data.current.weather.hu}`, true)
            return message.channel.send(embed);
          });
    }
});



bot.login(process.env.token);