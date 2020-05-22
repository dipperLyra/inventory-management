'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('assigned_stocks_conditions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fk_assigned_stock_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'assigned_stocks'
          },
          key: 'id'
        },
        allowNull: false
      },
      stock_condition: {
        type: Sequelize.STRING
      },
      defective_number: {
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
    return queryInterface.dropTable('assigned_stocks_conditions');
  }
};