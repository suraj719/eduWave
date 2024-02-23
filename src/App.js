import { Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./components/shared/Navbar";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
// import Stars from "./components/Stars/Stars";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={HomePage} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
      {/* <Stars /> */}
    </>
  );
}

export default App;
