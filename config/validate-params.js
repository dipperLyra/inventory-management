const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');


function checkParams(req, res) {
    return {
        'name': [
            check('name').isString(), 
        ],
        'username_password': [
            check('username').isString(),
            check('password').isLength({ min: 7 }),
        ],
        'user_signup': [
            check('firstname').isString(),
            check('lastname').isString(),
            check('email').isEmail(),
            check('password').isLength({ min: 7 }),
            check('phone_number').isMobilePhone(),
            check('dob').not().isEmpty(),
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
        ],
        'stock_production': [
            check('stock_id').isInt(),
            check('quantity').isInt(),
            check('sku').isString(),
        ],
        'assign_stocks': [
            check('stock_id').isInt(),
            check('quantity').isInt(),
            check('admin_id').isInt().optional(),
            check('outlet_id').isInt().optional(),
            check('distributor_id').isInt().optional(),
        ],
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