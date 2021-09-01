const mongoose = require('mongoose')

mongoose.connect("mongodb://shivam:nayak@cluster0-shard-00-00.fjg0d.mongodb.net:27017,cluster0-shard-00-01.fjg0d.mongodb.net:27017,cluster0-shard-00-02.fjg0d.mongodb.net:27017/nayak?ssl=true&replicaSet=atlas-qnsl1m-shard-0&authSource=admin&retryWrites=true&w=majority", (err) => {
  
    if (err) throw err;
    console.log("connected to MongoDB");
});