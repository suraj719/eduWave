import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import TeacherSideBar from "../../../../components/shared/TeacherSideBar";
import { HideLoading, ShowLoading } from "../../../../redux/alerts";

export default function LeaderBoardTeacher() {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        dispatch(ShowLoading());
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/get-students`
        );
        if (response.data.success) {
          const filteredStudents = response.data.data.filter(
            (std) => std?.quizs?.length > 0 // Filter only students who have attempted quizzes
          );
          // Sort students based on total score in descending order
          filteredStudents.sort((a, b) => b.averageScore - a.averageScore);
          setStudents(filteredStudents);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        toast.error("Failed to fetch students");
      }
      dispatch(HideLoading());
    };
    fetchStudents();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter((std) =>
    std.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex">
        <TeacherSideBar />
        <div>
          <main className="">
            <div className="p-2 relative">
              <div className="flex justify-center items-center flex-wrap w-[90vw]"></div>
              <div className="flex items-center my-10 bg-blue-100 rounded-full p-2 px-5 mx-auto md:w-2/6 w-full">
                <div className="icon px-3 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                      fill="#3b82f6"
                    />
                  </svg>
                </div>
                <div className="w-full">
                  <input
                    className="bg-transparent text-base outline-none w-full"
                    type="search"
                    name="searchbar"
                    id="searchbar"
                    placeholder="Search Your Name Here"
                    value={searchTerm}
                    autoComplete="off"
                    onChange={handleSearch}
                  />
                </div>
              </div>
              {filteredStudents.length > 0 ? (
                <div
                  className="relative"
                  style={{
                    maxHeight: "75vh",
                    overflowY: "auto",
                  }}
                >
                  <table className="mx-auto relative rounded-lg mb-10">
                    <thead className="shadow-lg text-md bg-blue-500 text-gray-200  z-20 border border-blue-500 rounded-lg">
                      <tr className="text-center ">
                        <td className=" rounded-tl-lg w-20 border-r-2 border-r-gray-300">
                          Rank
                        </td>
                        <td className=" w-80 p-2 border-r-2 border-r-gray-300">
                          Name
                        </td>
                        <td className="p-2 border-r-2 border-r-gray-300">
                          Class
                        </td>
                        <td className="p-2 border-r-2 border-r-gray-300">
                          No.of quizes participated
                        </td>
                        <td className="p-2 border-r-2 border-r-gray-300 max-w-[150px]">
                          Average accuracy
                        </td>
                        <td className="p-2 border-r-2 border-r-gray-300 max-w-[150px]">
                          Average score
                        </td>
                        <td className="rounded-tr-lg p-4 max-w-[150px]">
                          Total score
                        </td>
                      </tr>
                    </thead>
                    <tbody className="text-white text-xl text-center border border-gray-300">
                      {filteredStudents.map((std, index) => (
                        <tr key={std._id}>
                          <td className="border w-20 border-gray-300">
                            {index + 1}
                            {index < 5 && (
                              <span className="text-red-500">*</span>
                            )}
                          </td>
                          <td className="border w-80 border-gray-300">
                            {std.name}
                          </td>
                          <td className="border border-gray-300">
                            {std.class}
                          </td>
                          <td className="border border-gray-300">
                            {std.quizs.length}
                          </td>
                          <td className="border border-gray-300 max-w-[150px]">
                            {std?.averageAccuracy}%
                          </td>
                          <td className="border border-gray-300 max-w-[150px]">
                            {std?.averageScore}
                          </td>
                          <td className="border border-gray-300 max-w-[150px]">
                            {std?.totalScore} /{" "}
                            {std.quizs.reduce(
                              (totalQuestions, quiz) =>
                                totalQuestions + quiz.quiz.questions.length,
                              0
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center text-white mt-4">
                  No students found
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
