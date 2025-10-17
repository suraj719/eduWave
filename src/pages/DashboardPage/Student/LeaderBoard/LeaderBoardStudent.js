import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import StudentSideBar from "../../../../components/shared/StudentSideBar";
import { HideLoading, ShowLoading } from "../../../../redux/alerts";

export default function LeaderBoardStudent() {
  const dispatch = useDispatch();
  const { student } = useSelector((state) => state.student);
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
          // Filter students based on the same class as the logged-in student
          const filteredStudents = response.data.data.filter(
            (std) => std.class === student.class && std?.quizs?.length > 0 // Filter only students who have attempted quizzes
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
  }, [student.class]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter((std) =>
    std.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex h-[100vh]">
        <StudentSideBar />
        <div className="flex-1 mt-8 px-6 overflow-auto">
          <div className="max-w-7xl mx-auto w-full">
            <div className="bg-gray-800/60 rounded-xl p-6 shadow-xl border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white text-2xl font-bold">Leaderboard</h2>
                <div className="flex items-center bg-gray-700/70 rounded-lg p-2 px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 mr-3"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                      fill="currentColor"
                    />
                  </svg>
                  <input
                    className="bg-transparent text-white placeholder-gray-400 outline-none w-64"
                    type="search"
                    placeholder="Search student name..."
                    value={searchTerm}
                    autoComplete="off"
                    onChange={handleSearch}
                  />
                </div>
              </div>
              
              {filteredStudents.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left py-3 px-4 text-gray-300 font-semibold">Rank</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-semibold">Student</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-semibold">Roll No.</th>
                        <th className="text-center py-3 px-4 text-gray-300 font-semibold">Quizzes</th>
                        <th className="text-center py-3 px-4 text-gray-300 font-semibold">Accuracy</th>
                        <th className="text-center py-3 px-4 text-gray-300 font-semibold">Total Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((std, index) => (
                        <tr 
                          key={std._id} 
                          className={`border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors ${
                            index < 3 ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10' : ''
                          }`}
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <span className={`text-xl font-bold ${
                                index === 0 ? 'text-yellow-400' : 
                                index === 1 ? 'text-gray-300' : 
                                index === 2 ? 'text-orange-400' : 'text-gray-400'
                              }`}>
                                #{index + 1}
                              </span>
                              {index < 3 && (
                                <span className="ml-2 text-yellow-400">🏆</span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                                {std.name.charAt(0).toUpperCase()}
                              </div>
                              <span className="text-white font-medium">{std.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-300">{std.rollNumber}</td>
                          <td className="py-4 px-4 text-center">
                            <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-sm font-medium">
                              {std.quizs.length}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                              std.averageAccuracy >= 80 ? 'bg-green-500/20 text-green-300' :
                              std.averageAccuracy >= 60 ? 'bg-yellow-500/20 text-yellow-300' :
                              'bg-red-500/20 text-red-300'
                            }`}>
                              {std.averageAccuracy}%
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="text-white font-semibold">
                              {std.totalScore} / {std.quizs.reduce(
                                (totalQuestions, quiz) =>
                                  totalQuestions + quiz.quiz.questions.length,
                                0
                              )}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[40vh] w-full">
                  <div className="text-center">
                    <div className="mx-auto h-16 w-16 rounded-full bg-gray-700/60 flex items-center justify-center mb-4">
                      <span className="text-2xl">🏆</span>
                    </div>
                    <p className="text-white text-xl font-semibold">No students found</p>
                    <p className="text-gray-300 mt-2">Try adjusting your search term.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
