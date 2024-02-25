import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/alerts.js";
import { setStudent } from "../../redux/students.js";
import { useNavigate } from "react-router-dom";

function ProtectedTeacherRoute(props) {
  const navigate = useNavigate();
  const [readyToRednder, setReadyToRednder] = React.useState(false);
  const dispatch = useDispatch();

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
      console.log(resposne);
      if (resposne.data.success) {
        console.log(resposne.data);
        dispatch(setStudent(resposne.data.data));
        console.log(resposne);
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
  }, []);

  return (
    readyToRednder && (
      <>
        <div>{props.children}</div>
      </>
    )
  );
}

export default ProtectedTeacherRoute;
