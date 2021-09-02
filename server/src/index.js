const express = require('express')
require('./db/mongoose')
const cors = require("cors");
const User = require('./models/user')
const passport = require("passport");
const session = require("express-session");
const cookieSession = require("cookie-session")
const userRoutes = require('./routes/user')
const problemRoutes = require('./routes/problem')
const envConfig = {
    path: process.env.NODE_ENV === "production" ? "prod.env" : ".env",
  };
require("dotenv").config(envConfig);
const app = express()
const port = process.env.PORT || 5000

// * Passport Setup
require("./config/passport-config");
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieSession({
   maxAge:24 * 60 * 60 * 1000,
   keys: [process.env.COOKIE_KEY],
}))

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
app.use(userRoutes)
app.use(problemRoutes)


app.listen(port, ()=>{
    console.log('Server is running on ' + port)
})