var models = require("../../database/connection.js");
var message = require("../../config/messages");
var bcrypt = require('bcryptjs');
require('dotenv').config();

var user = models.db.user;  


function createUser(req, res) {
    let hash = bcrypt.hashSync(req.body.password, 8); 

    user.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        phone_number: req.body.phone_number,
        dob: req.body.dob,
    })
    .then(user => res.json({
        data: {
            success: true,
            message: message.user_created,
            user: user
        }
    }))
    .catch(err => res.json({
        data: {
            success: false,
            message: message.user_not_created,
            error: err
        }
    })) 
}

async function findUser(userId) {
    return await user.findByPk(userId);
}

function findAllUsers() {
    return user.findAll().then(user => {
        return user;
    });
}

function deleteUser(userId) {
    user.findByPk(userId).then(user => {
        return user.destroy();
    })
}

module.exports = {createUser, findAllUsers, findUser, deleteUser};