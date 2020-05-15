const mongoose = require("mongoose");
const { Schema } = mongoose;

var userShema = new Schema({
  googleID: String,
  name: String,
  age: Number,
  date: { type: Date, default: Date.now },
});

mongoose.model("users", userShema);
