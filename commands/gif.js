const request = require("request")

module.exports={
    name:'gif',
    description:"send gif",
    async execute(message, Discord, content, tenorKey){
        const lmt=20;
        var randomGif = Math.floor(Math.random()* lmt);
        var randomColor = Math.floor(Math.random()*16777215).toString(16);

        const options={
            method: 'GET',
            url: `https://g.tenor.com/v1/search?q=${content}&key=${tenorKey}&limit=${lmt}`
        };
        await request(options, (err, response) => {
            if (err) { return console.log(err); }
            var parsedBody = JSON.parse(response.body);
            //console.log(parsedBody.results);

            var user = message.mentions.users.first();
            var biteQuote_1 = ``;
            if(!user){
                biteQuote_1 = `${message.author.username} wanna ${content}`;
            }
            else{
                biteQuote_1 = `${message.author.username} wanna ${content} ${user.username}`
            }
            
            const embed = new Discord.MessageEmbed()
                .setTitle(biteQuote_1)
                .setColor(randomColor)
                .setImage(parsedBody.results[randomGif].url)

            return message.channel.send(embed);
        });
    }
}