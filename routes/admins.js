var express = require('express');
var router = express.Router();

/* Controllers */
var outlets = require("../controllers/admin/outlets");
var superAdminController = require("../controllers/admin/super-admin-controller");
var adminDistController = require("../controllers/admin/admin-handle-distributor-controller");
var adminStocksController = require("../controllers/admin/admin-handle-stocks");
var distributor = require("../controllers/distributor/assign-stock-to-outlet");
var baseAdminController = require("../controllers/admin/base-admin-controller.js");

var validator = require("../config/validate-params");

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

/* 
All admin requests will first check for a valid token, 
except in the case of a sign in 
*/

/* Admin sign in. Obtain token */
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

/* Admin create company's global stocks */
router.post('/stocks', 
validator.checkParams().stock_creation,  
(req, res) => {
    validator.validateParams(req, res);
    adminStocksController.createStock(req, res);
});

/* Admin record stocks produced/available */
router.post('/stocks/production', 
validator.checkParams().stock_production,  
(req, res) => {
    validator.validateParams(req, res);
    adminStocksController.produceStocks(req, res);
});

/* Admin assign stocks to distributors */
router.post('/stocks/distribution', 
validator.checkParams().assign_stocks,  
(req, res) => {
    validator.validateParams(req, res);
    adminDistController.assignStocks(req, res);
});

/* Admin create outlets */
router.post('/outlets', 
validator.checkParams().name,
(req, res, next) => {
    validator.validateParams(req, res);
    outlets.createOutlet(req, res)
});

/* Distributor assign stocks to outlet */
router.post('/distributor/outlet', 
validator.checkParams().assign_stocks,  
(req, res) => {
    validator.validateParams(req, res);
    distributor.assignStock(req, res);
});



module.exports = router;