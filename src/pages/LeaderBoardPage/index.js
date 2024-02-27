import React, { useState } from "react";
import TableBody from "./TableBody";

export default function LeaderBoardPage() {
  const data = [
    {
      "Student Name": "Sarvesh kumar",
      "Student Email": "sarveshkumar32717@gmail.com",
      Institution: "Poornima University - Jaipur",
      "Enrolment Date & Time": "Sun Sep 24 2023 17:34:18 GMT+0530 (GMT+05:30)",
      "Enrolment Status": "All Good",
      "Google Cloud Skills Boost Profile URL":
        "https://www.cloudskillsboost.google/public_profiles/14959d1f-1793-4dee-b2c4-9e5bcc18daa2",
      "# of Courses Completed": "4",
      "# of Skill Badges Completed": "4",
      "# of GenAI Game Completed": "1",
      "Total Completions of both Pathways": "Yes",
      "Redemption Status": "Yes",
    },
    {
      "Student Name": "ADISH SHARMA",
      "Student Email": "adishsharma41@gmail.com",
      Institution: "Poornima University - Jaipur",
      "Enrolment Date & Time": "Tue Sep 26 2023 20:17:45 GMT+0530 (GMT+05:30)",
      "Enrolment Status": "All Good",
      "Google Cloud Skills Boost Profile URL":
        "https://www.cloudskillsboost.google/public_profiles/e8d83246-461a-4627-8eec-55154ce9be1e",
      "# of Courses Completed": "4",
      "# of Skill Badges Completed": "4",
      "# of GenAI Game Completed": "1",
      "Total Completions of both Pathways": "Yes",
      "Redemption Status": "Yes",
    },
  ];
  const [Participationdata, setParticipationdata] = useState([...data]);
  const [EligibleforSwags, setEligibleforSwags] = useState(0);
  const [searchname, setSearchName] = useState("");
  const searcForName = (name) => {
    const newArr = [];
    for (let i = 0; i < data.length; i++) {
      let participant = data[i]["Student Name"].toLowerCase();
      let match = participant.includes(name.toLowerCase());
      if (match) newArr.push(data[i]);
    }
    // console.log(newArr);
    setParticipationdata(newArr);
  };
  return (
    <>
      <div>
        <main className="pt-24">
          <div className="p-2 relative">
            <div className="flex justify-center items-center flex-wrap"></div>
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
                  onChange={(e) => {
                    searcForName(e.target.value);
                  }}
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
                    <td className=" rounded-tl-lg  w-80 p-2 border-r-2 border-r-gray-300">
                      Name
                    </td>
                    <td className="p-2 border-r-2 border-r-gray-300">
                      Redemption Status
                    </td>
                    <td className="p-2 border-r-2 border-r-gray-300 max-w-[150px]">
                      Completion of both Pathways
                    </td>
                    <td className="hidden md:table-cell p-2 border-r-2 border-r-gray-300 max-w-[150px]">
                      No.of Courses Completed
                    </td>
                    <td className="hidden md:table-cell p-2 border-r-2 border-r-gray-300 max-w-[150px]">
                      No.of Skill Badges Completed
                    </td>
                    <td className="hidden md:table-cell rounded-tr-lg p-4 max-w-[150px]">
                      GenAI Game Completed
                    </td>
                  </tr>
                </thead>
                <TableBody
                  Participationdata={Participationdata}
                  setParticipationdata={setParticipationdata}
                />
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
