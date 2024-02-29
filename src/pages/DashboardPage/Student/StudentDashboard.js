import React from "react";
import { useSelector } from "react-redux";
import StudentSideBar from "../../../components/shared/StudentSideBar";

export default function StudentDashboard() {
  const { student } = useSelector((state) => state.student);
  return (
    <>
      <div className="flex">
        <StudentSideBar />
        <div>
          <p className=" text-white text-xl p-8">Hi {student.name}</p>
        </div>
      </div>
    </>
  );
}
