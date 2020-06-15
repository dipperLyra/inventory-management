var userExists = require('../user/user-exists');
var stockAvailble = require('../outlet/stock-in-outlet');
var models = require("../../database/connection.js");


function sell(req, res) {
    // check that user exists
    // check that outlet has stock quantity in stock
    
    if (!userExists.exists && !stockAvailble.available) res.json({message: "error, no stock_id or user_id available"})

    models.db.sales.create({
        stock_id: req.body.stock_id,
        outlet_id: req.body.outlet_id,
        quantity: req.body.quantity,
        user_id: req.body.user_id
    })
    .then(sold => res.json({
        data: {
            success: true,
            message: "stocks sold",
            stocks: sold
        }
    }))
    .catch(err => {
        res.json({
            success: false,
            error: err
        })
    })
}

module.exports = { sell }