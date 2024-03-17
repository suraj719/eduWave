import React from "react";
import TeacherSideBar from "../../../../components/shared/TeacherSideBar";
import MeetIndex from "../../../VideoSDK";

export default function TeacherRoom() {
  return (
    <>
      <div className="flex">
        <TeacherSideBar />
        <div className="w-[90%] h-[90%]" style={{ scale: "0.9" }}>
          <MeetIndex />
        </div>
      </div>
    </>
  );
}
