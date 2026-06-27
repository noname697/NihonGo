'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FlashcardReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FlashcardReview.init({
    user_id: DataTypes.INTEGER,
    flashcard_id: DataTypes.INTEGER,
    correct_attempts: DataTypes.INTEGER,
    wrong_attempts: DataTypes.INTEGER,
    review_count: DataTypes.INTEGER,
    mastery_score: DataTypes.FLOAT,
    due_date: DataTypes.DATE,
    last_reviewed_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'FlashcardReview',
  });
  return FlashcardReview;
};