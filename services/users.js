var db = require("../database/connection.js");
const { check, validationResult } = require('express-validator');

function createUser(body) {
    user = db.user;

    user.create({
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        password: body.password,
        phone_number: body.phone_number,
        dob: body.dob
    }).then( user => {
        return user;
    })
}

function findUser(userId) {
    user = db.user;
    return user.findByPk(userId).then(user => {
        return user;
    });
}

function findAllUsers() {
    user = db.user;
    return user.findAll().then(user => {
        return user;
    });
}

function deleteUser(userId) {
    user = db.user;
    user.findByPk(userId).then(user => {
        return user.destroy();
    })
}

module.exports = {createUser, findAllUsers, findUser, deleteUser};