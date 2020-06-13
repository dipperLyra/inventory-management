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



async function assignStocks(req, res) {
    if (!adminValidator.validateAdmin(req, res)) res.json({
        data: {
            success: false,
            message: message.invalid_token,
        }
    });

    // Check that stock_id, distributor_id and admin_id exists
    const produced = await models.db.production.findAll({where: {
        stock_id: req.body.stock_id
    }});
    if(produced === null) res.json({data: {message: message.stock_not_found}})

    const distributor = await models.db.distributor.findOne({where: {
        id: req.body.distributor_id
    }});
    if(distributor === null) res.json({data: {message: message.distributor_not_found}})

    const admin = await models.db.distributor.findOne({where: {
        id: req.body.admin_id
    }});
    if(admin === null) res.json({data: {message: message.admin_not_found}})
    
    const assigned = await models.db.adminToDistributor.findAll({where: {
        stock_id: req.body.stock_id
    }});
    if(assigned === null) res.json({data: {message: message.admin_not_found}})

    let sum = 0;
    produced.forEach(quantity => {
        sum = sumer(sum, quantity.quantity);        
        console.log({produced_quantity: sum})
    });
    res.json({produced: assigned})

    //let availableP = produced.quantity - assigned.quantity;
    
    // models.db.adminToDistributor.create({
    //     admin_id: admin.id,
    //     distributor_id: distributor.id,
    //     stock_id: produced.stock_id,
        
    // })
}

function sumer(a, b) {
    return a + b;
}

module.exports = { createDistributor, assignStocks }