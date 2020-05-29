'use strict';
module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    token: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  Token.associate = function(models) {
    // associations can be defined here
  };
  return Token;
};