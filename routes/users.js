require('dotenv').config();
var express = require('express');
var router = express.Router();
var newUser = require("../controllers/user/new-user.js");
var sellStock = require("../controllers/user/sell-stock.js");
var validator = require("../config/validate-params");


router.post('/signup', 
validator.checkParams().user_signup, 
(req, res) => {
  validator.validateParams(req, res);
  newUser.createUser(req, res);
});

router.post('/sell', 
validator.checkParams().assign_stocks, 
(req, res) => {
  validator.validateParams(req, res);
  sellStock.sell(req, res)
});

module.exports = router;