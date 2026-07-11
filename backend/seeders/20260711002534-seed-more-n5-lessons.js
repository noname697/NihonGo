"use strict";

const now = new Date();

const lessons = [
  {
    id: 4,
    module_id: 1,
    title: "Particle を",
    description: "Learn how を marks the direct object of an action.",
    explanation_text:
      "The particle を marks the direct object of a verb. It shows what receives the action. Although it is written as を, it is pronounced 'o' when used as a particle. Example: 水を飲みます means 'I drink water'. 水 is the object, and 飲みます is the action.",
    position: 4,
  },
  {
    id: 5,
    module_id: 1,
    title: "Particle に",
    description: "Learn how に marks direction, destination, and time.",
    explanation_text:
      "The particle に can mark direction, destination, or a specific time. Example: 学校に行きます means 'I go to school'. 学校 is the destination. Another example: 七時に起きます means 'I wake up at seven'.",
    position: 5,
  },
  {
    id: 6,
    module_id: 1,
    title: "Basic ます Verbs",
    description: "Learn polite present-tense verbs ending in ます.",
    explanation_text:
      "Many beginner Japanese sentences use polite verbs ending in ます. For example, 食べます means 'eat', 飲みます means 'drink', 行きます means 'go', and 見ます means 'see/watch'. These forms are polite and useful in everyday conversation.",
    position: 6,
  },
  {
    id: 7,
    module_id: 1,
    title: "Questions with か",
    description: "Learn how か turns a sentence into a question.",
    explanation_text:
      "The particle か is placed at the end of a sentence to make it a question. Example: これは本です means 'This is a book'. これは本ですか means 'Is this a book?' In polite Japanese, you usually do not need a question mark, but learners often use one for clarity.",
    position: 7,
  },
  {
    id: 8,
    module_id: 1,
    title: "Possession with の",
    description: "Learn how の connects nouns and shows possession.",
    explanation_text:
      "The particle の connects nouns. It can show possession or relationship between nouns. Example: 私の本 means 'my book'. 日本語の先生 means 'Japanese teacher'. The noun before の describes or owns the noun after の.",
    position: 8,
  },
];

