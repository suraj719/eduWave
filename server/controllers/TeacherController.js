const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Teacher = require("../models/TeacherModel");

const createTeacher = async (req, res) => {
  try {
    const teacherExists = await Teacher.findOne({
      email: req.body.email,
    });
    if (teacherExists) {
      return res.status(200).send({
        message: "already exists",
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const newEmployee = new Teacher(req.body);
    await newEmployee.save();
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

const loginTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({
      email: req.body.email,
    });
    if (!teacher) {
      return res.status(200).send({
        message: "Teacher not found",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, teacher.password);
    if (!isMatch) {
      return res.status(200).send({
        message: "Invalid password",
        success: false,
      });
    }
    const token = jwt.sign({ teacherID: teacher._id }, process.env.jwt_secret, {
      expiresIn: "10m",
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

module.exports = {
  loginTeacher,
  createTeacher,
};
