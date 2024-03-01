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
    if (teacher.isApproved === false) {
      return res.status(200).send({
        message: "Your account is not approved yet",
        success: false,
      });
    }
    const token = jwt.sign({ teacherID: teacher._id }, process.env.jwt_secret, {
      expiresIn: "12h",
    });
    res.status(200).send({
      message: "Login successful",
      success: true,
      data: token,
      userID: teacher._id,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

const getTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({
      _id: req.body.teacherID,
    });
    if (!teacher) {
      return res.status(200).send({
        message: "Teacher not found",
        success: false,
      });
    }
    teacher.password = undefined;
    res.status(200).send({
      message: "Teacher found",
      success: true,
      data: teacher,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

const updateTasksTeacher = async (req, res) => {
  try {
    const { teacherID, tasks } = req.body;

    // Find the teacher by ID
    const teacher = await Teacher.findById(teacherID);

    if (!teacher) {
      return res.status(404).send({
        message: "Teacher not found",
        success: false,
      });
    }

    // Update the teacher's tasks
    teacher.tasks = tasks;

    // Save the updated teacher document
    await teacher.save();

    res.status(200).send({
      message: "Tasks updated successfully",
      success: true,
      data: teacher,
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
  getTeacher,
  updateTasksTeacher,
};
