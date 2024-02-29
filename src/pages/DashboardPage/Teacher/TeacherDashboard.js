import React from "react";
import { useSelector } from "react-redux";
import TeacherSideBar from "../../../components/shared/TeacherSideBar";
export default function TeacherDashboard() {
  const { teacher } = useSelector((state) => state.teacher);
  return (
    <>
      <div className="flex">
        <TeacherSideBar />
        <div>
          <p className="text-white text-xl p-8">Hi {teacher.name}</p>
        </div>
      </div>
    </>
  );
}
