'use strict';
module.exports = (sequelize, DataTypes) => {
  const stock_production_quantity = sequelize.define('stock_production_quantity', {
    stock_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  stock_production_quantity.associate = function(models) {
    // associations can be defined here
  };
  return stock_production_quantity;
};