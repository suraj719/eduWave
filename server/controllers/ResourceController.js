const Resource = require("../models/ResourceModel");

const createResource = async (req, res) => {
  try {
    const newResource = new Resource(req.body);
    await newResource.save();
    res.status(200).send({
      message: "Resource saved successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "something went wrong !",
      success: false,
    });
  }
};

const getAllResource = async (req, res) => {
  try {
    const quizs = await Resource.find();
    res.status(200).send({
      message: "Resources retrieved successfully",
      success: true,
      data: quizs,
    });
  } catch (error) {
    res.status(500).send({
      message: "something went wrong!",
      success: false,
    });
  }
};

module.exports = {
  createResource,
  getAllResource,
};
