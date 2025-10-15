const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema(
  {
    fileURL: String,
    fileName: String,
    description: String,
    tags: [String],
    uploadedBy: mongoose.Schema.Types.Mixed,
    class: String,
    subject: String,
    date: String,
    size: Number,
    mimeType: String,
    starredBy: [String], // store student IDs
  },
  { timestamps: true }
);

module.exports = mongoose.model("resources", ResourceSchema);
