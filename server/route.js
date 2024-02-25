const express = require("express");
const {
  createStudent,
  loginStudent,
  getStudent,
} = require("./controllers/StudentController");
const {
  createTeacher,
  loginTeacher,
  getTeacher,
} = require("./controllers/TeacherController");
const authMiddlewareTeacher = require("./middlewares/authMiddlewareTeacher");
const authMiddlewareStudent = require("./middlewares/authMiddlewareStudent");
const router = express.Router();

// routes for teacher
router.route("/teacher/register").post(createTeacher);
router.route("/teacher/login").post(loginTeacher);
router
  .route("/teacher/get-teacher-by-id")
  .post(authMiddlewareTeacher, getTeacher);
router.route("/student/create").post(createStudent);

// routes for student
router.route("/student/login").post(loginStudent);
router
  .route("/student/get-student-by-id")
  .post(authMiddlewareStudent, getStudent);

module.exports = router;
