import { Route, Routes } from "react-router";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Navbar from "./components/shared/Navbar";
import AuthPage from "./pages/AuthPage";
import Canvas from "./pages/DashboardPage/Teacher/CanvasPage";
import GenerateQuiz from "./pages/DashboardPage/Teacher/GenerateQuizPage";
import PreviewQuiz from "./pages/DashboardPage/Teacher/GenerateQuizPage/PreviewQuiz";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import Loader from "./components/Loaders/Loader";
import PublicRoute from "./components/Auth/PublicRoute";
import TeacherRegister from "./pages/AuthPage/Teacher/TeacherRegister";
import TeacherLogin from "./pages/AuthPage/Teacher/TeacherLogin";
import Spinner from "./components/Loaders/Spinner";
import ProtectedTeacherRoute from "./components/Auth/ProtectedTeacherRoute";
import TeacherDashboard from "./pages/DashboardPage/Teacher/TeacherDashboard";
// import Stars from "./components/Stars/Stars";

function App() {
  const { loading } = useSelector((state) => state.alert);
  const questionss = {
    title: "General quiz",
    background: "../assets/quiz1-template.png",
    questions: [
      {
        question_text: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Rome"],
        answer: "Paris",
      },
      {
        question_text: "What is the largest planet in our solar system?",
        options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
        answer: "Jupiter",
      },
      {
        question_text: "What is the chemical formula for water?",
        options: ["H2O", "CO2", "NaCl", "NH3"],
        answer: "H2O",
      },
    ],
  };
  return (
    <>
      <Navbar />
      {loading ? <Spinner /> : null}
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/auth"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />
        <Route
          path="/auth/teacher/register"
          element={
            <PublicRoute>
              <TeacherRegister />
            </PublicRoute>
          }
        />
        <Route
          path="/auth/teacher/login"
          element={
            <PublicRoute>
              <TeacherLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard/teacher/create-quiz"
          element={
            <ProtectedTeacherRoute>
              <GenerateQuiz />
            </ProtectedTeacherRoute>
          }
        />
        <Route
          path="/dashboard/teacher/preview/:quizTitle"
          element={
            <ProtectedTeacherRoute>
              <PreviewQuiz />
            </ProtectedTeacherRoute>
          }
        />
        <Route
          path="/dashboard/teacher/canvas"
          element={
            <ProtectedTeacherRoute>
              <Canvas />
            </ProtectedTeacherRoute>
          }
        />

        {/* <Route path="/auth/teacher/register" element={<Register />} />
        <Route path="/auth/teacher/login" element={<Login />} /> */}

        {/* <Route path="/auth" element={<AuthPage />} /> */}
        {/* <Route path="/quiz" element={<QuizPage questions={questionss} />} /> */}
        {/* <Route path="/canvas" element={<Canvas />} /> */}
        <Route path="/add-quiz" element={<GenerateQuiz />} />
        {/* <Route path="/preview/:quizTitle" element={<PreviewQuiz />} /> */}
        <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
      </Routes>
      {/* <Stars /> */}
    </>
  );
}

export default App;
