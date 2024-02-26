const Quiz = require("../models/QuizModel");

const createQuiz = async (req, res) => {
  try {
    const newQuiz = new Quiz(req.body);
    await newQuiz.save();
    res.status(200).send({
      message: "Quiz created successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "something went wrong !",
      success: false,
    });
  }
};

const getAllQuiz = async (req, res) => {
  try {
    const quizs = await Quiz.find();
    res.status(200).send({
      message: "Quizes retrieved successfully",
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
  createQuiz,
  getAllQuiz,
};
