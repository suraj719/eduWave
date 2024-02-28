import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../../../redux/alerts";
import StudentSideBar from "../../../../components/shared/StudentSideBar";
import { Link } from "react-router-dom";
import AttemptedQuiz from "./AttemptedQuiz";

export default function QuizPageStudent() {
  const { student } = useSelector((state) => state.student);
  const [opened, setOpened] = useState(false);
  const [previewQuestions, setPreviewQuestions] = useState([]);
  const [quizType, setQuizType] = useState("online");
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [studentData, setStudentData] = useState();
  const [onlineQuizes, setOnlineQuizes] = useState();
  const [attemptedQuizes, setAttemptedQuizes] = useState();
  const fetchData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/get-all-quiz`
      );
      if (response.data.success) {
        const filteredQuizzes = response.data.data.filter(
          (quiz) =>
            quiz.class === student.class &&
            new Date(quiz.deadline) > new Date() &&
            !quiz?.attempts?.some(
              (attempt) => attempt?.user._id === student?._id
            )
        );
        setData(filteredQuizzes);
        setTempData(response.data.data);
        setOnlineQuizes(filteredQuizzes);
      } else {
        toast.error(response.data.message);
      }

      const studentResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/student/get-student-by-id`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (studentResponse) {
        setStudentData(studentResponse.data.data);
        setAttemptedQuizes(studentResponse.data.data?.quizs);
      } else {
        toast.error("something went wrong!!");
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
    dispatch(HideLoading());
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleQuizType = (qtype) => {
    if (qtype === "online") {
      setData(onlineQuizes);
      setQuizType("online");
      // const filteredQuizzes = tempData.filter(
      //   (quiz) =>
      //     quiz.class === student.class &&
      //     new Date(quiz.deadline) > new Date() &&
      //     !quiz?.attempts?.some((attempt) => attempt.userID === student._id)
      // );
      // setData(filteredQuizzes);
    } else if (qtype === "attempted") {
      setQuizType("attempted");
      setData(attemptedQuizes);
      // const filteredQuizzes = tempData.filter(
      //   (quiz) => quiz.isAttempted === true
      // );
      // setData(filteredQuizzes);
    }
  };
  return (
    <>
      <div className="flex gap-9 quiz-db-st">
        <StudentSideBar />
        <div className="w-full p-4">
          <div className="bg-gray-200 rounded-lg p-2 text-gray-800  flex gap-8 justify-evenly text-xl mb-4">
            <div
              className={
                quizType === "online"
                  ? "bg-gray-700 py-2 w-[50%] text-center rounded-lg text-white"
                  : "hover:bg-gray-600 py-2 w-[50%] text-center rounded-lg hover:text-white"
              }
            >
              <button
                className="w-full"
                onClick={() => handleQuizType("online")}
              >
                Online
              </button>
            </div>
            <div
              className={
                quizType === "attempted"
                  ? "bg-gray-700 py-2 w-[50%] text-center rounded-lg text-white"
                  : "hover:bg-gray-600 py-2 w-[50%] text-center rounded-lg hover:text-white"
              }
            >
              <button
                className="w-full"
                onClick={() => handleQuizType("attempted")}
              >
                Attempted
              </button>
            </div>
          </div>
          {data?.length > 0 ? (
            <>
              <div>
                <div
                  className="flex flex-wrap gap-4 mt-2 overflow-auto"
                  style={{
                    maxHeight: "75vh",
                    overflowY: "auto",
                  }}
                >
                  {data?.map((quiz, index) => {
                    const fdc = new Date(quiz.date).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    );
                    const fdd = new Date(quiz.deadline).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    );
                    const ftd = new Date(quiz.deadline).toLocaleTimeString(
                      undefined,
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }
                    );
                    return (
                      <div
                        className="bg-gray-200 rounded-lg p-4 flex items-start gap-1 flex-col min-w-[20rem]"
                        key={index}
                      >
                        <p className="font-bold text-xl">{quiz.title}</p>
                        <p>
                          <span className="font-bold text-xl">subject:</span>{" "}
                          {quiz.subject}
                        </p>
                        {quizType === "online" ? (
                          <>
                            <p>
                              <span className="font-bold text-xl">
                                created on:
                              </span>{" "}
                              {fdc}
                            </p>
                            <p>
                              <span className="font-bold text-xl">
                                deadline:
                              </span>{" "}
                              {fdd} {"--"}
                              {ftd}
                            </p>
                          </>
                        ) : (
                          <>
                            <p>
                              <span className="font-bold text-xl">
                                attempted on:
                              </span>{" "}
                              {new Date(quiz?.attemptedAt).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                              {"--"}
                              {new Date(quiz?.attemptedAt).toLocaleTimeString(
                                undefined,
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              )}
                            </p>
                            <p>
                              <span className="font-bold text-xl">score</span>:{" "}
                              {quiz.score}
                            </p>
                            <p>
                              <span className="font-bold text-xl">
                                accuracy
                              </span>
                              : {quiz.accuracy}%
                            </p>
                          </>
                        )}
                        <div className="flex items-center justify-between w-full">
                          <p>
                            <span className="font-bold text-xl">
                              No.of ques
                            </span>
                            : {quiz.quiz.questions.length}
                          </p>
                          {quizType === "online" && (
                            <Link to={`/quiz/student/${quiz._id}`}>
                              <button className="bg-gray-900 text-white px-4 p-2 rounded-lg hover:bg-gray-700 ">
                                Start quiz
                              </button>
                            </Link>
                          )}
                          {quizType === "attempted" && (
                            <button
                              onClick={() => {
                                setPreviewQuestions(quiz.quiz);
                                setOpened(true);
                              }}
                              className="bg-gray-900 text-white px-4 p-2 rounded-lg hover:bg-gray-700 "
                            >
                              view
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col text-white items-center justify-center h-[70vh]">
                <p className="text-2xl">There are no quizes available...</p>
              </div>
            </>
          )}
        </div>
      </div>
      {opened && (
        <AttemptedQuiz
          questions={previewQuestions}
          handleClose={() => setOpened(false)}
          opened={opened}
        />
      )}
    </>
  );
}