const exercises = [
  {
    id: 4,
    lesson_id: 4,
    type: "complete_sentence",
    question: "水＿＿飲みます。",
    correct_answer: "を",
    explanation: "を marks 水 as the direct object of the verb 飲みます.",
    position: 1,
    options: ["を", "は", "に"],
  },
  {
    id: 5,
    lesson_id: 4,
    type: "multiple_choice",
    question: "What does を mark?",
    correct_answer: "the direct object",
    explanation: "を marks the thing that receives the action.",
    position: 2,
    options: ["the direct object", "the topic", "a question"],
  },
  {
    id: 6,
    lesson_id: 4,
    type: "complete_sentence",
    question: "本＿＿読みます。",
    correct_answer: "を",
    explanation: "本 is what is being read, so を is used.",
    position: 3,
    options: ["を", "の", "か"],
  },

  {
    id: 7,
    lesson_id: 5,
    type: "complete_sentence",
    question: "学校＿＿行きます。",
    correct_answer: "に",
    explanation: "に marks 学校 as the destination.",
    position: 1,
    options: ["に", "を", "か"],
  },
  {
    id: 8,
    lesson_id: 5,
    type: "multiple_choice",
    question: "In 七時に起きます, what does に mark?",
    correct_answer: "a specific time",
    explanation: "に can mark a specific time, such as 七時.",
    position: 2,
    options: ["a specific time", "a direct object", "ownership"],
  },
  {
    id: 9,
    lesson_id: 5,
    type: "complete_sentence",
    question: "八時＿＿寝ます。",
    correct_answer: "に",
    explanation: "に marks the specific time 八時.",
    position: 3,
    options: ["に", "は", "を"],
  },

  {
    id: 10,
    lesson_id: 6,
    type: "multiple_choice",
    question: "What does 飲みます mean?",
    correct_answer: "drink",
    explanation: "飲みます is the polite verb meaning 'drink'.",
    position: 1,
    options: ["drink", "go", "read"],
  },
  {
    id: 11,
    lesson_id: 6,
    type: "complete_sentence",
    question: "ごはんを食べ＿＿。",
    correct_answer: "ます",
    explanation: "食べます is the polite form of the verb 'to eat'.",
    position: 2,
    options: ["ます", "です", "か"],
  },
  {
    id: 12,
    lesson_id: 6,
    type: "multiple_choice",
    question: "Which verb means 'go'?",
    correct_answer: "行きます",
    explanation: "行きます means 'go'.",
    position: 3,
    options: ["行きます", "見ます", "食べます"],
  },

  {
    id: 13,
    lesson_id: 7,
    type: "complete_sentence",
    question: "これは本です＿＿。",
    correct_answer: "か",
    explanation: "か at the end turns the sentence into a question.",
    position: 1,
    options: ["か", "を", "に"],
  },
  {
    id: 14,
    lesson_id: 7,
    type: "multiple_choice",
    question: "What does か do at the end of a sentence?",
    correct_answer: "makes a question",
    explanation: "か marks the sentence as a question.",
    position: 2,
    options: ["makes a question", "shows possession", "marks an object"],
  },
  {
    id: 15,
    lesson_id: 7,
    type: "complete_sentence",
    question: "田中さんは先生です＿＿。",
    correct_answer: "か",
    explanation: "か asks whether Tanaka is a teacher.",
    position: 3,
    options: ["か", "の", "を"],
  },

  {
    id: 16,
    lesson_id: 8,
    type: "complete_sentence",
    question: "私＿＿本",
    correct_answer: "の",
    explanation: "私の本 means 'my book'.",
    position: 1,
    options: ["の", "を", "か"],
  },
  {
    id: 17,
    lesson_id: 8,
    type: "multiple_choice",
    question: "What does 私の本 mean?",
    correct_answer: "my book",
    explanation: "の connects 私 and 本 to show possession.",
    position: 2,
    options: ["my book", "I read", "this book"],
  },
  {
    id: 18,
    lesson_id: 8,
    type: "complete_sentence",
    question: "日本語＿＿先生",
    correct_answer: "の",
    explanation: "日本語の先生 means 'Japanese teacher'.",
    position: 3,
    options: ["の", "に", "は"],
  },
];

const buildLessonsRows = () => {
  return lessons.map((lesson) => ({
    ...lesson,
    createdAt: now,
    updatedAt: now,
  }));
};

const buildExerciseRows = () => {
  return exercises.map(({options, ...exercise}) => ({
    ...exercise,
    createdAt: now,
    updatedAt: now,
  }));
};

const buildOptionRows = () => {
  const rows = [];

  for (const exercise of exercises) {
    exercise.options.forEach((text, index) => {
      rows.push({
        exercise_id: exercise.id,
        text,
        is_correct: text === exercise.correct_answer,
        position: index + 1,
        createdAt: now,
        updatedAt: now,
      });
    });
  }

  return rows;
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("exercise_options", {
      exercise_id: exercises.map((exercise) => exercise.id),
    });

    await queryInterface.bulkDelete("exercises", {
      id: exercises.map((exercise) => exercise.id),
    });

    await queryInterface.bulkDelete("lessons", {
      id: lessons.map((lesson) => lesson.id),
    });

    await queryInterface.bulkInsert("lessons", buildLessonsRows());
    await queryInterface.bulkInsert("exercises", buildExerciseRows());
    await queryInterface.bulkInsert("exercise_options", buildOptionRows());
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("exercise_options", {
      exercise_id: exercises.map((exercise) => exercise.id),
    });

    await queryInterface.bulkDelete("exercises", {
      id: exercises.map((exercise) => exercise.id),
    });

    await queryInterface.bulkDelete("lessons", {
      id: lessons.map((lesson) => lesson.id),
    });
  },
};
