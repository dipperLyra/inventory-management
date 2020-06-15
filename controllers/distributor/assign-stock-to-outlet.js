var message = require("../../config/messages");
var models = require("../../database/connection.js");
var validateDistributor = require('./validate-distributor');
var totalStockSpent = 0;


async function assignStock(req, res) {
    validateDistributor.default(req, res);
    
    if (!distributorHasStock(req) && !outletExists(req)) res.json({message: "error, no stock or outlet"});

    models.db.distributorToOutlet.create({
        outlet_id: req.body.outlet_id,
        distributor_id: req.body.distributor_id,
        stock_id: req.body.stock_id,
        quantity: req.body.quantity
    })
    .then(assigned => {
        res.json({
            data: {
                success: true,
                message: "assigned to outlet",
                assigned: assigned
            }
        })
    })
    .catch(err => {
        res.json({
            success: false,
            error: err
        })
    })
}

async function distributorHasStock(req, res) {
    let distributorStock = 0;
    let distributorStockAvailable = 0;

    distributorSpent(req);

    const distributors = await models.db.adminToDistributor.findAll({where: {
        distributor_id: req.body.distributor_id
    }});
    distributors.forEach(stock => {
        distributorStock = add(distributorStock, stock.quantity);   
    })

    distributorStockAvailable = distributorStock - totalStockSpent;

    if (distributorStockAvailable >= req.body.quantity) {
        return true;
    } else {
        res.json({
            message: "failed 1"
        })
    }
}

function distributorSpent(req) {
    models.db.distributorToOutlet.findAll({where: {
        distributor_id: req.body.distributor_id
    }})
    .then(distributors => {
        distributors.forEach(distributor => {
            totalStockSpent = add(totalStockSpent, distributor.quantity);            
        })
    })
    .catch(err => {
        res.json({
            message: "failed"
        })
    })
}

async function outletExists(req) {
    const outlet = await models.db.outlet.findByPk(req.body.outlet_id);
    if (outlet) return true
    else{res.json({error: message.outlet_not_found})}
}

function add(arg1, arg2) {
    return arg1 + arg2;
}

module.exports = { assignStock }