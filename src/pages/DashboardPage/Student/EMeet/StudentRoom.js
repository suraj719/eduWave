import React, { lazy, Suspense } from "react";
import StudentSideBar from "../../../../components/shared/StudentSideBar";

// Lazy load VideoSDK only when needed
const MeetIndex = lazy(() => import("../../../VideoSDK"));

export default function StudentRoom() {
  return (
    <>
      <div className="flex">
        <StudentSideBar />
        <div className="w-[90%] h-[90%]" style={{ scale: "0.9" }}>
          <Suspense fallback={<div className="flex items-center justify-center h-full text-white">Loading video meeting...</div>}>
            <MeetIndex />
          </Suspense>
        </div>
      </div>
    </>
  );
}
