'use strict';
module.exports = (sequelize, DataTypes) => {
  const stocks = sequelize.define('stocks', {
    name: DataTypes.STRING,
    SKU: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  stocks.associate = function(models) {
    // associations can be defined here
    
  };
  return stocks;
};