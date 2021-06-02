const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
var request = require('request');
const { MessageEmbed } = require("discord.js");	
const sayhi = require("./sayhi.js");
const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();


const PREFIX = 'zzz';

var bot = new Discord.Client();


bot.on('ready', function()
{	  
    console.log("bot is now online");	
})	


bot.on("message", function(message) {	

// take out the prefix
    var args = message.content.substring(PREFIX.length).split(" ");
    console.log(args);
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
            var embed = embedMessage(message, args[0]);
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
// get the sub message from POST message, using for the google search sub message or the guessing function in future
    function separateSubMessage(fulltext, command){
        let start = PREFIX.length+command.length+1;
        let end = fulltext.length;
        return String(fulltext).substr(start, end);
    }
//send embed message
    function embedMessage(fulltext, command){
        // let fulltext = message;
        // var command ='say';
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
            .setThumbnail(user.displayAvatarURL({size: 128}))
            .addField('Thông tin người dùng:', stripIndents `
            **- Tên người dùng**: ${user.username}
            **- Tạo vào lúc**: ${user.createdAt}
            `
            ,true);
        return embed;
    }
// function get weather information at city nearby location
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

        function connectDB(){            
            const uri = `mongodb+srv://tuanphung:${process.env.password}@cluster0.6dj3w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
            const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log(process.env.password);
            console.log(process.env.db);
            console.log(process.env.collection_1);
            client.connect(err => {
                const collection = client.db(process.env.db).collection(process.env.collection_1);
                // perform actions on the collection object
                collection.find({ id: 19}).toArray(function(err, result) {
                    if (err) throw err;
                    // console.log(result);
                    var parsedBody = JSON.parse(result.body);
                    var randomColor = Math.floor(Math.random()*16777215).toString(16);
                    const embed = new MessageEmbed()
                        .setTitle("hihi")
                        .setColor(randomColor)
                        .setImage(parsedBody.url)
                    return message.channel.send(embed);
                    
                    
                    client.close();
                  });
                });
            
        }
    }
});



bot.login(process.env.token);