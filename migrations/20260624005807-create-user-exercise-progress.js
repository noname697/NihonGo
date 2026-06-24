'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserExerciseProgresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      exercise_id: {
        type: Sequelize.INTEGER
      },
      answer: {
        type: Sequelize.STRING
      },
      is_correct: {
        type: Sequelize.BOOLEAN
      },
      attempts_count: {
        type: Sequelize.INTEGER
      },
      answered_at: {
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
    await queryInterface.dropTable('UserExerciseProgresses');
  }
};