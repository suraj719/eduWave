const express = require("express");
const {
  createStudent,
  loginStudent,
  getStudent,
  updateStudentQuiz,
  getAllStudents,
  updateTasksStudent,
} = require("./controllers/StudentController");
const {
  createTeacher,
  loginTeacher,
  getTeacher,
  updateTasksTeacher,
} = require("./controllers/TeacherController");
const authMiddlewareTeacher = require("./middlewares/authMiddlewareTeacher");
const authMiddlewareStudent = require("./middlewares/authMiddlewareStudent");
const {
  createQuiz,
  getAllQuiz,
  getQuiz,
} = require("./controllers/QuizController");
const {
  createResource,
  getAllResource,
  updateResource,
  starResource,
} = require("./controllers/ResourceController");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

// routes for teacher
router.route("/teacher/register").post(createTeacher);
router.route("/teacher/login").post(loginTeacher);
router
  .route("/teacher/get-teacher-by-id")
  .post(authMiddlewareTeacher, getTeacher);
router.route("/teacher/add-student").post(authMiddlewareTeacher, createStudent);
router.route("/teacher/add-quiz").post(authMiddlewareTeacher, createQuiz);
router
  .route("/teacher/update-task")
  .post(authMiddlewareTeacher, updateTasksTeacher);
router
  .route("/teacher/upload-resource")
  .post(authMiddlewareTeacher, upload.single("file"), createResource);
// routes for student
router.route("/student/register").post(createStudent);
router.route("/student/login").post(loginStudent);
router
  .route("/student/get-student-by-id")
  .post(authMiddlewareStudent, getStudent);
router
  .route("/student/update-student")
  .post(authMiddlewareStudent, updateStudentQuiz);
router
  .route("/student/update-task")
  .post(authMiddlewareStudent, updateTasksStudent);

// routes common for both teacher and student
router.route("/get-resources").get(getAllResource);
router.route("/teacher/resources/:id").patch(authMiddlewareTeacher, updateResource);
router.route("/resources/:id/star").post(authMiddlewareStudent, starResource);
router.route("/get-students").get(getAllStudents);
router.route("/get-all-quiz").get(getAllQuiz);
router.route("/quiz/:quizID").get(getQuiz);
module.exports = router;
