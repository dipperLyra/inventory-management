require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');

var sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
);

var db = {};

db.superAdmin = sequelize.import("../models/superadmin.js");
db.admin = sequelize.import("../models/admin.js");
db.distributor = sequelize.import("../models/distributor");
db.production = sequelize.import("../models/stock_production");
db.adminToDistributor = sequelize.import("../models/admin_stocks_to_distributor");
db.user = sequelize.import("../models/users.js");
db.roles = sequelize.import("../models/users.js");
db.token = sequelize.import("../models/token.js");
db.outlet = sequelize.import("../models/outlets.js");
db.stock = sequelize.import("../models/stocks.js");
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = {db, DataTypes};