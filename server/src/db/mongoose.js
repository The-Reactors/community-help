const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://shivam:nayak@cluster0.fjg0d.mongodb.net/nayak", (err) => {
  
    if (err) throw err;
    console.log("connected to MongoDB");
});