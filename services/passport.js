const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const Users = mongoose.model("users");
const keys = require("../config/keys");
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  Users.findById(id).then((user) => done(null, user));
});
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existUser = await Users.findOne({ googleID: profile.id });
      if (existUser) {
       return done(null,existUser)
      } else {
      const user = await new Users({ googleID: profile.id,token:accessToken,name:profile.displayName })
          .save()
        done(null,user)
      }
    }
  )
);
