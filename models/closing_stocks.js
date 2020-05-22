'use strict';
module.exports = (sequelize, DataTypes) => {
  const closing_stocks = sequelize.define('closing_stocks', {
    fk_stock_id: DataTypes.INTEGER,
    fk_stock_name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    fk_SKU: DataTypes.STRING
  }, {});
  closing_stocks.associate = function(models) {
    // associations can be defined here
  };
  return closing_stocks;
};