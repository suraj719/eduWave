import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentSideBar from "../../../components/shared/StudentSideBar";
import axios from "axios";
import { HideLoading, ShowLoading } from "../../../redux/alerts";
import toast from "react-hot-toast";

export default function StudentDashboard() {
  const dispatch = useDispatch();
  const { student } = useSelector((state) => state.student);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [quote, setQuote] = useState();
  const getQuote = async () => {
    try {
      const response = await axios.get(
        "https://api.api-ninjas.com/v1/quotes?category=success",
        {
          headers: {
            "X-Api-Key": `R509+72S2aqIVQc6ITpB/A==GwRl6NVj8PGHSkCr`,
          },
        }
      );
      if (response) {
        setQuote(response?.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getQuote();
    toast.loading("NOTE: press f to enter full screen");
    toast.loading("you cannot use the app until you are in full screen mode");
    const timeoutId = setTimeout(() => {
      toast.dismiss();
    }, 2000);

    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);
  useEffect(() => {
    setTasks(student?.tasks);
  }, [student?.tasks]);

  const generateUniqueId = () => {
    // Generate a random alphanumeric ID
    return Math.random().toString(36).substr(2, 9);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      dispatch(ShowLoading());

      // Create a new task object with unique ID and default isCompleted value
      const task = {
        id: generateUniqueId(),
        text: newTask,
        isCompleted: false,
      };
      let updatedTasks = null;
      if (tasks) {
        updatedTasks = [...tasks, task];
      } else {
        updatedTasks = [task];
      }
      // Make a POST request to update the tasks for the student
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/student/update-task`,
        {
          studentID: student._id,
          tasks: updatedTasks,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update the student state with the response data
      if (response) {
        setTasks(response.data.data.tasks);
      }

      // Clear the new task input field
      setNewTask("");
    } catch (error) {
      dispatch(HideLoading());
      console.error("Error adding task:", error);
    }
    dispatch(HideLoading());
  };

  const removeTask = async (taskId) => {
    try {
      dispatch(ShowLoading());

      // Filter out the task with the specified ID
      const updatedTasks = tasks.filter((task) => task.id !== taskId);

      // Make a POST request to update the tasks for the student
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/student/update-task`,
        {
          studentID: student._id,
          tasks: updatedTasks,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update the student state with the response data
      if (response) {
        setTasks(updatedTasks);
      }
    } catch (error) {
      dispatch(HideLoading());
      console.error("Error removing task:", error);
    }
    dispatch(HideLoading());
  };

  const completeTask = async (taskId) => {
    try {
      dispatch(ShowLoading());

      // Map over the tasks array and update the isCompleted value for the task with the specified ID
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: true } : task
      );

      // Make a POST request to update the tasks for the student
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/student/update-task`,
        {
          studentID: student._id,
          tasks: updatedTasks,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update the student state with the response data
      if (response) {
        setTasks(updatedTasks);
      }
    } catch (error) {
      dispatch(HideLoading());
      console.error("Error marking task as completed:", error);
    }
    dispatch(HideLoading());
  };

  return (
    <>
      <div className="flex h-[100vh]">
        <StudentSideBar />
        <div>
          <p className="text-white text-xl p-8">{quote?.quote}</p>
          <div className="flex items-center justify-center w-[80vw]">
            <div className="max-w-md mx-auto">
              <form className="flex items-center mb-4" onSubmit={handleAddTask}>
                <input
                  type="text"
                  className="rounded-md text-2xl font-bold outline-none p-2 w-full mr-2"
                  placeholder="Enter new task"
                  value={newTask}
                  required
                  onChange={(e) => setNewTask(e.target.value)}
                />
                <button className="w-1/2 border text-4xl font-halloween border-white text-xl hover:bg-gray-600 text-white px-10 py-3 rounded-lg">
                  Add Task
                </button>
              </form>
              {tasks && tasks.length > 0 ? (
                <div className="mb-10 pb-10">
                  <ul
                    className="mb-10"
                    style={{
                      maxHeight: "65vh",
                      overflowY: "auto",
                    }}
                  >
                    {tasks?.map((task) => (
                      <li
                        key={task.id}
                        className={`flex justify-between items-center py-2 text-white bg-gray-700 mt-2 rounded-lg p-2 hover:bg-gray-600 ${
                          task.isCompleted ? "line-through" : ""
                        }`}
                      >
                        <p>{task.text}</p>
                        <div>
                          <button
                            className="ml-2 text-red-500 hover:text-red-600"
                            onClick={() => removeTask(task.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </button>
                          {!task.isCompleted && (
                            <button
                              className="ml-2 text-green-500 hover:text-green-600"
                              onClick={() => completeTask(task.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <>
                  <p className="text-white text-center text-xl">
                    There are no tasks to complete ✨
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
