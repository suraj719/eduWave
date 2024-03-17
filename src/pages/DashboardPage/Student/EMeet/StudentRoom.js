import React from "react";
import StudentSideBar from "../../../../components/shared/StudentSideBar";
import MeetIndex from "../../../VideoSDK";

export default function StudentRoom() {
  return (
    <>
      <div className="flex">
        <StudentSideBar />
        <div className="w-[90%] h-[90%]" style={{ scale: "0.9" }}>
          <MeetIndex />
        </div>
      </div>
    </>
  );
}
