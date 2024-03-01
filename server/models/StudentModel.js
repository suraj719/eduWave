const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  email: String,
  password: String,
  parentName: String,
  parentEmail: String,
  parentPhone: String,
  class: String,
  quizs: mongoose.Schema.Types.Mixed,
  averageScore: Number,
  averageAccuracy: Number,
  totalScore: Number,
  tasks: mongoose.Schema.Types.Mixed,
});

module.exports = mongoose.model("students", studentSchema);
