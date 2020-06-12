var models = require("../../database/connection.js");
var message = require("../../config/messages");
var baseAdmin = require("./base-admin-controller.js");

var bcrypt = require('bcryptjs');


function createSuperAdmin(req, res) {
    let hash = bcrypt.hashSync(req.body.password, 8);

    models.db.superAdmin
    .create({
        username: req.body.username,
        password: hash
    })
    .then(superAdmin => res.json({
        data: {
            success: true,
            message: message.record_created,
            admin: superAdmin
        }
    }))
    .catch(err => {
        res.json({
            data: {
                success: false,
                message: err.name
            }
        })
    });
} 

function createAdmin(req, res) {
    models.db.superAdmin
    .findOne({
        where: {username: req.body.super_admin_username }
    })
    .then(superAdmin => {
        let isPasswordCorrect = bcrypt.compareSync(req.body.super_admin_password, superAdmin.password);
       
        if (isPasswordCorrect) {
            baseAdmin.createAdmin(req, res);
        }
        else {
            res.json({
                data: {
                    success: false,
                    message: message.incorrect_pword,
                }
            })
        }
    })
    .catch(err => {
        res.json({
            data: {
                success: false,
                message: err.name
            }
        })
    });}

module.exports = { createSuperAdmin, createAdmin };