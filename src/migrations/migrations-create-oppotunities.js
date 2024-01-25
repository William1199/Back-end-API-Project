'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Oppotunities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      oppotunityName: {
        type: Sequelize.STRING
      },
      oppId: {
        type: Sequelize.INTEGER
      },
      partner: {
        type: Sequelize.STRING
      },
      product_Service: {
        type: Sequelize.STRING
      },
      stago: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Oppotunities');
  }
};