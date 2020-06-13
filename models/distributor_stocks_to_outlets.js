'use strict';
module.exports = (sequelize, DataTypes) => {
  const distributor_stocks_to_outlets = sequelize.define('distributor_stocks_to_outlets', {
    admin_id: DataTypes.INTEGER,
    distributor_id: DataTypes.INTEGER,
    stock_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  distributor_stocks_to_outlets.associate = function(models) {
    // associations can be defined here
  };
  return distributor_stocks_to_outlets;
};