const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/StudentModel");
const Quiz = require("../models/QuizModel");
const createStudent = async (req, res) => {
  try {
    const studentExists = await Student.findOne({
      rollNumber: req.body.rollNumber,
    });
    if (studentExists) {
      return res.status(200).send({
        message: "Student already exists",
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(200).send({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      succes: false,
    });
  }
};

const loginStudent = async (req, res) => {
  try {
    const student = await Student.findOne({
      rollNumber: req.body.rollNumber,
    });
    if (!student) {
      return res.status(200).send({
        message: "Student not found",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, student.password);
    if (!isMatch) {
      return res.status(200).send({
        message: "Invalid password",
        success: false,
      });
    }
    const token = jwt.sign({ studentID: student._id }, process.env.jwt_secret, {
      expiresIn: "12h",
    });
    res.status(200).send({
      message: "Login successful",
      success: true,
      data: token,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

const getStudent = async (req, res) => {
  try {
    const student = await Student.findOne({
      _id: req.body.studentID,
    });
    if (!student) {
      return res.status(200).send({
        message: "Student not found",
        success: false,
      });
    }
    student.password = undefined;
    res.status(200).send({
      message: "Student found",
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

const updateStudentQuiz = async (req, res) => {
  try {
    const { user, ...restData } = req.body.quiz;
    const student = await Student.findOneAndUpdate(
      { _id: req.body.studentID },
      { $push: { quizs: restData } },
      { new: true }
    );
    await Quiz.findOneAndUpdate(
      { _id: req.body.quiz._id },
      { $push: { attempts: req.body.quiz } },
      { new: true }
    );
    if (!student) {
      return res.send({
        message: "Student not found",
        success: false,
      });
    }
    res.status(200).send({
      message: "Student updated successfully",
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};
module.exports = {
  loginStudent,
  createStudent,
  getStudent,
  updateStudentQuiz,
};
