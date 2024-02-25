import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TeacherSideBar from "../../../../components/shared/TeacherSideBar";
import Example from "./Modal";

export default function GenerateQuiz() {
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [background, setBackground] = useState("");
  const [quizClass, setQuizClass] = useState(1);
  // Function to add a question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question_text: "", options: [""], answer: "" },
    ]);
  };

  // Function to add an option
  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  // Function to handle question text change
  const handleQuestionTextChange = (index, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question_text = event.target.value;
    setQuestions(updatedQuestions);
  };

  // Function to handle option text change
  const handleOptionTextChange = (questionIndex, optionIndex, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(updatedQuestions);
  };

  // Function to handle selecting correct answer
  const handleSelectCorrectAnswer = (questionIndex, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answer = event.target.value;
    setQuestions(updatedQuestions);
  };

  // Function to save the quiz
  const saveQuiz = () => {
    // Format questions to match desired JSON structure
    const formattedQuestions = questions.map((question) => ({
      question_text: question.question_text,
      options: question.options.filter((option) => option.trim() !== ""), // Remove empty options
      answer: question.answer,
    }));

    const quizData = {
      title: quizTitle,
      class: quizClass,
      background: background,
      questions: formattedQuestions,
    };
    console.log(quizData);
    // Here you can perform any action with the generated JSON data, such as sending it to the server
  };

  const handlePreview = () => {
    // Check if quiz title is provided
    if (quizTitle.trim() !== "") {
      // Redirect to preview route with quiz data
      const formattedQuestions = questions.map((question) => ({
        question_text: question.question_text,
        options: question.options.filter((option) => option.trim() !== ""), // Remove empty options
        answer: question.answer,
      }));

      const quizData = {
        title: quizTitle,
        class: quizClass,
        background: background,
        questions: formattedQuestions,
      };

      localStorage.setItem("quizPreview", JSON.stringify(quizData));

      // Open the preview route in a new tab
      window.open(`/dashboard/teacher/preview/${quizTitle}`, "_blank");
    } else {
      alert("Please provide a title for the quiz.");
    }
  };

  return (
    <>
      <div className="flex gap-9">
        <TeacherSideBar />
        <div className="flex justify-evenly overflow-hidden">
          <div className="w-[20vw] h-[90vh] flex items-center">
            <div className="rounded-lg p-4 border-2 border-white flex flex-col gap-4">
              <div>
                <label className="text-white">Title of the quiz*: </label>
                <input
                  className="outline-none rounded-lg px-2 py-1 w-full"
                  type="text"
                  placeholder="An attractive title for your quiz *"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  required
                />
              </div>
              <div className="-mt-2">
                <label className="text-white">Class*: </label>
                <select
                  className="w-full rounded-lg px-2 py-1"
                  onChange={(e) => setQuizClass(e.target.value)}
                >
                  <option value="" disabled>
                    select class
                  </option>
                  <option value={1}>1st class</option>
                  <option value={2}>2nd class</option>
                  <option value={3}>3rd class</option>
                  <option value={4}>4th class</option>
                  <option value={5}>5th class</option>
                  <option value={6}>6th class</option>
                  <option value={7}>7th class</option>
                  <option value={8}>8th class</option>
                  <option value={9}>9th class</option>
                  <option value={10}>10th class</option>
                </select>
              </div>
              <div>
                <button
                  className="bg-white rounded-lg p-2 w-full"
                  onClick={addQuestion}
                >
                  Add question
                </button>
              </div>
              <div>
                <button
                  onClick={() => setOpened(true)}
                  className="bg-white rounded-lg p-2 w-full"
                >
                  Select quiz background
                </button>
              </div>
              <div>
                <button
                  className="bg-white rounded-lg p-2 w-full"
                  onClick={handlePreview}
                >
                  preview quiz
                </button>
              </div>
              <div>
                <button
                  className="bg-white rounded-lg p-2 w-full"
                  onClick={saveQuiz}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          <div
            className="ml-4 px-4 pt-8 w-[70vw]"
            style={{
              maxHeight: "90vh",
              overflowY: "auto",
              // flexBasis: "75vw",
              // flexShrink: 0,
            }}
          >
            {questions.map((question, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg p-4 mb-4"
                style={{ flexBasis: "100%" }}
              >
                <input
                  className="outline-none rounded-lg px-2 py-1 w-full mb-2"
                  type="text"
                  placeholder={`Enter question ${index + 1} *`}
                  value={question.question_text}
                  onChange={(e) => handleQuestionTextChange(index, e)}
                  required
                />
                {question.options.map((option, optionIndex) => (
                  <input
                    key={optionIndex}
                    className="outline-none rounded-lg px-2 py-1 w-full mb-2"
                    type="text"
                    placeholder={`Option ${optionIndex + 1}`}
                    value={option}
                    onChange={(e) =>
                      handleOptionTextChange(index, optionIndex, e)
                    }
                    style={{ width: "calc(100% - 4px)" }} // Set fixed width here
                  />
                ))}
                <label className="text-white">Select correct answer: </label>
                <select
                  className="w-full rounded-lg px-2 py-1 mb-2"
                  onChange={(e) => handleSelectCorrectAnswer(index, e)}
                  value={question.answer}
                >
                  <option value="">select correct option</option>
                  {question.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>
                      {option || `option ${optionIndex + 1}`}
                    </option>
                  ))}
                </select>
                <button
                  className="bg-white rounded-lg p-2 mb-2"
                  onClick={() => addOption(index)}
                >
                  Add option
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Example
        opened={opened}
        handleClose={() => setOpened(false)}
        handleSelect={setBackground}
      />
    </>
  );
}
