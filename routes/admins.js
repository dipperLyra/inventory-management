var express = require('express');
var router = express.Router();
var models = require("../database/connection.js");
var outlets = require("../routes/outlets");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
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
        models.admin.create({
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

router.post('/signin', 
[
    check('username').isString(),
    check('password').isLength({ min: 7 }),
], 
(req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({error: errors.array()});
    } else {
        models.admin.findOne({
            where: {name: req.body.username }
        })
        .then(admin => {
            let isPasswordCorrect = bcrypt.compareSync(req.body.password, admin.password);
            
            if (isPasswordCorrect) {
                jwt.sign(
                    {name: admin.username, password: admin.password},
                    process.env.JWT_ADMIN_SECRET_KEY,
                    {expiresIn: "1h"},
                    (err, token) => {
                        if (err) return res.json({error: err});

                        res.json({
                            message: "Admin sign in successful.",
                            admin: admin,
                            token: token,
                            expiresIn: "1hr"
                        });
                        models.token.create({
                            token: token,
                            user_id: admin.id
                        })
                        .catch(err => {
                            res.json({
                                message: "error saving token to db",
                                error: err
                            })
                        });
                    }
                );
            } else {
                res.json({message: "Incorrect password"})
            } 
        })
        .catch(err => {
            res.json({
                message: "No admin found",
                error: err
            })
        })
    }
});

router.post('/outlets', [
    check('name').isString(),
], (req, res, next) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    outlets.createOutlet(req, res, next)
});

module.exports = router;