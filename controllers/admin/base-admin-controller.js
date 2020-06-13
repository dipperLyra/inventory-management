var models = require("../../database/connection.js");
var bcrypt = require('bcryptjs');
var message = require("../../config/messages");
var jwt = require("jsonwebtoken");


function createAdmin(req, res) {
    let hash = bcrypt.hashSync(req.body.admin_password, 8);
    
    models.db.admin.create({
        name: req.body.admin_username,
        password: hash
    })
    .then(admin => res.json({
        data: {
            success: true,
            message: message.record_created,
        }
    }))
    .catch(err => {
        res.json({
            data: {
                success: false,
                message: err
            }
        })
    });
}

function signin(req, res) {
    models.db.admin.findOne({
        where: {name: req.body.username }
    })
    .then(admin => {
        let isPasswordCorrect = bcrypt.compareSync(req.body.password, admin.password);
        
        if (isPasswordCorrect) {
            generateAndSaveToken(admin, res);
        } else {
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
                message: message.wrong_username,
            }
        })
    })
}

function generateAndSaveToken(model, res) {
    jwt.sign(
        {name: model.username, password: model.password},
        process.env.JWT_ADMIN_SECRET_KEY,
        {expiresIn: "1h"},
        (err, token) => {
            if (err) return res.json({error: err});

            res.json({
                data: {
                    success: true,
                    message: message.admin_signin_successful,
                    token: token,
                    expiresIn: "1hr"
                }
            })
        }
    );
}

function saveToken(res, token, error) {
    return models.db.token.create({
        token: token,
        admin_id: admin.id
    })
    .then(token => res.json({
        data: {
            success: true,
            message: message.token_saved
        }
        
    }))
    .catch(err => {
        res.json({
            data: {
                success: false,
                message: message.err_saving_token,
                error: err
            }
        })
    });
}

module.exports = { createAdmin, signin }