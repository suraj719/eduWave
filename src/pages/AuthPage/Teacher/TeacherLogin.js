import React, { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

export default function TeacherLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setMail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/teacher/login`,
        {
          email: email,
          password: password,
        }
      );
      setIsLoading(false);
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/dashboard/teacher");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="bg-black w-full h-full">
        <div className="flex flex-col items-center h-[90vh] justify-center">
          <div className="bg-gray-800 px-5 py-10 rounded-xl w-[25rem]">
            <form className="flex flex-col items-center" onSubmit={handleLogin}>
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
                      Login
                    </button>
                  </>
                ) : (
                  <>
                    <button className="w-full border text-4xl font-halloween border-white text-xl hover:bg-gray-600 text-white px-10 py-3 mt-8">
                      Login
                    </button>
                  </>
                )}
              </div>
            </form>
            <div className="text-white font-halloween text-2xl text-center mt-4">
              <Link to="/auth/teacher/register">
                <p>
                  Don't have an account ?
                  <span className="text-red-300 font-bold cursor-pointer">
                    Register
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
