import React from "react";
import QuizPage from "../QuizPage";

export default function PreviewQuiz() {
  const questionsData = localStorage.getItem("quizPreview");

  // Parse the JSON string back into a JavaScript object
  const questions = JSON.parse(questionsData);
  return (
    <>
      <div>
        <QuizPage questions={questions} />
      </div>
    </>
  );
}
