'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkInsert('assigned_stocks', [{
        fk_stock_id: 1,
        quantity: 30,
        fk_from_outlet_id: 1, 
        fk_to_outlet_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('assigned_stocks', null, {});
  }
};
