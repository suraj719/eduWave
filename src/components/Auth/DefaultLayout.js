import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetTeacher } from "../../redux/teachers";
import { SetStudent } from "../../redux/students";
export default function DefaultLayout(props) {
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
        <div className="flex gap-8">
          <h1 className="text-white text-small">
            {teacher?.name} {student?.name}
          </h1>
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
