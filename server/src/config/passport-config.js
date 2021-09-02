const passport = require("passport");
const findOrCreate = require('mongoose-find-or-create')
const googleStrategy = require("passport-google-oauth2").Strategy;
// * Models
const User = require("../models/user");
const envConfig = {
  path: process.env.NODE_ENV === "production" ? "prod.env" : ".env",
};
require("dotenv").config(envConfig);

// * Gettingup Passport google strategy
passport.use(
  new googleStrategy(
    {
      clientID: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      callbackURL: "/auth/login/callback",
      passReqToCallback: true,
      proxy: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      const defaultUser = {
        name:`${profile.name.givenName} ${profile.name.familyName}`,
        email:profile.emails[0].value,
        profilePicLink:profile.photos[0].value,
        googleId:profile.id,
      }
      
      let user = await User.findOne({
        email: profile.email,
      });
      if(!user){
        user = new User(defaultUser)
        user.tokens.push({token: accessToken});
        user.save();
      }
      else
      {
        user.profilePicLink=profile.photos[0].value
        user.save();
      }
      done(null, {user: user, id: user._id, accessToken});
    }
  )
);

// * Passport serializeUser
passport.serializeUser((obj, done) => {
  console.log("Serializing User: ",obj)
  done(null, obj);
});

// * Passport deserializeUser
passport.deserializeUser(async (obj, done) => {
  console.log("Deserlializing");
  console.log(obj); 

  const user = await User.findById(obj.id);
  user.tokens.push({token: obj.accessToken});
  done(null, user);
});
