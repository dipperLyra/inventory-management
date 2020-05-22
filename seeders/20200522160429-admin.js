'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('admins', [{
        name: 'Eche Chekwube',
        password: "Tr1n1ti",
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('admins', null, {});
  }
};

function load(limit, execute) {
  for (count = 1; count <= limit; count++) {
    execute();
  }
}