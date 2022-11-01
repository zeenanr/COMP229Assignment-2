let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let jwt = require("jsonwebtoken");

let passport = require("passport");



let clController = require("../controllers/contactlist.js");

// helper function for guard purposes
function requireAuth(req, res, next) {
  // check if the user is logged in
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}

/* GET Route for the Contact List page - READ Operation */
router.get("/", clController.displayContactList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get("/add", requireAuth, clController.addpage);

/* POST Route for processing the Add page - CREATE Operation */
router.post("/add", requireAuth, clController.addprocesspage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get("/edit/:id", requireAuth, clController.displayeditpage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post("/edit/:id", requireAuth, clController.processingeditpage);

/* GET to perform  Deletion - DELETE Operation */
router.get("/delete/:id", requireAuth, clController.deletepage);

module.exports = router;
