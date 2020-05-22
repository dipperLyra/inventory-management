'use strict';
module.exports = (sequelize, DataTypes) => {
  const outlets = sequelize.define('outlets', {
    name: DataTypes.STRING,
    assigned_id: DataTypes.STRING
  }, {});
  outlets.associate = function(models) {
    // associations can be defined here
  };
  return outlets;
};