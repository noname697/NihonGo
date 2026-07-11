"use strict";

const now = new Date();

const hiragana = [
  ["か", "ka", "k-row", 6, 3],
  ["き", "ki", "k-row", 7, 4],
  ["く", "ku", "k-row", 8, 1],
  ["け", "ke", "k-row", 9, 3],
  ["こ", "ko", "k-row", 10, 2],

  ["さ", "sa", "s-row", 11, 3],
  ["し", "shi", "s-row", 12, 1],
  ["す", "su", "s-row", 13, 2],
  ["せ", "se", "s-row", 14, 3],
  ["そ", "so", "s-row", 15, 1],

  ["た", "ta", "t-row", 16, 4],
  ["ち", "chi", "t-row", 17, 2],
  ["つ", "tsu", "t-row", 18, 1],
  ["て", "te", "t-row", 19, 1],
  ["と", "to", "t-row", 20, 2],

  ["な", "na", "n-row", 21, 4],
  ["に", "ni", "n-row", 22, 3],
  ["ぬ", "nu", "n-row", 23, 2],
  ["ね", "ne", "n-row", 24, 2],
  ["の", "no", "n-row", 25, 1],
];

const katakana = [
  ["カ", "ka", "k-row", 6, 2],
  ["キ", "ki", "k-row", 7, 3],
  ["ク", "ku", "k-row", 8, 2],
  ["ケ", "ke", "k-row", 9, 3],
  ["コ", "ko", "k-row", 10, 2],

  ["サ", "sa", "s-row", 11, 3],
  ["シ", "shi", "s-row", 12, 3],
  ["ス", "su", "s-row", 13, 2],
  ["セ", "se", "s-row", 14, 2],
  ["ソ", "so", "s-row", 15, 2],

  ["タ", "ta", "t-row", 16, 3],
  ["チ", "chi", "t-row", 17, 3],
  ["ツ", "tsu", "t-row", 18, 3],
  ["テ", "te", "t-row", 19, 3],
  ["ト", "to", "t-row", 20, 2],

  ["ナ", "na", "n-row", 21, 2],
  ["ニ", "ni", "n-row", 22, 2],
  ["ヌ", "nu", "n-row", 23, 2],
  ["ネ", "ne", "n-row", 24, 4],
  ["ノ", "no", "n-row", 25, 1],
];

const buildKanaRows = (type, rows) => {
  return rows.map(([symbol, romaji, group, position, strokeCount]) => ({
    type,
    symbol,
    romaji,
    meaning: null,
    onyomi: null,
    kunyomi: null,
    jlpt_level: null,
    stroke_count: strokeCount,
    character_group: group,
    position,
    createdAt: now,
    updatedAt: now,
  }));
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("study_characters", [
      ...buildKanaRows("hiragana", hiragana),
      ...buildKanaRows("katakana", katakana),
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("study_characters", {
      character_group: ["k-row", "s-row", "t-row", "n-row"],
    });
  },
};
