const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  pImage : {type: mongoose.Types.ObjectId,ref: "image"},   
  pName:  String,
  pPrice: Number,
  pDescription : String,
  pCategory : String,
  pStock : Number
});

const product = mongoose.model("product", schema);

module.exports = product;
