'use strict';
module.exports = (sequelize, DataTypes) => {
  const admin_stocks_to_distributor = sequelize.define('admin_stocks_to_distributors', {
    admin_id: DataTypes.INTEGER,
    distributor_id: DataTypes.INTEGER,
    stock_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  admin_stocks_to_distributor.associate = function(models) {
    // associations can be defined here
  };
  return admin_stocks_to_distributor;
};