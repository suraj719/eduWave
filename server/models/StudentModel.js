const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  rollnumber:String,
  email: String,
  password: String,
  parentEmail: String,
  parentPhone: String,
  class: Number,
});

module.exports = mongoose.model("students", studentSchema);
