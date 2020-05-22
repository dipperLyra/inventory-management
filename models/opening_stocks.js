'use strict';
module.exports = (sequelize, DataTypes) => {
  const opening_stocks = sequelize.define('opening_stocks', {
    fk_stock_id: DataTypes.INTEGER,
    fk_stock_name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    fk_SKU: DataTypes.STRING
  }, {});
  opening_stocks.associate = function(models) {
    // associations can be defined here
  };
  return opening_stocks;
};