var adminValidator = require('../../config/validate-params.js');
var models = require("../../database/connection.js");
var message = require("../../config/messages");
var bcrypt = require("bcryptjs");


function createDistributor(req, res) {
    validate(req, res);

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
    validate(req, res);

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

    let sumProducedQuantity = 0;
    let sumAssignedQuantity = 0;

    // sum all stock_id produced
    produced.forEach(quantity => {
        sumProducedQuantity = add(sumProducedQuantity, quantity.quantity);        
        //console.log({produced_quantity: sumProducedQuantity})
    });

    // sum all assigned stock_id
    assigned.forEach(quantity => {
        sumAssignedQuantity = add(sumProducedQuantity, quantity.quantity);
        console.log({assigned_quantity: sumAssignedQuantity})
    });
    // The difference is the available no of stock_id for sale. 
    // Todo: rewrite the function calculating available stock_id
    let availableProduct = sumProducedQuantity - sumAssignedQuantity;

    if (availableProduct > 0) {
        models.db.adminToDistributor.create({
            admin_id: req.body.admin_id,
            distributor_id: req.body.distributor_id, 
            stock_id: req.body.stock_id,
            quantity: req.body.quantity
        })
        .then(assigned => {
            res.json({
                data: {
                    success: true,
                    message: "stock assigned to distributor",
                    assigned: assigned
                }
            })
        })
    } else {
        res.json({
            data: {
                success: false,
                message: req.body.stock_id + " not in stock"
            }
        })
    }
}

function add(a, b) {
    return a + b;
}

function validate(req, res) {
    if (!adminValidator.validateAdmin(req, res)) {
        res.json({
            data: {
                success: false,
                message: message.invalid_token,
            }
        });
    } else {
        return true;
    } 
}

module.exports = { createDistributor, assignStocks }