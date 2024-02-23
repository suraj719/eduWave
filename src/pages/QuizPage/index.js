import React, { useState, useEffect } from "react";
import Loader from "../../components/Loaders/Loader";
import ScoreCard from "./ScoreCard";
import Slide from "./Slide";

function shuffleArray(array) {
  // Create a copy of the array to avoid mutating the original array
  const newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
  }
  return newArray;
}

function shuffleQuestions(questions) {
  return shuffleArray(
    questions.map((question) => ({
      ...question,
      options: shuffleArray(question.options),
    }))
  );
}

export default function QuizPage() {
  const questions = {
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
      {
        question_text: "What is the tallest mountain in the world?",
        options: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
        answer: "Mount Everest",
      },
      {
        question_text: "What is the most populous city in the world?",
        options: ["Tokyo", "Delhi", "Shanghai", "São Paulo"],
        answer: "Tokyo",
      },
      {
        question_text: "What is the name of the largest ocean on Earth?",
        options: [
          "Pacific Ocean",
          "Atlantic Ocean",
          "Indian Ocean",
          "Arctic Ocean",
        ],
        answer: "Pacific Ocean",
      },
      {
        question_text:
          "In what year was the Declaration of Independence signed?",
        options: ["1776", "1783", "1789", "1803"],
        answer: "1776",
      },
      {
        question_text: "What is the name of the Mona Lisa's creator?",
        options: [
          "Leonardo da Vinci",
          "Michelangelo",
          "Raphael",
          "Sandro Botticelli",
        ],
        answer: "Leonardo da Vinci",
      },
      {
        question_text: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        answer: "Canberra",
      },
      {
        question_text: "What is the tallest building in the world?",
        options: [
          "Burj Khalifa",
          "Shanghai Tower",
          "Abraj Al-Bait Clock Tower",
          "One World Trade Center",
        ],
        answer: "Burj Khalifa",
      },
    ],
  };
  const [index, setIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    setShuffledQuestions(shuffleQuestions(questions.questions));
    setIsLoading(false); // Set loading to false once shuffling is done
  }, []);

  const handleSelectOption = (option) => {
    setSelectedOptions({ ...selectedOptions, [index]: option });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    let correctCount = 0;
    shuffledQuestions.forEach((question, i) => {
      if (selectedOptions[i] === question.answer) {
        correctCount++;
      }
    });
    setScore(correctCount);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col items-center justify-center h-[90vh]">
            <p className="text-white text-xl">{questions.title}</p>
            <div
              className="rounded-xl flex items-center justify-center w-[55vw] h-[70vh]"
              style={{
                backgroundImage: `url(${questions.background})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
              }}
            >
              {submitted ? (
                <ScoreCard questions={shuffledQuestions} score={score} />
              ) : (
                <>
                  {index !== 0 && (
                    <button onClick={() => setIndex(index - 1)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
                        />
                      </svg>
                    </button>
                  )}
                  <div className="w-[70%] flex flex-col items-center">
                    <Slide
                      question={shuffledQuestions[index]}
                      selected={selectedOptions[index]}
                      onSelect={handleSelectOption}
                    />
                    {index === shuffledQuestions.length - 1 && (
                      <button
                        onClick={handleSubmit}
                        className="rounded-lg font-bold text-xl p-4 px-8 bg-green-300 text-black w-[60%] mt-2"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                  {index !== shuffledQuestions.length - 1 && (
                    <button onClick={() => setIndex(index + 1)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
                        />
                      </svg>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
