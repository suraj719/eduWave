const Resource = require("../models/ResourceModel");
const { uploadToS3 } = require("../s3");

const createResource = async (req, res) => {
  try {
    const { class: className, subject, uploadedBy, fileName, description, tags } = req.body;

    if (!req.file) {
      return res.status(400).send({ message: "File is required", success: false });
    }

    const s3Url = await uploadToS3(req.file);

    const uploadedByParsed =
      typeof uploadedBy === "string" ? JSON.parse(uploadedBy) : uploadedBy;

    const newResource = new Resource({
      class: className,
      subject,
      uploadedBy: uploadedByParsed,
      fileURL: s3Url,
      fileName,
      description: description || "",
      tags: Array.isArray(tags) ? tags : (typeof tags === "string" && tags.length ? tags.split(",").map((t) => t.trim()) : []),
      size: req.file.size,
      mimeType: req.file.mimetype,
      date: new Date().toISOString(),
    });
    await newResource.save();
    res.status(200).send({
      message: "Resource saved successfully",
      success: true,
      data: newResource,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "something went wrong !",
      success: false,
    });
  }
};

const getAllResource = async (req, res) => {
  try {
    const {
      class: className,
      subject,
      uploaderId,
      fileType,
      search,
      sortBy = "createdAt",
      sortOrder = "desc",
      page = 1,
      pageSize = 20,
    } = req.query;

    const filter = {};
    if (className) filter.class = className;
    if (subject) filter.subject = subject;
    if (uploaderId) filter["uploadedBy._id"] = uploaderId;
    if (fileType) filter.mimeType = { $regex: `^${fileType}/`, $options: "i" };
    if (search) {
      filter.$or = [
        { fileName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };
    const skip = (Number(page) - 1) * Number(pageSize);

    const [items, total] = await Promise.all([
      Resource.find(filter).sort(sort).skip(skip).limit(Number(pageSize)),
      Resource.countDocuments(filter),
    ]);

    res.status(200).send({
      message: "Resources retrieved successfully",
      success: true,
      data: items,
      pagination: { total, page: Number(page), pageSize: Number(pageSize) },
    });
  } catch (error) {
    res.status(500).send({
      message: "something went wrong!",
      success: false,
    });
  }
};

const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { fileName, class: className, subject, description, tags } = req.body;
    const update = {};
    if (fileName !== undefined) update.fileName = fileName;
    if (className !== undefined) update.class = className;
    if (subject !== undefined) update.subject = subject;
    if (description !== undefined) update.description = description;
    if (tags !== undefined)
      update.tags = Array.isArray(tags) ? tags : (typeof tags === "string" && tags.length ? tags.split(",").map((t) => t.trim()) : []);

    const saved = await Resource.findByIdAndUpdate(id, update, { new: true });
    res.status(200).send({ message: "Resource updated", success: true, data: saved });
  } catch (error) {
    res.status(500).send({ message: error.message, success: false });
  }
};

const starResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId, action } = req.body; // action: 'star' | 'unstar'
    if (!studentId) return res.status(400).send({ success: false, message: "studentId required" });
    const update =
      action === "unstar"
        ? { $pull: { starredBy: studentId } }
        : { $addToSet: { starredBy: studentId } };
    const saved = await Resource.findByIdAndUpdate(id, update, { new: true });
    res.status(200).send({ message: "OK", success: true, data: saved });
  } catch (error) {
    res.status(500).send({ message: error.message, success: false });
  }
};

module.exports = {
  createResource,
  getAllResource,
  updateResource,
  starResource,
};
