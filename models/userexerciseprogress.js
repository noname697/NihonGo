'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserExerciseProgress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserExerciseProgress.init({
    user_id: DataTypes.INTEGER,
    exercise_id: DataTypes.INTEGER,
    answer: DataTypes.STRING,
    is_correct: DataTypes.BOOLEAN,
    attempts_count: DataTypes.INTEGER,
    answered_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserExerciseProgress',
  });
  return UserExerciseProgress;
};