require('dotenv').config();

module.exports = {
    name: 'weather',
    description: "get nearby city location's weather",
    command: 'wea',
    execute(message, Discord) {
        var prefix = require('../constant').prefix;     // Load prefix.
        var contents = message.content.slice(prefix.length + this.command.length + 1);
        if (contents.length === 0) {
            return message.channel.send("Thiếu thiếu cái gì á ta");
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(contents).replace(" ", "%20")}&appid=${process.env.weather_api_key_2}&lang=vi`,
        { method:"GET" })
            .then((response) => response.json())
            // .then((response) => console.log(response))
            .then((response) => {
                if (response.cod !== 200) {
                    return message.channel.send(response.message);
                }
            })
            .then((response) => {
                var randomColor = Math.floor(Math.random() * 16777215).toString(16);
                var weatherImg = "http://openweathermap.org/img/wn/" + response.weather.icon + "@2x.png";
                var currentTemp = parseInt(response.main.temp) - 273;
                var feelLike = parseInt(response.main.feels_like) - 273;

                const embed = new Discord.MessageEmbed()
                    .setTitle(message.author.username + " muốn xem thời tiết hôm nay")
                    .setColor(randomColor)
                    .setThumbnail(weatherImg)
                    .addField(`Thành phố: `, `${response.name}`, true)
                    .addField(`Nhiệt độ hiện tại là: `, `${currentTemp}` + " °C")
                    .addField(`Cảm giác như: `, `${feelLike}` + " °C")
                    .addField(`Mô tả thời tiết: `, `${response.weather[0].description}`)
                    .addField(`Độ ẩm hiện tại là: `, `${response.main.humidity}` + "%", true);
                // var embed = createEmbedResponse();
                return message.channel.send(embed);
            })
            .catch((error) => {
                if (error && error.message) {
                    console.error(error.message);
                } else {
                    console.error('An error occurred:', error);
                }
            });

        // function createEmbedResponse() {
        //     var result = new Discord.MessageEmbed()
        //         .setTitle(message.author.username + " muốn xem thời tiết hôm nay")
        //         .setColor(randomColor)
        //         .setThumbnail(weatherImg)
        //         .addField(`Thành phố: `, `${response.name}`, true)
        //         .addField(`Nhiệt độ hiện tại là: `, `${currentTemp}` + " °C")
        //         .addField(`Cảm giác như: `, `${feelLike}` + " °C")
        //         .addField(`Mô tả thời tiết: `, `${response.weather[0].description}`)
        //         .addField(`Độ ẩm hiện tại là: `, `${response.main.humidity}` + "%", true);
        //     return result;
        // };
    }
}