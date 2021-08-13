var request = require('request');

module.exports={
    name:'weather',
    description:"get nearby city location's weather",
    execute(message,Discord,city,apikey){
        const options = {
            method: 'GET',
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
        };
        // fetch data respond
        request(options, function (error, response) {
            if (error) throw new Error(error);
            var parsedBody = JSON.parse(response.body);
            var randomColor = Math.floor(Math.random()*16777215).toString(16);
            
            var  weatherImg = "http://openweathermap.org/img/wn/"+ parsedBody.weather[0].icon+"@2x.png";
            var currentTemp =parseInt(parsedBody.main.temp)-273;
            var feelLike =parseInt(parsedBody.main.feels_like) - 273;

            const embed = new Discord.MessageEmbed()
                .setTitle(message.author.username + " muốn xem thời tiết hôm nay")
                .setColor(randomColor)
                .setThumbnail(weatherImg)
                .addField(`Thành phố: `,`${parsedBody.name}`, true)
                .addField(`Nhiệt độ hiện tại là: `,`${currentTemp}` + " °C")
                .addField(`Cảm giác như: `, `${feelLike}` + " °C")
                .addField(`Mô tả thời tiết: `,`${parsedBody.weather[0].description}`)
                .addField(`Độ ẩm hiện tại là: `,`${parsedBody.main.humidity}` + "%", true);
            return message.channel.send(embed);            
        });
    }
}