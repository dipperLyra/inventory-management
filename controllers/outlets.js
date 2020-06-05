var model = require("../database/connection.js");

function createOutlet(req, res) {
    model.outlet.create({
        name: req.body.name,
        assigned_id: req.body.assigned_id
    })
    .then(outlet => {
        res.json({
            message: "outlet created",
            outlet: outlet
        })
    })
    .catch(err => {
        res.json({
            message: "outlet not created",
            error: err
        })
    });
}

module.exports = {createOutlet};