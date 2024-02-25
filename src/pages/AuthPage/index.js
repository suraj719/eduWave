import React from "react";
import { Link } from "react-router-dom";

export default function index() {
  return (
    <>
      <div className="flex items-center justify-center h-[90vh]">
        <div>
          {/* <p className="flex flex-col  items-center text-white font-str text-4xl">
            Are you a
          </p> */}
          <div className="mt-4 flex items-center justify-around gap-20">
            <Link to="/auth/student/login">
              <div className="flex flex-col items-center">
                <img src="../assets/student.png" />
                <p className="text-white text-3xl font-str">Student</p>
              </div>
            </Link>
            <p className="text-white text-xl font-str">OR</p>
            <Link to="/auth/teacher/login">
              <div className="flex flex-col items-center">
                <img src="../assets/teacher.png" />
                <p className="text-white text-3xl font-str">Teacher</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
