var message = require("../../config/messages");
var models = require("../../database/connection.js");


async function exists(req, res) {
    const outlet = await models.db.outlet.findByPk(req.body.outlet_id);
    if (outlet) return true
    else{res.json({error: message.outlet_not_found})}
}

module.exports = { exists }