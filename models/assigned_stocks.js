'use strict';
module.exports = (sequelize, DataTypes) => {
  const assigned_stocks = sequelize.define('assigned_stocks', {
    fk_stock_id: DataTypes.INTEGER,
    fk_stock_name: DataTypes.STRING,
    fk_SKU: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    fk_from_outlet_id: DataTypes.INTEGER,
    fk_to_outlet_id: DataTypes.INTEGER
  }, {});
  assigned_stocks.associate = function(models) {
    // associations can be defined here
  };
  return assigned_stocks;
};

const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class AssignedStocks extends Model{}
AssignedStocks.init({
  fk_stock_id: DataTypes.INTEGER,
})