'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flashcard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Flashcard.init({
    deck_id: DataTypes.INTEGER,
    front_text: DataTypes.TEXT,
    example_sentence: DataTypes.TEXT,
    notes: DataTypes.TEXT,
    position: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Flashcard',
  });
  return Flashcard;
};