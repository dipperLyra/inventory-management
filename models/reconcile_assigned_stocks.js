'use strict';
module.exports = (sequelize, DataTypes) => {
  const reconcile_assigned_stocks = sequelize.define('reconcile_assigned_stocks', {
    fk_assigned_stock_id: DataTypes.INTEGER,
    corresponds_to_supply: DataTypes.BOOLEAN,
    deficit: DataTypes.INTEGER,
    excess: DataTypes.INTEGER
  }, {});
  reconcile_assigned_stocks.associate = function(models) {
    // associations can be defined here
  };
  return reconcile_assigned_stocks;
};