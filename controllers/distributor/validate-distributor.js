var models = require("../../database/connection.js");
var bcrypt = require('bcryptjs');


function validateDistributor(req, res) {
    models.db.distributor.findOne({where: {
        username: req.body.username
    }})
    .then(distributor => {
        let isPasswordCorrect = bcrypt.compareSync(req.body.password, distributor.password);        
        if (isPasswordCorrect) {
            return true;
        } else {
            return false;
        }
    })
    .catch(err => {
        return false;
    })
}

exports.default = validateDistributor