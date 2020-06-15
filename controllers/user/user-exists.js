var message = require("../../config/messages");
var models = require("../../database/connection.js");


async function exists(req, res) {
    const user = await models.db.user.findByPk(req.body.outlet_id);
    if (user) return true
    else{res.json({error: message.user_not_found})}
}

module.exports = { exists }