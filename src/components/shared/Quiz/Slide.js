import React from "react";

export default function Slide({ question, selected, onSelect }) {
  return (
    <>
      <p className="font-str text-center font-bold text-black my-2 text-4xl">
        {question.question_text}
      </p>
      <div className="font-str text-white text-2xl w-full flex flex-col items-center">
        {question.options.map((option, index) => {
          return (
            <button
              className={
                "rounded-lg p-4 px-8 bg-sky-200 text-black w-[60%] mt-2 hover:bg-sky-300" +
                (selected === option
                  ? "border border-4 border-green-500 bg-sky-300"
                  : "")
              }
              key={option + index}
              onClick={() => onSelect(option)}
            >
              <p>{option}</p>
            </button>
          );
        })}
      </div>
    </>
  );
}
