import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

export default function ScoreCard({ questions, score, accuracy }) {
  const [check, setCheck] = useState(false);
  const [index, setIndex] = useState(0);
  // const [showConfetti, setShowConfetti] = useState(true);

  // useEffect(() => {
  //   // Hide the confetti after 5 seconds
  //   const timeout = setTimeout(() => {
  //     setShowConfetti(false);
  //   }, 5000);

  //   // Clear the timeout when the component unmounts or if the confetti is hidden early
  //   return () => clearTimeout(timeout);
  // }, []); // This effect runs only once, on component mount
  return (
    <>
      {!check && (
        <Confetti
          width={window.innerWidth - 100}
          heigh={window.innerHeight}
          numberOfPieces={100}
        />
      )}
      {check ? (
        <div className="flex items-center justify-center w-full">
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
            <p className="font-str text-center font-bold text-black my-2 text-4xl">
              {questions[index].question_text}
            </p>
            <div className="font-str text-white text-2xl w-full flex flex-col items-center">
              {questions[index].options.map((option, id) => {
                return (
                  <button
                    className={
                      "rounded-lg p-4 px-8 bg-sky-200 text-black w-[60%] mt-2 hover:bg-sky-300" +
                      (questions[index].answer === option
                        ? "border border-4 border-green-500 bg-sky-300"
                        : "")
                    }
                    key={option + id}
                  >
                    <p>{option}</p>
                  </button>
                );
              })}
            </div>
          </div>
          {index !== questions.length - 1 && (
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
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="font-bold font-str text-6xl text-center">
            Your score: {score}/{questions.length}
          </p>
          <p className="font-bold font-str text-6xl text-center">
            Accuracy: {accuracy}%
          </p>
          <button
            onClick={() => setCheck(true)}
            className="mt-4 bg-sky-200 font-bold text-2xl rounded-lg p-5"
          >
            check answers
          </button>
        </div>
      )}
    </>
  );
}
