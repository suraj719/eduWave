import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import TeacherSideBar from "../../../../components/shared/TeacherSideBar";
import axios from "axios";
import { ShowLoading, HideLoading } from "../../../../redux/alerts";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Tooltip as ReactToolTip } from "react-tooltip";

export default function QuizAnalytics() {
  const { quizID } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/quiz/${quizID}`
      );
      dispatch(HideLoading());
      if (response.data.success) {
        const res = response.data.data;
        setData(res);
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
  return (
    <>
      <div className="flex gap-9">
        <TeacherSideBar />
        <div>
          {data?.quiz && (
            <div className="text-white">
              <p className="font-bold  mt-2 text-xl">Title: {data.title}</p>
              <p>Created At: {new Date(data.date).toLocaleString()}</p>
              <p>Deadline: {new Date(data.deadline).toLocaleString()}</p>
              <p>Total attempts: {data?.attempts?.length || 0}</p>
              <div
                className="flex justify-center w-[90vw]"
                style={{
                  maxHeight: "75vh",
                  maxWidth: "90vw",
                  overflow: "auto",
                }}
              >
                {data?.attempts?.length > 0 ? (
                  <>
                    <table className="table-auto w-[90%] mb-10">
                      <thead>
                        <tr>
                          <th className="px-4 py-2">Name</th>
                          <th className="px-4 py-2">Score</th>
                          <th className="px-4 py-2">Accuracy</th>
                          <th className="px-4 py-2">Attempted at</th>
                          {data?.quiz.questions.map(
                            (question, questionIndex) => (
                              <th
                                data-tooltip-id={`td-ques-${questionIndex}`}
                                key={questionIndex}
                                className="px-4 py-2"
                              >
                                {`Question ${questionIndex + 1}`}{" "}
                                <ReactToolTip
                                  id={`td-ques-${questionIndex}`}
                                  place="bottom"
                                  content={question.question_text}
                                />
                              </th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {data?.attempts?.map((attempt, attemptIndex) => (
                          <tr key={attemptIndex}>
                            <td className="border px-4 py-2">
                              {attempt.user.name}
                            </td>
                            <td className="border px-4 py-2">
                              {attempt.score}
                            </td>
                            <td className="border px-4 py-2">
                              {attempt.accuracy} %
                            </td>
                            <td className="border px-4 py-2">
                              {new Date(attempt.attemptedAt).toLocaleString()}
                            </td>

                            {data?.quiz.questions.map(
                              (question, questionIndex) => {
                                const sortedQuestion =
                                  attempt.quiz.questions.find(
                                    (q) =>
                                      q.question_text === question.question_text
                                  );
                                const selectedOption =
                                  sortedQuestion.selectedOption;
                                const correctOptionIndex =
                                  question.options.indexOf(question.answer);
                                const isCorrect =
                                  selectedOption ===
                                  question.options[correctOptionIndex];
                                const bgColor = isCorrect
                                  ? "bg-green-500"
                                  : "bg-red-500";
                                const textColor = "text-white";
                                return (
                                  <td
                                    key={questionIndex}
                                    className={`border px-4 py-2 ${bgColor} ${textColor} text-center`}
                                  >
                                    {selectedOption}
                                  </td>
                                );
                              }
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-[50vh]">
                    <p className="text-white text-center text-xl">
                      No attempts made ✨
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
