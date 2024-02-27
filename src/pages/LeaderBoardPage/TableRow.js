import React from "react";

export default function TableRow({ participant }) {
  return (
    <tr className="text-sm border border-b-slate-200 odd:bg-white even:bg-gray-50">
      <td className="p-4 Student_Name p-3 uppercase">
        {participant["Student Name"]}
        {participant["Total Completions of both Pathways"] == "Yes" ? "🏅" : ""}
      </td>

      <td className="Redemption_Status px-2 md:px-8 relative">
        <div
          className={`w-fit rounded-3xl py-1 text-center ${
            participant["Redemption Status"] == "Yes"
              ? "bg-green-200 text-green-600"
              : "bg-yellow-200 text-yellow-600"
          }`}
        >
          {participant["Redemption Status"] == "Yes" ? "Done" : "Not Yet"}
        </div>
      </td>

      <td className="Completions_both_Pathways_relative md:px-16 px-2 text-center">
        <div
          className={` m-auto w-fit rounded-3xl py-1 text-center ${
            participant["Total Completions of both Pathways"] == "Yes"
              ? "bg-green-200 text-green-600"
              : "bg-yellow-200 text-yellow-600"
          }`}
        >
          {participant["Total Completions of both Pathways"] == "Yes"
            ? "Yes"
            : "No"}
        </div>
      </td>

      <td className="no_Courses_Completed hidden md:table-cell p-3 text-center">
        {participant["# of Courses Completed"]}
      </td>

      <td className="no_Skill_Badges_Completed hidden md:table-cell p-3 text-center">
        {participant["# of Skill Badges Completed"]}
      </td>

      <td className="GenAI_Game_Completed hidden md:table-cell p-3 text-center">
        {participant["# of GenAI Game Completed"]}
      </td>
    </tr>
  );
}
