
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let jwt = require('jsonwebtoken');

//create reference to the model (dbschema )
let contact = require("../models/contactlist.js");

module.exports.displayContactList = (req, res, next) => {
  Contact.find((err, contactList) => {
    if(err) {
      return console.error(err);
    } else {

      res.render("contactlist/list", { title: "Contact List", ContactList: contactList,
      displayName: req.user ? req.user.displayName : "",
    });
      //render contactlist.ejs and pass title and contactlist variable we are passing ContactList object to ContactList property
    }
  });
};

module.exports.addpage = (req, res, next) => {
  res.render("contactlist/add", {
    title: "Add Contact",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.addprocesspage = (req, res, next) => {
  let newContact = Contact({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
  });
  Contact.create(newContact, (err, Contact) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the contact list
      res.redirect("/contactlist");
    }
  });
};

module.exports.displayeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  Contact.findById(id, (err, contacttoedit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("contactlist/edit", { title: "Edit Contact", contact: contacttoedit,
      displayName: req.user ? req.user.displayName : "",
    });
    }
  });
};

module.exports.processingeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  let updatecontact = Contact({
    _id: id,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    
  });
  Contact.updateOne({ _id: id }, updatecontact, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the contact list
      res.redirect("/contactlist");
    }
  });
};

module.exports.deletepage = (req, res, next) => {
  let id = req.params.id;
  Contact.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh contact list
      res.redirect("/contactlist");
    }
  });
};