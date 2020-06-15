var models = require("../../database/connection.js");
var message = require("../../config/messages");
var bcrypt = require('bcryptjs');
var outletExists = require('../outlet/outlet-exists.js');

var user = models.db.user;  


function createUser(req, res) {
    let hash = bcrypt.hashSync(req.body.password, 8); 

    if(!outletExists.exists) res.json({
        data: {
            success: false,
            message: message.outlet_not_found
        }
    })
    
    user.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        phone_number: req.body.phone_number,
        dob: req.body.dob,
        outlet_id: req.body.outlet_id
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


module.exports = {createUser};