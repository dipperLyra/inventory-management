var express = require('express');
var router = express.Router();
var users = require("../services/users.js");
const { check, validationResult } = require('express-validator');


router.post('/', [
  check('firstname').isString(),
  check('lastname').isString(),
  check('email').isEmail(),
  check('password').isLength({ min: 5 }),
  check('phone_number').isMobilePhone(),
  check('dob').not().isEmpty(),
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  users.createUser(req.body).then(user => res.json(user));
});

router.put('/:userId', function(req, res, next) {
  let userId = req.params.userId;
  users.save().then(user => res.json(user));
});

router.get('/', function(req, res, next) {
  users.findAllUsers().then( user => res.json(user) );
});

router.get('/:userId', function(req, res, next) {
  let userId = req.params.userId;
  users.findUser(userId).then( user => res.json(user) );
});

router.delete('/:userId', function(req, res, next) {
  let userId = req.params.userId;
  users.deleteUser(userId).then( user => res.json(user) );
});

module.exports = router;