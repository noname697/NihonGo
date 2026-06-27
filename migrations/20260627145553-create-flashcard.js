'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Flashcards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      deck_id: {
        type: Sequelize.INTEGER
      },
      front_text: {
        type: Sequelize.TEXT
      },
      example_sentence: {
        type: Sequelize.TEXT
      },
      notes: {
        type: Sequelize.TEXT
      },
      position: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Flashcards');
  }
};