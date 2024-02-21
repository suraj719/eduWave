import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

export default function Navbar() {
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setIsLoading] = useState(false);

  return (
    <>
      <div className="py-5 flex items-center justify-between p-3 bg-gray-800">
        <Link to="/">
          <div className="flex items-center text-white">
            {/* <img src="/innerserenity.png" style={{ width: "12rem" }} /> */}
            <p>EduWave</p>
          </div>
        </Link>

        <div className="mx-0 lg:mx-5">
          {loading ? (
            <>
              <div className=" text-black font-bold rounded-full w-40">
                <div className="flex justify-center items-center">
                  <Oval
                    height={40}
                    width={40}
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#4fa94d"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="text-white">
              {isSignedIn ? (
                <div>
                  <p>Log out</p>
                </div>
              ) : (
                <Link to="/auth">
                  <p>Login</p>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
