'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }},
    password: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    dob: DataTypes.STRING
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};