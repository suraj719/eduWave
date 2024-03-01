import React from "react";
import TeacherSideBar from "../../../../components/shared/TeacherSideBar";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
// import { v4 } from "uuid";
import { v4 } from "uuid";
import { useSelector } from "react-redux";

export default function TeacherRoom() {
  const { roomID } = useParams();
  const { teacher } = useSelector((state) => state.teacher);
  async function meetingUI(element) {
    const appId = 297960104;
    const serverSecret = "f5a3dd031e959cbe6ffe15f1ea65c817";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      roomID,
      v4(),
      teacher.name
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
        <TeacherSideBar />
        <div className="flex items-center justify-center w-[90vw] h-[90vh]">
          <div ref={meetingUI}></div>
        </div>
      </div>
    </>
  );
}
