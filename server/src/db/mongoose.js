const mongoose = require('mongoose')
const envConfig = {
    path: process.env.NODE_ENV === "production" ? "prod.env" : ".env",
  };
require("dotenv").config(envConfig);

mongoose.connect(process.env.MONGO_URI_NAYAK, (err) => {
  
    if (err) throw err;
    console.log("connected to MongoDB");
});