'use strict';
var user = require('user');

module.exports = (sequelize, DataTypes) => {
  const user_role = sequelize.define('user_role', {
    fk_user_id: DataTypes.INTEGER,
    fk_role_id: DataTypes.INTEGER
  }, {});
  user_role.associate = function(models) {
    // associations can be defined here

  };
  return user_role;
};