let express = require("express");
const {support} = require("jquery");
let router = express.Router();
let mongoose = require("mongoose");

//create a model class
let contactModel = mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    
  },

  {
    collection: "contact_info",
  }
);

//booksmodel to create new book more powerful than just class
module.exports = mongoose.model("contact", contactModel);
