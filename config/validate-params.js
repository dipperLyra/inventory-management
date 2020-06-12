const { check, validationResult } = require('express-validator');



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
    }
}

function validateParams(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(422).json({error: errors.array()});

}

module.exports = {checkParams, validateParams}