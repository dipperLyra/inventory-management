require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    });

sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established')
        })
        .catch(err => {
            console.error('Unable to connect')
        });