require('dotenv').config();
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var users = require("../services/users.js");
var db = require("../database/connection.js");
const { check, validationResult } = require('express-validator');


router.post('/signup', 
[
  check('firstname').isString(),
  check('lastname').isString(),
  check('email').isEmail(),
  check('password').isLength({ min: 7 }),
  check('phone_number').isMobilePhone(),
  check('dob').not().isEmpty(),
], 
(req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  users.createUser(req.body).then(res.json({ 
    success: true,
    message: "record created"
  }));
});


/*
/ JWT signs login credentials supplied. 
/ bcryptjs compares supplied password to hash.
/ sequelize saves token. Return token to the user. 
*/
router.post('/signin', 
[
  check('email').isEmail(),
  check('password').isLength({ min: 7 })
], 
(req, res, next) => {
  db.user.findOne({
    where: {email: req.body.email}
  })
  .then(user => {
    let isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
    
    if (isPasswordCorrect) {
      let token = jwt.sign(
        { email: user.email, password: user.password }, 
        process.env.JWT_SECRET_KET, 
        { expiresIn: "1h" }
      );

      db.token.create({ token: token, user_id: user.id })
        .then(token => {
          res.json({ message: "login successful", tokenCreated: token, expiresIn: "1 hour" })
        })
        .catch(err => {
          res.json({error: err});
        });
    }
  })
  .catch(err => {
    res.json({message: "no user found", error: err});
  })
});


router.get('/', function(req, res, next) {
  let tokenNotEmpty = req.headers['authorization'] != "" ? req.headers['authorization'] : "";

  if (tokenNotEmpty) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
  
    jwt.verify(token, process.env.JWT_SECRET_KET, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid"
        });
      } else {
        req.decoded = decoded;
        users.findAllUsers().then( user => res.json(user) );
      }
    });
 
  } else {
    return res.json({
      success: false,
      message: 'Auth token not supplied'
    })
  };

});

router.put('/:userId', function(req, res, next) {
  let userId = req.params.userId;
  users.save().then(user => res.json(user));
});

router.get('/:userId', function(req, res, next) {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token.startsWith('Bearer')) {
    token = token.splice(7, token.length);
  }
  if (jwt.verify(token, process.env.JWT_SECRET_KET)) {
    users.findAllUsers().then( user => res.json(user) );
  } else { 
    res.json({message: "wrong token"}) 
  }
  let userId = req.params.userId;
  users.findUser(userId).then( user => res.json(user) );
});

router.delete('/:userId', function(req, res, next) {
  let userId = req.params.userId;
  users.deleteUser(userId).then( user => res.json(user) );
});

module.exports = router;