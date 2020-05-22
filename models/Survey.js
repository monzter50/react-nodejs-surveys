const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientShema = require('./Recipient')
var surveyShema = new Schema({
  googleID: String,
  title: String,
  body: String,
  subject:String,
  recipients:[RecipientShema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user:{type:Schema.Types.ObjectId, ref:'User'},
  date: { type: Date, default: Date.now },
  dateSent:Date,
  lastResponded:Date
});

mongoose.model("surveys", surveyShema);
