import React, { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setMail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      }).then((res) => {
        toast.success("registered successfully");
        navigate("/room");
        console.log(res);
        setIsLoading(false);
      });
    } catch (error) {
      toast.error("failed to register an account");
      console.error("Error:", error);
      setIsLoading(false);
    }
  };
  return (
    <form className="flex flex-col items-center" onSubmit={handleRegister}>
      <div className="font-halloween w-full">
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          className="rounded-md text-2xl font-bold outline-none p-2 w-full"
          placeholder="Username"
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
  );
}
