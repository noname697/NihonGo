"use strict";

const now = new Date();

const kanji = [
  {
    symbol: "月",
    meaning: "moon, month",
    onyomi: "ゲツ, ガツ",
    kunyomi: "つき",
    stroke_count: 4,
    character_group: "time",
    position: 6,
  },
  {
    symbol: "金",
    meaning: "gold, money, Friday",
    onyomi: "キン, コン",
    kunyomi: "かね, かな",
    stroke_count: 8,
    character_group: "time",
    position: 7,
  },
  {
    symbol: "土",
    meaning: "earth, soil, Saturday",
    onyomi: "ド, ト",
    kunyomi: "つち",
    stroke_count: 3,
    character_group: "nature",
    position: 8,
  },
  {
    symbol: "山",
    meaning: "mountain",
    onyomi: "サン",
    kunyomi: "やま",
    stroke_count: 3,
    character_group: "nature",
    position: 9,
  },
  {
    symbol: "川",
    meaning: "river",
    onyomi: "セン",
    kunyomi: "かわ",
    stroke_count: 3,
    character_group: "nature",
    position: 10,
  },
  {
    symbol: "田",
    meaning: "rice field",
    onyomi: "デン",
    kunyomi: "た",
    stroke_count: 5,
    character_group: "places",
    position: 11,
  },
  {
    symbol: "口",
    meaning: "mouth, opening",
    onyomi: "コウ, ク",
    kunyomi: "くち",
    stroke_count: 3,
    character_group: "body",
    position: 12,
  },
  {
    symbol: "目",
    meaning: "eye",
    onyomi: "モク",
    kunyomi: "め",
    stroke_count: 5,
    character_group: "body",
    position: 13,
  },
  {
    symbol: "耳",
    meaning: "ear",
    onyomi: "ジ",
    kunyomi: "みみ",
    stroke_count: 6,
    character_group: "body",
    position: 14,
  },
  {
    symbol: "手",
    meaning: "hand",
    onyomi: "シュ",
    kunyomi: "て",
    stroke_count: 4,
    character_group: "body",
    position: 15,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "study_characters",
      kanji.map((item) => ({
        type: "kanji",
        symbol: item.symbol,
        romaji: null,
        meaning: item.meaning,
        onyomi: item.onyomi,
        kunyomi: item.kunyomi,
        jlpt_level: "N5",
        stroke_count: item.stroke_count,
        character_group: item.character_group,
        position: item.position,
        createdAt: now,
        updatedAt: now,
      })),
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("study_characters", {
      type: "kanji",
      symbol: kanji.map((item) => item.symbol),
    });
  },
};
