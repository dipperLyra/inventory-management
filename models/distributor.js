'use strict';
module.exports = (sequelize, DataTypes) => {
  const distributor = sequelize.define('distributors', {
    username: DataTypes.STRING,
    address: DataTypes.STRING,
    password: DataTypes.TEXT
  }, {});
  distributor.associate = function(models) {
    // associations can be defined here
  };
  return distributor;
};