'use strict';
module.exports = (sequelize, DataTypes) => {
  const assigned_stocks_condition = sequelize.define('assigned_stocks_condition', {
    fk_assigned_stock_id: DataTypes.INTEGER,
    stock_condition: DataTypes.STRING,
    defective_number: DataTypes.INTEGER
  }, {});
  assigned_stocks_condition.associate = function(models) {
    // associations can be defined here
  };
  return assigned_stocks_condition;
};