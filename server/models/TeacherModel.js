const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("teachers", TeacherSchema);
