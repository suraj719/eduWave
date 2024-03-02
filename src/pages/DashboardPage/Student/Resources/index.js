import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { HideLoading, ShowLoading } from "../../../../redux/alerts";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import StudentSideBar from "../../../../components/shared/StudentSideBar";

export default function Resources() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const { student } = useSelector((state) => state.student);
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(ShowLoading());
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/get-resources`
        );
        dispatch(HideLoading());
        if (response.data.success) {
          const filteredResources = response.data.data.filter(
            (resource) => resource.class === student.class
          );
          setData(filteredResources);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        toast.error(error.message);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="flex h-[100vh]">
        <StudentSideBar />
        <div className="flex mt-8 justify-center w-[80vw]">
          <div>
            {data?.length > 0 ? (
              <div className="mt-4">
                <h2>Uploaded Files:</h2>
                <ul className="w-full">
                  {data?.map((file, index) => (
                    <li
                      key={index}
                      className="bg-gray-700 p-2 rounded-lg text-white hover:bg-gray-600 mb-4"
                    >
                      <a href={file?.fileURL} target="_blank" rel="noreferrer">
                        {file.fileName}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <>
                <p className="text-white text-xl text-center">
                  No resources shared
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
