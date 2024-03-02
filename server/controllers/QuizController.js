const Quiz = require("../models/QuizModel");
const Student = require("../models/StudentModel");
const { transporter } = require("../nodemailer");
const createQuiz = async (req, res) => {
  try {
    const newQuiz = new Quiz(req.body);
    const students = await Student.find();
    if (students && students.length > 0) {
      // console.log(students)
      students.forEach(async (student) => {
        try {
          // Send email to the student
          if (student.class === req.body.class) {
            await sendQuizEmail(
              student.email,
              req.body.title,
              req.body.deadline
            );
          }
        } catch (error) {
          console.error("Error sending email to student:", error);
        }
      });
    }
    await newQuiz.save();

    res.status(200).send({
      message: "Quiz created successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error,
      success: false,
    });
  }
};
const sendQuizEmail = async (studentEmail, title, deadline) => {
  try {
    const fdd = new Date(deadline).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const ftd = new Date(deadline).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    await transporter.sendMail({
      from: "gitty690@gmail.com",
      to: `${studentEmail}`,
      subject: "A new quiz has been added",
      text: `A new quiz on ${title} have been created. 
      Attempt the quiz before the deadline (${fdd} ${ftd})
      `,
    });
    // console.log("Email sent successfully to:", studentEmail);
  } catch (error) {
    throw new Error("Error sending email to student:", error);
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

const getQuiz = async (req, res) => {
  try {
    const result = await Quiz.findById(req.params.quizID);
    res.status(200).send({
      message: "Quiz retrieved successfully",
      success: true,
      data: result,
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
  getQuiz,
};
