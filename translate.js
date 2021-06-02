const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

         
const uri = `mongodb+srv://tuanphung:${process.env.password}@cluster0.6dj3w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db(process.env.db).collection(process.env.collection_1);
    // perform actions on the collection object
    collection.find({ id: 2}).toArray(function(err, result) {
        if (err) throw err;
        // result = JSON.parse(JSON.stringify(result))
        console.log(result[2]);
        client.close();
      });
    });
