const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  subject: String,
  isApproved: {
    type: Boolean,
    default: false,
  },
  tasks: mongoose.Schema.Types.Mixed,
});

module.exports = mongoose.model("teachers", TeacherSchema);
