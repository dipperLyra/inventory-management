'use strict';
module.exports = (sequelize, DataTypes) => {
  const SuperAdmin = sequelize.define('SuperAdmin', {
    username: DataTypes.STRING,
    password: DataTypes.TEXT
  }, {});
  SuperAdmin.associate = function(models) {
    // associations can be defined here
  };
  return SuperAdmin;
};