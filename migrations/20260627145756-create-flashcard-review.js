'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FlashcardReviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      flashcard_id: {
        type: Sequelize.INTEGER
      },
      correct_attempts: {
        type: Sequelize.INTEGER
      },
      wrong_attempts: {
        type: Sequelize.INTEGER
      },
      review_count: {
        type: Sequelize.INTEGER
      },
      mastery_score: {
        type: Sequelize.FLOAT
      },
      due_date: {
        type: Sequelize.DATE
      },
      last_reviewed_at: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('FlashcardReviews');
  }
};