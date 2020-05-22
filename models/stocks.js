'use strict';
module.exports = (sequelize, DataTypes) => {
  const stocks = sequelize.define('stocks', {
    name: DataTypes.STRING,
    SKU: DataTypes.STRING,
    other_names: DataTypes.STRING
  }, {});
  stocks.associate = function(models) {
    // associations can be defined here
  };
  return stocks;
};