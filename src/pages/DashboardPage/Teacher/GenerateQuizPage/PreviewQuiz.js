import React from "react";
import TeacherSideBar from "../../../../components/shared/TeacherSideBar";
import QuizPage from "../../../QuizPage";

export default function PreviewQuiz() {
  const questionsData = localStorage.getItem("quizPreview");

  // Parse the JSON string back into a JavaScript object
  const questions = JSON.parse(questionsData);
  return (
    <>
      <div className="flex">
        <TeacherSideBar />
        <div className="flex items-center justify-center w-[90vw]">
          <QuizPage questions={questions} />
        </div>
      </div>
    </>
  );
}
