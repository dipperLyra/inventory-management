'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('stocks', [{
        name: 'HP 2000',
        sku: 'number',
        other_names: 'HP laptop',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('stocks', null, {});
  }
};
