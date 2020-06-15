var message = require("../../config/messages");
var models = require("../../database/connection.js");

var totalStockSpent = 0;


async function available(req, res) {
    let outletTotalStock = 0;
    let outletStockAvailable = 0;

    outletSpent(req);

    const stocks = await models.db.distributorToOutlet.findAll({where: {
        outlet_id: req.body.outlet_id
    }});
    stocks.forEach(stock => {
        outletTotalStock = add(outletTotalStock, stock.quantity);   
    })

    outletStockAvailable = outletTotalStock - totalStockSpent;

    if (outletStockAvailable >= req.body.quantity) {
        return true;
    } else {
        res.json({
            message: "failed 1"
        })
    }
}

function outletSpent(req) {
    models.db.sales.findAll({where: {
        outlet_id: req.body.outlet_id
    }})
    .then(outlets => {
        outlets.forEach(outlet => {
            totalStockSpent = add(totalStockSpent, outlet.quantity);            
        })
    })
    .catch(err => {
        res.json({
            message: "failed"
        })
    })
}

function add(arg1, arg2) {
    return arg1 + arg2;
}


module.exports = { available }