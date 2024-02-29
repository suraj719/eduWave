import React, { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../../components/shared/Navbar";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/alerts";

export default function TeacherRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setMail] = useState("");
  const [subject, setSubject] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      dispatch(ShowLoading());
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/teacher/register`,
        {
          name: name,
          email: email,
          password: password,
          subject: subject,
        }
      );
      setIsLoading(false);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/auth/teacher/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
    dispatch(HideLoading());
  };
  return (
    <>
      <div className="bg-black w-full h-[100vh]">
        <Navbar />
        <div className="flex flex-col items-center h-[90%] justify-center">
          <div className="bg-gray-800 px-5 py-10 rounded-xl w-[25rem]">
            <form
              className="flex flex-col items-center"
              onSubmit={handleRegister}
            >
              <div className="font-halloween w-full">
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-md text-2xl font-bold outline-none p-2 w-full"
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="mt-4 font-halloween w-full">
                <input
                  type="text"
                  onChange={(e) => setSubject(e.target.value)}
                  className="rounded-md text-2xl font-bold outline-none p-2 w-full"
                  placeholder="Subject"
                  required
                />
              </div>
              <div className="my-4 font-halloween w-full">
                <input
                  type="email"
                  onChange={(e) => setMail(e.target.value)}
                  className="rounded-md text-2xl font-bold outline-none p-2 w-full"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="my-  w-full">
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-md password-halloween text-2xl text-black font-bold outline-none p-2 w-full"
                  placeholder="Password"
                  required
                />
              </div>

              <div className="w-full">
                {isLoading ? (
                  <>
                    <button
                      type="submit"
                      className="cursor-wait w-full border text-4xl font-halloween border-white text-xl bg-gray-600 text-white px-10 py-3 mt-8
              "
                      disabled
                    >
                      Register
                    </button>
                  </>
                ) : (
                  <>
                    <button className="w-full border text-4xl font-halloween border-white text-xl hover:bg-gray-600 text-white px-10 py-3 mt-8">
                      Register
                    </button>
                  </>
                )}
              </div>
            </form>
            <div className="text-white font-halloween text-2xl text-center mt-4">
              <Link to="/auth/teacher/login">
                <p>
                  Already have an account ?{" "}
                  <span className="text-red-300 font-bold cursor-pointer">
                    Login
                  </span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
