const mongoose = require("mongoose");
const { Schema } = mongoose;

var recipientShema = new Schema({
  email: String,
  responded: {type:Boolean,default:false},
});

module.exports = recipientShema;