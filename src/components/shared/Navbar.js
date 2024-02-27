import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetTeacher } from "../../redux/teachers.js";
import { SetStudent } from "../../redux/students.js";
export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { teacher } = useSelector((state) => state.teacher);
  const { student } = useSelector((state) => state.student);
  return (
    <>
      <div className="py-5 flex items-center justify-between p-3 bg-gray-800">
        <Link to="/">
          <div className="flex items-center text-white">
            <p>EduWave</p>
          </div>
        </Link>

        <div className="mx-0 lg:mx-5 flex gap-4">
          <h1 className="text-white text-small">
            {teacher?.name}
            {student?.name}
          </h1>
          {localStorage.getItem("token") ? (
            <h1
              className="text-white text-small cursor-pointer underline"
              onClick={() => {
                localStorage.removeItem("token");
                dispatch(SetTeacher(null));
                dispatch(SetStudent(null));
                navigate("/");
              }}
            >
              Logout
            </h1>
          ) : (
            <h1
              className="text-white text-small cursor-pointer underline"
              onClick={() => {
                navigate("/auth");
              }}
            >
              Login
            </h1>
          )}
        </div>
      </div>
    </>
  );
}
