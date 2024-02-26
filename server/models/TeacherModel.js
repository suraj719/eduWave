const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isApproved: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("teachers", TeacherSchema);
