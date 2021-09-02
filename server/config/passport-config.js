const passport = require("passport");
const googleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../src/models/user");
const envConfig = {
  path: process.env.NODE_ENV === "production" ? "prod.env" : ".env",
};
require("dotenv").config(envConfig);
// * Models

// * Gettingup Passport google strategy
passport.use(
  new googleStrategy(
    {
      clientID: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      callbackURL: "/api/auth/login/callback",
      passReqToCallback: true,
      proxy: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({
        email: profile.email,
      }).populate("users");

      //! change function properly

      if (!user) {
        return done(null, false, {
          message: "This google ID not registered.",
        });
      }

      // let baseTeam = participant.teams.find(
      //   (team) => team.toJSON().event.toString() === process.env.EVENT_ID
      // );

      // if (!baseTeam) {
      //   return done(null, false, {
      //     message: "No team for this event found.",
      //   });
      // }

      // baseTeam = baseTeam.toJSON();

      // const minTeamLength = Number(process.env.MIN_TEAM_LENGTH);

      // if (baseTeam.members.length < minTeamLength) {
      //   return done(null, false, {
      //     message: `Team should have at least ${minTeamLength} members.`,
      //   });
      // }

      let user = await User.findById(baseTeam._id);
      // console.log("baseTeam._id", baseTeam._id);
      // console.log("event team", eventTeam);
      console.log("eventTeam", eventTeam);
      if (!eventTeam) {
        eventTeam = new EventTeam({
          teamName: baseTeam.teamName,
          _id: baseTeam._id,
          members: baseTeam.members,
        });
        await eventTeam.save();
      }

      // done(null, { id: participant._id, accessToken });
      done(null, { id: eventTeam._id, accessToken });
    }
  )
);

// * Passport serializeUser
passport.serializeUser((obj, done) => {
  done(null, obj);
});

// * Passport deserializeUser
passport.deserializeUser(async (obj, done) => {
  // console.log(obj);
  const team = await EventTeam.findById(obj.id)
    .populate("teams")
    .populate("members", "name email profilePicLink");
  team.accessToken = obj.accessToken;
  done(null, team);
});
