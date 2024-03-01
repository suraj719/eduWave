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

    // Update the student document with the new quiz attempt
    const updatedStudent = await Student.findByIdAndUpdate(
      { _id: req.body.studentID },
      { $push: { quizs: restData } },
      { new: true }
    );

    // Update the quiz document with the new attempt
    await Quiz.findByIdAndUpdate(
      { _id: req.body.quiz._id },
      { $push: { attempts: req.body.quiz } },
      { new: true }
    );

    // Calculate average accuracy, average score, and total score for the student
    const totalAttempts = updatedStudent.quizs.length;
    const totalScore = updatedStudent.quizs.reduce(
      (acc, q) => acc + Number(q.score),
      0
    );

    // Calculate total accuracy and handle rounding if necessary
    let totalAccuracy = updatedStudent.quizs.reduce(
      (acc, q) => acc + Number(q.accuracy),
      0
    );

    // Determine if the total accuracy is an integer or a decimal
    if (Number.isInteger(totalAccuracy)) {
      totalAccuracy = Math.round(totalAccuracy);
    } else {
      // If it's a decimal, round it to two decimal places
      totalAccuracy = Number(totalAccuracy.toFixed(2));
    }

    // Calculate average score and average accuracy
    let averageScore = totalScore / totalAttempts;
    let averageAccuracy = totalAccuracy / totalAttempts;

    // Round the average score to ensure it's an integer if it's a whole number
    if (Number.isInteger(averageScore)) {
      averageScore = Math.round(averageScore);
    } else {
      // If it's a decimal, round it to two decimal places
      averageScore = Number(averageScore.toFixed(2));
    }

    // Round the average accuracy to two decimal places if it's a decimal number
    averageAccuracy = Number(averageAccuracy.toFixed(2));

    // Update the student document with the calculated values
    await Student.findByIdAndUpdate(
      { _id: req.body.studentID },
      { $set: { averageScore, averageAccuracy, totalScore } },
      { new: true }
    );

    res.status(200).send({
      message: "Student updated successfully",
      success: true,
      data: updatedStudent,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const student = await Student.find();
    res.status(200).send({
      message: "students retrieved successfully",
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).send({
      message: "something went wrong!",
      success: false,
    });
  }
};

const updateTasksStudent = async (req, res) => {
  try {
    const { studentID, tasks } = req.body;

    // Find the student by ID
    const student = await Student.findById(studentID);

    if (!student) {
      return res.status(404).send({
        message: "Student not found",
        success: false,
      });
    }

    // Update the student's tasks
    student.tasks = tasks;

    // Save the updated student document
    await student.save();

    res.status(200).send({
      message: "Tasks updated successfully",
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
  getAllStudents,
  updateTasksStudent,
};
