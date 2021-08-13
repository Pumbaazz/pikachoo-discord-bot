module.exports={
    name:'help',
    description:"help menu", execute(message, Discord){
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        const embed = new Discord.MessageEmbed()
            .setTitle("Muốn tìm gì thì đọc dưới")
            .setColor(randomColor)
            .addField('Prefix mặc định là `-`. Chưa có làm cái đổi đâu đừng cố')
            .addField('Xem prefix `prefix`')
            .addField('Xem ping `ping`')
            .addField('Xem thời tiết `wea` + `tên thành phố`')
            .addField('Xem thông tin cá nhân `whois`')
            .addField('Xem avatar `ava` (@mention nếu muốn xem của người khác)')
            .addField('Xem thông tin người khác `whois` + `@mention`')
            .addField('Xem cái kho ảnh ngàn năm tuổi `girl`')
            .addField('Gửi ảnh gif `gif`+`action` (@mention vô nếu thích :))))))) )');
        return message.channel.send(embed);
    }
}