const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title:  String,
  name: String,
  department: String,
  age : Number,
  tel : Number,
  address : String
});

const User = mongoose.model("User", schema);

module.exports = User;
