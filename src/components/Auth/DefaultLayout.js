import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetTeacher } from "../../redux/teachers";
import { SetStudent } from "../../redux/students";
export default function DefaultLayout(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { teacher } = useSelector((state) => state.teacher);
  const { student } = useSelector((state) => state.student);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Update current date and time every second
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 10000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const formatDate = (date) => {
    // Format date as dd/mm/yyyy
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (date) => {
    // Format time as hh:mm:ss AM/PM
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    // const seconds = date.getSeconds().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${hours}:${minutes} ${ampm}`;
  };
  return (
    <>
      <div className="py-5 flex items-center justify-between p-3 bg-gray-800">
        <Link to="/">
          <div className="flex items-center text-white">
            <p>EduWave</p>
          </div>
        </Link>
        <div className="flex gap-8 text-white">
          <h1 className="text-white text-small">
            {teacher?.name} {student?.name}
          </h1>
          <h1>{formatTime(currentDateTime)}</h1>
          <h1>{formatDate(currentDateTime)}</h1>
          <h1
            className="text-white text-small cursor-pointer underline"
            onClick={() => {
              if (teacher) {
                navigate("/dashboard/teacher");
              } else if (student) {
                navigate("/dashboard/student");
              }
            }}
          >
            Dashboard
          </h1>
          <h1
            className="text-white text-small cursor-pointer underline"
            onClick={() => {
              dispatch(SetTeacher(null));
              dispatch(SetStudent(null));
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            Logout
          </h1>
        </div>
      </div>
      <div className="content">{props.children}</div>
    </>
  );
}
