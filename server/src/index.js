const express = require('express')
require('./db/mongoose')
const cors = require("cors");
const User = require('./models/user')
const userRouter = require('./routes/user')
const envConfig = {
    path: process.env.NODE_ENV === "production" ? "prod.env" : ".env",
  };
require("dotenv").config(envConfig);
const app = express()
const port = process.env.PORT || 5000

app.use(cors({ origin: `${process.env.CLIENT_URL}`, credentials: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.use(express.json())
app.use(userRouter)


app.listen(port, ()=>{
    console.log('Server is running on ' + port)
})