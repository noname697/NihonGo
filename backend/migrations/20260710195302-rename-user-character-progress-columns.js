"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "user_character_progress",
      "wrong_attemps",
      "wrong_attempts",
    );
    await queryInterface.renameColumn(
      "user_character_progress",
      "last_awnser",
      "last_answer",
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "user_character_progress",
      "wrong_attempts",
      "wrong_attemps",
    );
    await queryInterface.renameColumn(
      "user_character_progress",
      "last_answer",
      "last_awnser",
    );
  },
};
