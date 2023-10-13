'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      name: {
        allowNull: false,
        unique: true,
        type: Sequelize.TEXT,
      },
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      isDone: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      date: {
        type: Sequelize.STRING,
      },
      partialDate: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks')
  },
}
