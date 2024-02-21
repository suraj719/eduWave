import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../../components/Auth/Login";
import Signup from "../../components/Auth/Signup";
// import Stars from "../components/Stars/Stars";
export default function AuthPage() {
  const [showlogin, setShowLogin] = useState(true);
  return (
    <div className="bg-black w-full h-full">
      <div className="flex flex-col items-center h-[90vh] justify-center">
        <div className="bg-gray-800 px-5 py-10 rounded-xl w-[25rem]">
          {/* <p className="my-8 text-center font-halloween text-white text-6xl">
            {showlogin ? "Login" : "Signup"}
          </p> */}
          {showlogin ? <Login /> : <Signup />}
          <div className="text-white font-halloween text-2xl text-center mt-4">
            {showlogin ? (
              <>
                <p>
                  Don't have an account ?{" "}
                  <span
                    onClick={() => setShowLogin(!showlogin)}
                    className="text-red-300 font-bold cursor-pointer"
                  >
                    Register
                  </span>
                </p>
              </>
            ) : (
              <>
                <p>
                  Already have an account ?{" "}
                  <span
                    onClick={() => setShowLogin(!showlogin)}
                    className="text-red-300 font-bold cursor-pointer"
                  >
                    Login
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
