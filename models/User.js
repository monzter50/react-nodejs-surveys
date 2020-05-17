const mongoose = require("mongoose");
const { Schema } = mongoose;

var userShema = new Schema({
  googleID: String,
  name: String,
  age: Number,
  token:String,
  credits:{ type:Number, default:0 },
  date: { type: Date, default: Date.now },
});

mongoose.model("users", userShema);
