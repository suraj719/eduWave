import React from "react";
import StudentSideBar from "../../../../components/shared/StudentSideBar";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
// import { v4 } from "uuid";
import { v4 } from "uuid";
import { useSelector } from "react-redux";

export default function StudentRoom() {
  const { roomID } = useParams();
  const { student } = useSelector((state) => state.student);
  async function meetingUI(element) {
    const appId = 297960104;
    const serverSecret = "f5a3dd031e959cbe6ffe15f1ea65c817";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      roomID,
      v4(),
      student.name
    );

    const ui = ZegoUIKitPrebuilt.create(kitToken);

    ui.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  }
  return (
    <>
      <div className="flex">
        <StudentSideBar />
        <div className="flex items-center justify-center w-[90vw] h-[90vh]">
          <div ref={meetingUI}></div>
        </div>
      </div>
    </>
  );
}
