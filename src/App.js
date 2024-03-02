import { Route, Routes, useLocation } from "react-router";
import "./App.css";
import { useSelector } from "react-redux";
import AuthPage from "./pages/AuthPage";
import Canvas from "./pages/DashboardPage/Teacher/CanvasPage";
import GenerateQuiz from "./pages/DashboardPage/Teacher/GenerateQuizPage";
import PreviewQuiz from "./pages/DashboardPage/Teacher/GenerateQuizPage/PreviewQuiz";
import HomePage from "./pages/HomePage";
import PublicRoute from "./components/Auth/PublicRoute";
import TeacherRegister from "./pages/AuthPage/Teacher/TeacherRegister";
import TeacherLogin from "./pages/AuthPage/Teacher/TeacherLogin";
import Spinner from "./components/Loaders/Spinner";
import ProtectedTeacherRoute from "./components/Auth/ProtectedTeacherRoute";
import TeacherDashboard from "./pages/DashboardPage/Teacher/TeacherDashboard";
import AddStudent from "./pages/DashboardPage/Teacher/AddStudent";
import QuizPageTeacher from "./pages/DashboardPage/Teacher/QuizPageTeacher";
import ProtectedStudentRoute from "./components/Auth/ProtectedStudentRoute";
import StudentLogin from "./pages/AuthPage/Student/StudentLogin";
import StudentDashboard from "./pages/DashboardPage/Student/StudentDashboard";
import QuizPageStudent from "./pages/DashboardPage/Student/QuizPageStudent";
import QuizStudent from "./pages/DashboardPage/Student/QuizPageStudent/QuizStudent";
import LeaderBoardStudent from "./pages/DashboardPage/Student/LeaderBoard/LeaderBoardStudent";
import LeaderBoardTeacher from "./pages/DashboardPage/Teacher/LeaderBoard/LeaderBoardTeacher";
import CanvasStudent from "./pages/DashboardPage/Student/Canvas";
import EMeetTeacher from "./pages/DashboardPage/Teacher/EMeet";
import TeacherRoom from "./pages/DashboardPage/Teacher/EMeet/TeacherRoom";
import StudentRoom from "./pages/DashboardPage/Student/EMeet/StudentRoom";
import EMeetStudent from "./pages/DashboardPage/Student/EMeet";
import Stars from "./components/Stars/Stars";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import ChatStudent from "./pages/DashboardPage/Student/Chat";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import AddResource from "./pages/DashboardPage/Teacher/AddResource";
import Resources from "./pages/DashboardPage/Student/Resources";
import StatisticsStudent from "./pages/DashboardPage/Student/Statistics";

function App() {
  const { loading } = useSelector((state) => state.alert);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const location = useLocation();
  const isStudentRoute = location.pathname.includes("/dashboard/student");
  const isQuizRoute = location.pathname.includes("/quiz/student");
  useEffect(() => {
    // const handleBeforeUnload = (event) => {
    //   event.preventDefault();
    //   event.returnValue = ""; // Some browsers require this line.
    //   return ""; // For others.
    // };
    // window.addEventListener("blur", () => {
    //   alert("Don't forget about your goals !! study hard soldier !!");
    // });
    // window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      // window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  useEffect(() => {
    if (isFullScreen && isStudentRoute) {
      const intervalId = setInterval(() => {
        toast("Take a short break");
      }, 30000);

      return () => clearInterval(intervalId);
    }
  }, [isFullScreen, isStudentRoute]);
  const handleFullScreenChange = () => {
    setIsFullScreen(!!document.fullscreenElement);
  };

  const handleKeyDown = (event) => {
    if (event.key === "f") {
      toggleFullScreen();
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    }
    // else {
    //   if (document.exitFullscreen) {
    //     document.exitFullscreen();
    //   }
    // }
  };
  const [isChatOpen, setIsChatOpen] = useState(false); // State to manage chat visibility

  const toggleChat = () => {
    setIsChatOpen((prevState) => !prevState); // Toggle chat visibility
  };
  return (
    <>
      {loading || (isStudentRoute && !isFullScreen) ? <Spinner /> : null}
      <Toaster />
      <Stars />
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
          path="/dashboard/teacher"
          element={
            <ProtectedTeacherRoute>
              <TeacherDashboard />
            </ProtectedTeacherRoute>
          }
        />
        <Route
          path="/dashboard/teacher/all-quiz"
          element={
            <ProtectedTeacherRoute>
              <QuizPageTeacher />
            </ProtectedTeacherRoute>
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
          path="/dashboard/teacher/students"
          element={
            <ProtectedTeacherRoute>
              <AddStudent />
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

        <Route
          path="/auth/student/login"
          element={
            <PublicRoute>
              <StudentLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard/student"
          element={
            <ProtectedStudentRoute>
              <StudentDashboard />
            </ProtectedStudentRoute>
          }
        />
        <Route
          path="/dashboard/student/quiz"
          element={
            <ProtectedStudentRoute>
              <QuizPageStudent />
            </ProtectedStudentRoute>
          }
        />
        <Route
          path="/quiz/student/:id"
          element={
            <ProtectedStudentRoute>
              <QuizStudent />
            </ProtectedStudentRoute>
          }
        />
        <Route
          path="/dashboard/student/leaderboard"
          element={
            <ProtectedStudentRoute>
              <LeaderBoardStudent />
            </ProtectedStudentRoute>
          }
        />
        <Route
          path="/dashboard/teacher/leaderboard"
          element={
            <ProtectedTeacherRoute>
              <LeaderBoardTeacher />
            </ProtectedTeacherRoute>
          }
        />
        <Route
          path="/dashboard/student/canvas"
          element={
            <ProtectedStudentRoute>
              <CanvasStudent />
            </ProtectedStudentRoute>
          }
        />
        <Route
          path="/dashboard/teacher/emeet"
          element={
            <ProtectedTeacherRoute>
              <EMeetTeacher />
            </ProtectedTeacherRoute>
          }
        />
        <Route
          path="/dashboard/teacher/meet/:roomID"
          element={
            <ProtectedTeacherRoute>
              <TeacherRoom />
            </ProtectedTeacherRoute>
          }
        />
        <Route
          path="/dashboard/student/emeet"
          element={
            <ProtectedStudentRoute>
              <EMeetStudent />
            </ProtectedStudentRoute>
          }
        />
        <Route
          path="/dashboard/student/meet/:roomID"
          element={
            <ProtectedStudentRoute>
              <StudentRoom />
            </ProtectedStudentRoute>
          }
        />
        <Route path="/chat" element={<ChatStudent />} />
        <Route
          path="/dashboard/teacher/resources"
          element={
            <ProtectedTeacherRoute>
              <AddResource />
            </ProtectedTeacherRoute>
          }
        />
        <Route
          path="/dashboard/student/resources"
          element={
            <ProtectedStudentRoute>
              <Resources />
            </ProtectedStudentRoute>
          }
        />
        <Route
          path="/dashboard/student/statistics"
          element={
            <ProtectedStudentRoute>
              <StatisticsStudent />
            </ProtectedStudentRoute>
          }
        />
      </Routes>
      {isStudentRoute && !isQuizRoute && (
        <>
          <div className="fixed bottom-8 right-8 z-50">
            {isChatOpen && <ChatStudent />}

            <div
              className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full shadow-lg cursor-pointer flex-shrink-0"
              onClick={toggleChat}
            >
              <ChatBubbleOvalLeftEllipsisIcon />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
