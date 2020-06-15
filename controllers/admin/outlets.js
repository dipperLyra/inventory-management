var model = require("../../database/connection.js");
var adminValidator = require('../../config/validate-params.js');
var message = require("../../config/messages");


function createOutlet(req, res) {
    if (!adminValidator.validateAdmin(req, res)) res.json({
        data: {
            success: false,
            message: message.invalid_token,
        }
    })
    model.db.outlet.create({
        name: req.body.name,
        assigned_id: req.body.assigned_id
    })
    .then(outlet => {
        res.json({
            data: {
                message: message.outlet_created,
                outlet: outlet
            }
        })
    })
    .catch(err => {
        res.json({
            data: {
                message: message.outlet_not_created,
                error: err
            }            
        })
    });
}

module.exports = { createOutlet };