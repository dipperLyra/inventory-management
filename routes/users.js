require('dotenv').config();
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var users = require("../services/users.js");
var models = require("../database/connection.js");
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
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  models.user.findOne({
    where: {email: req.body.email}
  })
  .then(user => {
    let isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
    
    if (isPasswordCorrect) {
      let token = jwt.sign(
        { email: user.email, password: user.password }, 
        process.env.JWT_USER_SECRET_KEY, 
        { expiresIn: "1h" }
      );

      models.token.create({ token: token, user_id: user.id })
        .then(token => {
          res.json({ message: "login successful", user: user, token: token, expiresIn: "1 hour" })
        })
        .catch(err => {
          res.json({message: err});
        });
    } else {
      res.json({message: "incorrect password"})
    }
  })
  .catch(err => {
    res.json({message: "no user found", error: err});
  })
});


router.get('/', function(req, res, next) {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
  
    jwt.verify(token, process.env.JWT_USER_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Invalid token"
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


router.get('/:userId', function(req, res, next) {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  
  if (token) {
    if (token.startsWith('Bearer')) {
      token = token.splice(7, token.length);
    }
    if (jwt.verify(token, process.env.JWT_USER_SECRET_KEY)) {
      users.findAllUsers().then( user => res.json(user) );
    } else { 
      res.json({message: "Invalid token"}) 
    }
    let userId = req.params.userId;
    users.findUser(userId).then( user => res.json(user) );
  } else {
    res.json({message: "Auth token not supplied"});
  }
});


router.put('/:userId', function(req, res, next) {
  let userId = req.params.userId;
  users.save().then(user => res.json(user));
});


router.delete('/:userId', function(req, res, next) {
  let userId = req.params.userId;
  users.deleteUser(userId).then( user => res.json(user) );
});

module.exports = router;