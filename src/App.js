import { Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./components/shared/Navbar";
import AuthPage from "./pages/AuthPage";
import Canvas from "./pages/CanvasPage";
import GenerateQuiz from "./pages/GenerateQuizPage";
import PreviewQuiz from "./pages/GenerateQuizPage/PreviewQuiz";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
// import Stars from "./components/Stars/Stars";
function App() {
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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/quiz" element={<QuizPage questions={questionss} />} />
        <Route path="/canvas" element={<Canvas />} />
        <Route path="/add-quiz" element={<GenerateQuiz />} />
        <Route path="/preview/:quizTitle" element={<PreviewQuiz />} />
      </Routes>
      {/* <Stars /> */}
    </>
  );
}

export default App;
