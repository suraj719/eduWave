import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PublicRoute(props) {
  const navigate = useNavigate();
  const type = localStorage.getItem("type");
  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (type === "teacher") {
        navigate("/dashboard/teacher");
      } else if (type === "student") {
        navigate("/dashboard/student");
      }
    }
  }, []);

  return <>{props.children}</>;
}

export default PublicRoute;
