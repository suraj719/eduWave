import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PublicRoute(props) {
  const navigate = useNavigate();
  const { teacher } = useSelector((state) => state.teacher);
  const { student } = useSelector((state) => state.student);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (teacher) {
        navigate("/dashboard/teacher");
      } else if (student) {
        navigate("/dashboard/student");
      }
    }
  }, []);

  return <>{props.children}</>;
}

export default PublicRoute;
