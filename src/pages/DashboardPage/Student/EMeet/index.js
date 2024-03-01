import React, { useState } from "react";
import { useNavigate } from "react-router";
import StudentSideBar from "../../../../components/shared/StudentSideBar";

export default function EMeetStudent() {
  const navigate = useNavigate();
  const [roomID, setRoomID] = useState("");
  return (
    <>
      <div className="flex">
        <StudentSideBar />
        <div>
          <div className="flex flex-col w-[90vw] items-center h-[90%] justify-center">
            <div className="bg-gray-800 px-5 py-10 rounded-xl w-[25rem]">
              <div className="flex flex-col items-center">
                <div className="my-4 font-halloween w-full">
                  <input
                    type="text"
                    onChange={(e) => setRoomID(e.target.value)}
                    className="rounded-md text-2xl font-bold outline-none p-2 w-full"
                    placeholder="Enter a Room ID"
                    required
                  />
                </div>
                <p className="text-white text-center">
                  * Enter a Room ID to join an existing meeting, or a new room
                  will be created
                </p>
                <div className="w-full">
                  <button
                    onClick={() =>
                      navigate(`/dashboard/student/meet/${roomID}`)
                    }
                    className="w-full border text-4xl font-halloween border-white text-xl hover:bg-gray-600 text-white px-10 py-3 mt-8"
                  >
                    Join Meet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
