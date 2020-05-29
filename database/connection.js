require('dotenv').config();

const Sequelize = require('sequelize');

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

db.user = sequelize.import("../models/users.js");
db.roles = sequelize.import("../models/users.js");
db.token = sequelize.import("../models/token.js");
db.admin = sequelize.import("../models/admin.js");
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;