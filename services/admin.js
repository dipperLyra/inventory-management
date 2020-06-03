var models = require("../database/connection.js");

function OutletStocks(req, res) {
    const Stock = models.db.stock;
    const Outlet = models.db.outlet;
    
    Stock.belongsToMany(Outlet, {through: 'outlet_stocks'});
    Outlet.belongsToMany(Stock, {through: 'outlet_stocks'});
    
    Stock.create({
        name: req.body.stock_name,
        sku: req.body.sku,
        other_names: req.body.other_names
    })
    .then(stock => {
        let outletId;
    
        Outlet.create({
            name: req.body.outlet_name,
            assigned_id: req.body.assigned_id
        })
        .then(outlet => {
            outletId = outlet.id;
        })
        .then(() => {
            stock.addOutlet(outletId);
            res.json({message: "successful"})
        })
        .catch(err => res.json({error: err}))
    })
    .catch(err => res.json({error: err}))
}

module.exports = {OutletStocks};