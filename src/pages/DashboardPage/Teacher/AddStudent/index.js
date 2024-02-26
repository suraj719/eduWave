import React, { useState } from "react";
import TeacherSideBar from "../../../../components/shared/TeacherSideBar";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../../../redux/alerts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddStudent() {
  const [formData, setFormData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      let response = null;
      response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/teacher/add-student`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/dashboard/teacher");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="flex">
        <TeacherSideBar />
        <div className="flex justify-center items-center w-[90vw]">
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
              <label className="text-white">Student RollNumber: </label>
              <input
                className="outline-none rounded-lg px-2 py-1 w-full"
                placeholder="student roll number"
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
        </div>
      </div>
    </>
  );
}
