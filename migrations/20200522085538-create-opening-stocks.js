'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('outlet_opening_stocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stock_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'stocks'
          },
          key: 'id'
        },
        allowNull: false
      },
      outlet_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'outlets'
          },
          key: 'id'
        },
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('outlet_opening_stocks');
  }
};