const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require("mongoose");

const Users = mongoose.model('users')
const keys = require('../config/keys');
passport.serializeUser((user,done)=>{
  done(null,user.id)
})
passport.deserializeUser((id,done)=>{
  Users.findById(id).then(user => done(null,user));
});
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      Users.findOne({googleID:profile.id}).then((existUser)=>{
        if(existUser){
          //
          done(null,existUser)
        }else{
          new Users({googleID:profile.id}).save().then(user=>done(null,user));
        }
      })
      
    }
  )
);
