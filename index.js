require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./models/User');
require('./models/Billing');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');

mongoose.connect(keys.mongoURI);

var app = express();
app.use(bodyParser.json());
app.use(cookieSession({
  maxAge:30*24*60*60*1000,
  keys:[keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());
authRoutes(app);
billingRoutes(app);

app.get('/', (req, res) =>{
  res.json({
      hi:'there!',
      bye:'Dude'
    });
});
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))

  const path = require('path');
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  });
}
const PORT = 5000
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});