import React, { useState } from "react";
import TableBody from "./TableBody";
import StudentSideBar from "../../../../components/shared/StudentSideBar";

export default function LeaderBoardStudent() {
  return (
    <>
      <div className="flex">
        <StudentSideBar />
        <div>
          <main className="">
            <div className="p-2 relative">
              <div className="flex justify-center items-center flex-wrap w-[90vw]"></div>
              <div className="flex items-center  my-10 bg-blue-100 rounded-full p-2 px-5 mx-auto md:w-2/6 w-full">
                <div className="icon px-3 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                      fill="#3b82f6"
                    />
                  </svg>
                </div>
                <div className="w-full">
                  <input
                    // onChange={(e) => {
                    //   searcForName(e.target.value);
                    // }}
                    className="bg-transparent text-base outline-none w-full"
                    type="search"
                    name="searchbar"
                    id="searchbar"
                    placeholder="Search Your Name Here"
                  />
                </div>
              </div>
              <div className="relative">
                <table className="mx-auto  relative">
                  <thead className="shadow-lg text-md bg-blue-500 text-gray-200 sticky top-20 z-20">
                    <tr className="text-center ">
                      <td className=" rounded-tl-lg w-20 border-r-2 border-r-gray-300">
                        Rank
                      </td>
                      <td className=" w-80 p-2 border-r-2 border-r-gray-300">
                        Name
                      </td>
                      <td className="p-2 border-r-2 border-r-gray-300">
                        No.of quizes participated
                      </td>
                      <td className="p-2 border-r-2 border-r-gray-300 max-w-[150px]">
                        Average accuracy
                      </td>
                      <td className="p-2 border-r-2 border-r-gray-300 max-w-[150px]">
                        Average score
                      </td>
                      <td className="rounded-tr-lg p-4 max-w-[150px]">
                        Total score
                      </td>
                    </tr>
                  </thead>
                  {/* <TableBody
                    Participationdata={Participationdata}
                    setParticipationdata={setParticipationdata}
                  /> */}
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
