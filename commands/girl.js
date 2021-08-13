var MongoClient = require('mongodb').MongoClient;

module.exports={
    name:'girl',
    description:"hihi",
    execute(message, Discord, usn, pwd, dbName, collectionName){

        const url=`mongodb+srv://${usn}:${pwd}@cluster0.6dj3w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        var nhanpham = Math.floor(Math.random()* 3)
        var randomPic =  Math.floor(Math.random() * 42747);
//connect mongo
        MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db){
            if(err) throw err;
            const dbo = db.db(dbName);
//find      
            dbo.collection(collectionName).findOne({"id":randomPic}, function(err,result){
                if(err) throw err;                
                var embed = new Discord.MessageEmbed()
                    .setTitle(message.author.username)
                    .setColor(randomColor)
                    .setImage(result.url)
                    .setDescription("hihi");

                if(nhanpham !== 1){
                    message.channel.send(embed);
                }
                else{
                    message.channel.send("Không có gì để xem đâu, tích lại nhân phẩm đi");
                }
                db.close();
            });
        });
    }
}

