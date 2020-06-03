var models = require("../database/connection.js");

function createStock(req, res) {
    models.stock.create({
        name: req.body.name,
        SKU: req.body.sku,
        other_names: req.body.other_names
    })
    .then(stock => {
        res.json({
            message: "stock created",
            outlet: stock
        })
    })
    .catch(err => {
        res.json({
            message: "stock not created",
            error: err
        })
    });
}

module.exports = {createStock}