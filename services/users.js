var db = require("../database/connection.js");
const { check, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
require('dotenv').config();


function createUser(body) {
    let hash = bcrypt.hashSync(body.password, 8); 
    let user = db.user;  

    return user.create({
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        password: hash,
        phone_number: body.phone_number,
        dob: body.dob,
    });
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

module.exports = {db, createUser, findAllUsers, findUser, deleteUser};