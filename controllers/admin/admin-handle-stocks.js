var models = require("../../database/connection.js");
var adminValidator = require('../../config/validate-params.js');
var message = require("../../config/messages");


function createStock(req, res) {
    if (!adminValidator.validateAdmin(req, res)) res.json({
        data: {
            success: false,
            message: message.invalid_token,
        }
    })

    models.db.stock.create({
        name: req.body.name,
        sku: req.body.sku,
        description: req.body.description
    })
    .then(stock => {
        res.json({
            data: {
                success: true,
                message: message.stock_created,
                stock: stock
            }
        })
    })
    .catch(err => {
        res.json({
            data: {
                success: false,
                message: message.stock_not_created,
                error: err
            }
        })
    });
}

async function produceStocks(req, res) {
    if (!adminValidator.validateAdmin(req, res)) res.json({
        data: {
            success: false,
            message: message.invalid_token,
        }
    })
    const stock = await models.db.stock.findOne({where: {
        sku: req.body.sku
    }});

    if(stock === null) {
        res.json({
            data: {
                success: false,
                message: message.stock_not_found,
            }
        })
    } else {
        models.db.production.create({
            stock_id: stock.id,
            quantity: req.body.quantity
        })
        .then(produced => res.json({
            data: {
                success: true,
                message: message.successful_production,
                produced: produced
            }
        }))
        .catch(err => res.json({
            data: {
                success: false,
                message: err,
            }
        }));
    } 
}

module.exports = { createStock, produceStocks }