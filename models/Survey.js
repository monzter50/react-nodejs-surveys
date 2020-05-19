const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientShema = require('./Recipient')
var surveyShema = new Schema({
  googleID: String,
  title: String,
  body: String,
  subject:String,
  recipients:[RecipientShema],
  acepted:{type:Boolean, default:false},
  _user:{type:Schema.Types.ObjectId, ref:'User'},
  date: { type: Date, default: Date.now },
  dateSent:Date,
  lastResponded:Date
});

mongoose.model("surveys", surveyShema);
