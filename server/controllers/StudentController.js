const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/StudentModel");

const createStudent = async (req, res) => {
  try {
    const studentExists = await Student.findOne({
      username: req.body.username,
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
      message: "Registration successful",
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
      username: req.body.username,
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
    const student = await Teacher.findOne({
      _id: req.body.studentID,
    });
    if (!teacher) {
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
module.exports = {
  loginStudent,
  createStudent,
  getStudent,
};
