'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('reconcile_assigned_stocks', {
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
      corresponds_to_supply: {
        type: Sequelize.BOOLEAN
      },
      deficit: {
        type: Sequelize.INTEGER
      },
      excess: {
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
    return queryInterface.dropTable('reconcile_assigned_stocks');
  }
};