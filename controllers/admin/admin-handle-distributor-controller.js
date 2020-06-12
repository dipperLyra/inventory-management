var adminValidator = require('../../config/validate-params.js');
var models = require("../../database/connection.js");
var message = require("../../config/messages");
var bcrypt = require("bcryptjs");


function createDistributor(req, res) {
    if (!adminValidator.validateAdmin(req, res)) res.json({
        data: {
            success: false,
            message: message.invalid_token,
        }
    })

    let hash = bcrypt.hashSync(req.body.password, 8);

    models.db.distributor
    .create({
        username: req.body.username,
        address: req.body.address,
        password: hash
    })
    .then(distributor => {
        res.json({
            data: {
                success: true,
                message: message.distributor_created,
                distributor: distributor
            }
        })
    })
    .catch(err => {
        res.json({
            data: {
                success: false,
                message: err.name
            }
        })
    })
}

module.exports = { createDistributor }