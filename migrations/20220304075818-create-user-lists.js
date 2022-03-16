'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserLists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      list_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'Lists',
          key:'id'
        },
        onDelete:'cascade'
      },
      user_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'Users',
          key:'id'
        },
        onDelete:'cascade'
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserLists');
  }
};