'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserLessonProgress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserLessonProgress.init({
    user_id: DataTypes.INTEGER,
    lesson_id: DataTypes.INTEGER,
    total_exercises: DataTypes.INTEGER,
    correct_exercises: DataTypes.INTEGER,
    score: DataTypes.FLOAT,
    is_completed: DataTypes.BOOLEAN,
    completed_at: DataTypes.DATE,
    last_studied_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserLessonProgress',
  });
  return UserLessonProgress;
};