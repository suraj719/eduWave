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
});

module.exports = mongoose.model("students", studentSchema);
