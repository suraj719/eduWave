import React, { useState, useEffect } from "react";
import ScoreCard from "../../../../components/shared/Quiz/ScoreCard";
import Slide from "../../../../components/shared/Quiz/Slide";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../../../redux/alerts";
import { useParams } from "react-router";
import StudentSideBar from "../../../../components/shared/StudentSideBar";

export default function QuizStudent() {
  const { id } = useParams();
  const { student } = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);
  const [data, setData] = useState();
  const [accuracy, setAccuracy] = useState();
  const fetchData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/quiz/${id}`
      );
      dispatch(HideLoading());
      if (response.data.success) {
        console.log(response.data);
        setData(response.data.data);
        setQuestions(response.data.data.quiz);
        try {
          setShuffledQuestions(
            shuffleQuestions(response.data.data.quiz.questions)
          );
          setIsLoading(false);
        } catch (error) {}
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
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
  const [index, setIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  // const handleSelectOption = (option) => {
  //   setSelectedOptions({ ...selectedOptions, [index]: option });
  // };

  const handleSelectOption = (option) => {
    // Get the current question
    setSelectedOptions({ ...selectedOptions, [index]: option });
    const currentQuestion = shuffledQuestions[index];
    // Update the selected option for the current question
    const updatedQuestion = {
      ...currentQuestion,
      selectedOption: option,
    };
    // Update the shuffledQuestions state with the updated question
    const updatedQuestions = [...shuffledQuestions];
    updatedQuestions[index] = updatedQuestion;
    setShuffledQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    let correctCount = 0;
    shuffledQuestions.forEach((question, i) => {
      if (selectedOptions[i] === question.answer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    const currentAccuracy = (correctCount / shuffledQuestions.length) * 100;
    const formattedAccuracy = Number.isInteger(currentAccuracy)
      ? currentAccuracy.toFixed(0)
      : currentAccuracy.toFixed(2);
    // setAccuracy(currentAccuracy.toFixed(2));
    setAccuracy(formattedAccuracy);
    const d = data;
    d.quiz.questions = shuffledQuestions;
    d.score = correctCount;
    d.accuracy = formattedAccuracy;
    d.attemptedAt = new Date();
    d.user = student;
    // console.log(d);
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/student/update-student`,
      {
        quiz: d,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };
  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          {questions ? (
            <div className="flex">
              {submitted && <StudentSideBar />}
              <div className="flex flex-col items-center justify-center h-[90vh] w-full">
                <p className="text-white text-xl">{data.title}</p>
                <div
                  className="rounded-xl flex items-center justify-center w-[55vw] h-[70vh]"
                  style={{
                    backgroundImage: `url(${questions?.background})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                  }}
                >
                  {submitted ? (
                    <ScoreCard
                      questions={shuffledQuestions}
                      score={score}
                      accuracy={accuracy}
                    />
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
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}
