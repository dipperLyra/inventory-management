'use strict';
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class User extends Model{}
User.init({
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    phone_number: Sequelize.STRING,
    dob: Sequelize.STRING
}, {
    underscored: true,
    sequelize,
    modelName: 'users'
});


class Role extends Model{}
Role.init({
    name: DataTypes.STRING
}, {
    underscored: true,
    sequelize,
    modelName: 'roles'
});

class Userrole extends Model {}
Userrole.init(
    {  
        underscored: true,
        sequelize,
        modelName: 'user_roles'
    }
);

User.sync({alter: true});
Role.sync({alter: true});
Userrole.sync({alter: true});

User.hasMany(Userrole);
Role.hasMany(Userrole);


