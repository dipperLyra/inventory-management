var express = require('express');
var router = express.Router();
var model = require("../database/connection.js");
var bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');



router.post('/', 
[
    check('username').isString(),
    check('password').isLength({ min: 7 }),
],
(req, res, next) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(422).json({error: errors.array()});
    } else {
        let hash = bcrypt.hashSync(req.body.password, 8);
        model.admin.create({
            name: req.body.username,
            password: hash
        })
        .then(res.json({
            success: true,
            message: "record created"
        }))
        .catch(err => {
            res.json({
                success: false,
                message: err
            })
        })
    }
});

module.exports = router;