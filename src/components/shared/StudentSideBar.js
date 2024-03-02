import { useState } from "react";
import {
  HomeIcon,
  AcademicCapIcon,
  StarIcon,
  ChartPieIcon,
  VideoCameraIcon,
  PencilIcon,
  ChatBubbleBottomCenterIcon,
  QuestionMarkCircleIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";
import { Tooltip as ReactToolTip } from "react-tooltip";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
const StudentSideBar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const Menus = [
    {
      title: "Dashboard",
      src: <HomeIcon className="h-6 w-6 text-yellow-400" />,
      url: "/dashboard/student",
    },
    // {
    //   title: "Inbox",
    //   src: <ChatBubbleBottomCenterIcon className="h-6 w-6 text-green-400" />,
    //   url: "/dashboard/student/inbox",
    // },
    {
      title: "Resources",
      src: <BookOpenIcon className="h-6 w-6 text-green-400" />,
      url: "/dashboard/student/resources",
    },
    {
      title: "Quiz ",
      src: <QuestionMarkCircleIcon className="h-6 w-6 text-gray-100" />,
      url: "/dashboard/student/quiz",
    },
    {
      title: "Draw",
      src: <PencilIcon className="h-5 w-6 text-red-300" />,
      url: "/dashboard/student/canvas",
    },
    {
      title: "EMeet",
      src: <VideoCameraIcon className="h-6 w-6 text-blue-400" />,
      url: "/dashboard/student/emeet",
    },
    {
      title: "Statistics",
      src: <ChartPieIcon className="h-6 w-6 text-green-400" />,
      url: "/dashboard/student/statistics",
    },
    {
      title: "LeaderBoard",
      src: <StarIcon className="h-6 w-6 text-yellow-400" />,
      url: "/dashboard/student/leaderboard",
    },
  ];

  return (
    <div className="">
      <div
        className={` ${
          open ? "w-70" : "w-20 "
        } bg-gray-700  rounded-lg p-5 pt-8 relative duration-300`}
      >
        <div>
          <div
            className={` cursor-pointer mx-auto top-9 w-7 border-dark-purple
            text-white  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
              />
            </svg>
          </div>
          <ul className="pt-5 flex flex-col items-start justify-evenly h-[80vh]">
            {Menus.map((Menu, index) => (
              <Link key={index} to={Menu.url}>
                <li
                  data-tooltip-id={`td-${Menu.title}`}
                  className={`rounded-lg w-full   flex items-center rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${
                    index === 0 && "bg-light-white"
                  } ${location.pathname === Menu.url ? "border" : ""} `}
                >
                  {Menu.src}
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {Menu.title}
                  </span>
                  {!open && (
                    <ReactToolTip
                      id={`td-${Menu.title}`}
                      place="right"
                      content={Menu.title}
                    />
                  )}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default StudentSideBar;
