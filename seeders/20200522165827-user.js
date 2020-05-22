'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkInsert('users', [{
        firstname: 'Jasnah',
        lastname: 'Venli',
        email: 'jasnah@venli.com',
        password: "Tr1n1ti",
        phone_number: '080336232',
        dob: '20-Oct-1995',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
