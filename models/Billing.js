const mongoose = require("mongoose");
const { Schema } = mongoose;

var billingShema = new Schema({
  chargeID: String,
  credits: Number,
  email: String,
  user:String,
  googleID:String,
  description:String,
  date: { type: Date, default: Date.now },
});

mongoose.model("billings", billingShema);
