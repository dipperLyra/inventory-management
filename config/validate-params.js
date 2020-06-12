const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');


function checkParams() {
    return {
        'username_password': [
            check('username').isString(),
            check('password').isLength({ min: 7 }),
        ],
        'admin_creation': [
            check('super_admin_username').isString(),
            check('super_admin_password').isLength({ min: 7 }),
            check('admin_username').isString(),
            check('admin_password').isLength({ min: 7 }),
        ],
        'stock_creation': [
            check('name').isString(),
            check('sku').isString(),
            check('description').isString().optional()
        ]
    }
}

function validateParams(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(422).json({error: errors.array()});

}

function validateAdmin(req, res) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (token) {
        if (token.startsWith('Bearer ')) token = token.slice(7, token.length);

        return jwt.verify(token, process.env.JWT_ADMIN_SECRET_KEY, (err) => {
            if (err) {
                return res.json({
                    success: false,
                    message: "Invalid token",
                    error: err
                })
            } else {return true}
        });
    } else {
        return res.json({message: "Auth token not supplied"});
    } 
}

module.exports = {checkParams, validateParams, validateAdmin}