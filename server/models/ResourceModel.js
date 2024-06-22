const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema(
  {
    fileURL: String,
    fileName: String,
    uploadedBy: mongoose.Schema.Types.Mixed,
    class: String,
    subject: String,
    date: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("resources", ResourceSchema);
