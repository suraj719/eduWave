const mongoose = require("mongoose");
const quizSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  quiz: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
  attempts: {
    type: mongoose.Schema.Types.Mixed,
  },
});

module.exports = mongoose.model("quizs", quizSchema);
