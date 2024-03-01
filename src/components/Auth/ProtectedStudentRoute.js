import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/alerts.js";
import { SetStudent } from "../../redux/students.js";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "./DefaultLayout.js";

function ProtectedStudentRoute(props) {
  const navigate = useNavigate();
  const [readyToRednder, setReadyToRednder] = React.useState(false);
  const dispatch = useDispatch();
  const enableFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };
  const geEmployeeData = async () => {
    try {
      dispatch(ShowLoading());
      const token = localStorage.getItem("token");
      dispatch(HideLoading());
      const resposne = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/student/get-student-by-id`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resposne.data.success) {
        dispatch(SetStudent(resposne.data.data));
        setReadyToRednder(true);
      }
    } catch (error) {
      localStorage.removeItem("token");
      dispatch(HideLoading());
      navigate("/auth/student/login");
    }
  };

  useEffect(() => {
    geEmployeeData();
    // enableFullScreen();
  }, []);

  return readyToRednder && <DefaultLayout>{props.children}</DefaultLayout>;
}

export default ProtectedStudentRoute;
