'use strict';
module.exports = (sequelize, DataTypes) => {
  const sales = sequelize.define('sales', {
    stock_id: DataTypes.INTEGER,
    outlet_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  sales.associate = function(models) {
    // associations can be defined here
  };
  return sales;
};