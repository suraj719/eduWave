import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../../../redux/alerts";
import StudentSideBar from "../../../../components/shared/StudentSideBar";

export default function QuizPageStudent() {
  const { student } = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/get-all-quiz`
      );
      dispatch(HideLoading());
      if (response.data.success) {
        const filteredQuizzes = response.data.data.filter(
          (quiz) => quiz.class === student.class
        );
        setData(filteredQuizzes);
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
        <StudentSideBar />
        <div className="w-full p-4">
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
                    const dt = new Date(quiz.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    });
                    return (
                      <div className="bg-gray-200 rounded-lg p-4" key={index}>
                        <p>{quiz.title}</p>
                        <p>subject: {quiz.subject}</p>
                        <p>created on: {dt}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col text-white items-center justify-center h-full">
                <p className="text-2xl">
                  There are no quizes available at this time...{" "}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
