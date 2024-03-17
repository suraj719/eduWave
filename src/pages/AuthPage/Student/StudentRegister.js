import React, { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../../components/shared/Navbar";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/alerts";

export default function StudentRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const createAccount = async (e) => {
    e.preventDefault();
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/student/register`,
        formData
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/auth/student/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(HideLoading());
  };
  return (
    <>
      <div className="bg-black w-full h-[99vh]">
        <Navbar />
        <div className="flex flex-col items-center h-[90%] justify-center">
          <div className="bg-gray-800 px-5 py-10 rounded-xl w-[50rem]">
            <form
              method="POST"
              onSubmit={createAccount}
              className="grid grid-cols-2 gap-8"
            >
              <div>
                <label className="text-white">Student Name:</label>
                <input
                  className="outline-none rounded-lg px-2 py-1 w-full"
                  placeholder="full name of the student"
                  type="text"
                  name="name"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="text-white">Account username: </label>
                <input
                  className="outline-none rounded-lg px-2 py-1 w-full"
                  placeholder="Account username"
                  type="text"
                  name="rollNumber"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="text-white">Student Email:</label>
                <input
                  className="outline-none rounded-lg px-2 py-1 w-full"
                  placeholder="student email address"
                  type="email"
                  name="email"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="text-white">Class: </label>
                <input
                  className="outline-none rounded-lg px-2 py-1 w-full"
                  placeholder="student class"
                  type="text"
                  name="class"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="text-white">Parent Name: </label>
                <input
                  className="outline-none rounded-lg px-2 py-1 w-full"
                  placeholder="parent name"
                  type="text"
                  name="parentName"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="text-white">Parent Email: </label>
                <input
                  className="outline-none rounded-lg px-2 py-1 w-full"
                  placeholder="parent email address"
                  type="email"
                  name="parentEmail"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="text-white">Account password: </label>
                <input
                  className="outline-none rounded-lg px-2 py-1 w-full"
                  placeholder="account password"
                  type="password"
                  name="password"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <button
                  className="w-full border text-4xl font-halloween border-white text-xl hover:bg-gray-600 text-white px-10 py-2 mt-4"
                  type="submit"
                >
                  create account
                </button>
              </div>
            </form>
            <div className="text-white font-halloween text-2xl text-center mt-4">
              <Link to="/auth/student/login">
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
