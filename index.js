require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');

mongoose.connect(keys.mongoURI);

var app = express();
app.use(cookieSession({
  maxAge:30*24*60*60*1000,
  keys:[keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());
authRoutes(app);

app.get('/', (req, res) =>{
  res.json({
      hi:'there!',
      bye:'Dude'
    });
});

const PORT = process.env.PORT || 5000
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});