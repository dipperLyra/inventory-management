'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('assigned_stocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fk_stock_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'stocks'
          },
          key: 'id'
        },
        allowNull: false
      },
      quantity: Sequelize.INTEGER,
      fk_from_outlet_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'outlets'
          },
          key: 'id'
        },
        allowNull: false
      },
      fk_to_outlet_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'outlets'
          },
          key: 'id'
        },
        allowNull: false
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
    return queryInterface.dropTable('assigned_stocks');
  }
};