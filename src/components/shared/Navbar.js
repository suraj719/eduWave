import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetTeacher } from "../../redux/teachers.js";
import { SetStudent } from "../../redux/students.js";
export default function Navbar() {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { teacher } = useSelector((state) => state.teacher);
  // const { student } = useSelector((state) => state.student);
  return (
    <>
      <div className="py-5 flex items-center justify-between p-3 bg-gray-800">
        <Link to="/">
          <div className="flex items-center text-white">
            <p>EduWave</p>
          </div>
        </Link>

        <div className="mx-0 lg:mx-5 flex gap-4">
          <Link to="/auth">
            <h1 className="text-white text-small cursor-pointer underline">
              Login
            </h1>
          </Link>
        </div>
      </div>
    </>
  );
}
