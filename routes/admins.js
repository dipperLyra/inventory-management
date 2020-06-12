var express = require('express');
var router = express.Router();

/* Controllers */
var outlets = require("../controllers/outlets");
var superAdminController = require("../controllers/admin/super-admin-controller");
var adminDistController = require("../controllers/admin/admin-handle-distributor-controller");
var stocks = require("../controllers/stocks");
var baseAdminController = require("../controllers/admin/base-admin-controller.js");
var outletStocks = require('../controllers/admin');

var validator = require("../config/validate-params");

var jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');


/* Create super-admin; only super-admin can create admin. */
router.post('/super', 
validator.checkParams().username_password,
(req, res) => {
    validator.validateParams(req, res);
    superAdminController.createSuperAdmin(req, res);   
});

/* Super-admin create admin */
router.post('/', 
validator.checkParams().admin_creation,
(req, res) => {
    validator.validateParams(req, res);
    superAdminController.createAdmin(req, res);
});

/* Admin sign in */
router.post('/signin', 
validator.checkParams().username_password, 
(req, res) => {
    validator.validateParams(req, res);
    baseAdminController.signin(req, res);
});

/* Admin create distributor */
router.post('/distributor', 
validator.checkParams().username_password, 
(req, res) => {
    validator.validateParams(req, res);
    adminDistController.createDistributor(req, res);
});




function authenticateAdminUser(req, res) {
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

router.post('/outlets', 
[
    check('name').isString(),
], (req, res, next) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    authenticateAdminUser(req, res);
    outlets.createOutlet(req, res, next)
});

router.post('/stocks', 
[
    check('name').isString(),
    check('sku').isString(),
    check('other_names').optional().trim().escape()
], 
(req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    authenticateAdminUser(req, res);
    stocks.createStock(req, res); 
});

router.post('/outletstocks', 
[
    check('stock_name').isString(),
    check('sku').isString(),
    check('other_names').optional().trim().escape(),
    check('assigned_id').optional().trim(),
    check('outlet_name').isString()
],
(req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    authenticateAdminUser(req, res);
    outletStocks.OutletStocks(req, res);
})

module.exports = router;