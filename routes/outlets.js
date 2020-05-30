var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var model = require("../database/connection.js");
const { check, validationResult } = require('express-validator');

var createOutlet = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (token) {
        if (token.startsWith('Bearer')) token = token.slice(7, token.length);
        jwt.verify(token, process.env.JWT_ADMIN_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: "Invalid token",
                    error: err
                })
            } else {
                model.outlet.create({
                    name: req.body.name,
                    assigned_id: req.body.assigned_id
                })
                .then(outlet => {
                    res.json({
                        message: "outlet created",
                        outlet: outlet
                    })
                })
                .catch(err => {
                    res.json({
                        message: "outlet not created",
                        error: err
                    })
                });
            }
        });              
    } else {
        return res.json({message: "Auth token not supplied"});
    } 
};

module.exports = {createOutlet};