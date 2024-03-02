import React, { useState, useEffect } from "react";
import {
  ref as sRef,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
  listAll,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../../util/firebase";
import TeacherSideBar from "../../../../components/shared/TeacherSideBar";
import { toast } from "react-hot-toast";
import { HideLoading, ShowLoading } from "../../../../redux/alerts";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const AddResource = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const [classR, setClassR] = useState("");
  const { teacher } = useSelector((state) => state.teacher);
  const [files, setFiles] = useState([]);
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
            (resource) => resource.uploadedBy._id === teacher._id
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
  const handleChange = async (e) => {
    e.preventDefault();
    dispatch(ShowLoading());
    let durl = "";
    // const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const storageRef = sRef(storage, `resources/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          // setProgresspercent(progress);
          console.log(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // setImgUrl(downloadURL);
            console.log(downloadURL);
            durl = downloadURL;

            // Send request to backend after getting the URL
            sendRequestToBackend(durl);
          });
        }
      );
    }
  };

  const sendRequestToBackend = async (durl) => {
    try {
      const dat = {
        uploadedBy: teacher,
        subject: teacher?.subject || "info",
        date: new Date(),
        class: classR,
        fileURL: durl,
        fileName: files[0].name,
      };
      let response = null;
      response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/teacher/upload-resource`,
        dat,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setData([...data, dat]);
        // navigate("/dashboard/teacher/all-resource");
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
      <div className="flex h-[100vh]">
        <TeacherSideBar />
        <div className="flex mt-8 justify-center w-[80vw]">
          <div>
            <form
              className="flex items-center justify-center gap-4"
              onSubmit={handleChange}
            >
              <div>
                <input
                  className="rounded-md text-2xl font-bold outline-none p-2"
                  placeholder="class"
                  type="text"
                  required
                  onChange={(e) => setClassR(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="upload-file"
                  className="border cursor-pointer text-4xl font-halloween border-white text-xl hover:bg-gray-600 text-white px-10 py-3 rounded-lg"
                >
                  select File
                </label>
                <input
                  id="upload-file"
                  type="file"
                  className="hidden"
                  required
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>

              <button className="border cursor-pointer text-4xl font-halloween border-white text-xl hover:bg-gray-600 text-white px-10 py-3 rounded-lg">
                upload
              </button>
            </form>
            {data?.length > 0 ? (
              <div className="mt-4">
                <h2>Uploaded Files:</h2>
                <ul className="w-full">
                  {data.map((file, index) => (
                    <li
                      key={index}
                      className="bg-gray-700 p-2 rounded-lg text-white hover:bg-gray-600 mb-4"
                    >
                      <a href={file.fileURL} target="_blank" rel="noreferrer">
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
};

export default AddResource;
