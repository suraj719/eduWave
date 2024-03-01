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

const AddResource = () => {
  const [data, setData] = useState([]);
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storageRef = sRef(storage, "questions/"); // Reference to the folder containing the files
        const fileList = await listAll(storageRef); // List all items (files and directories) in the folder

        // Iterate through each item and get its download URL
        const urls = await Promise.all(
          fileList.items.map(async (item) => {
            const url = await getDownloadURL(item); // Get the download URL for each item
            return { name: item.name, url };
          })
        );
        // Set the download URLs in state
        setData(urls);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleChange = (e) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const storageRef = sRef(storage, `questions/${file.name}`);
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
          });
        }
      );
    }
  };
  return (
    <>
      <div className="flex h-[100vh]">
        <TeacherSideBar />
        <div className="flex mt-8 justify-center w-[80vw]">
          <div>
            <label
              htmlFor="upload-file"
              className="border cursor-pointer text-4xl font-halloween border-white text-xl hover:bg-gray-600 text-white px-10 py-3 rounded-lg"
            >
              Upload File
            </label>
            <input
              id="upload-file"
              type="file"
              className="hidden"
              onChange={handleChange}
            />
            {data?.length > 0 ? (
              <div className="mt-4">
                <h2>Uploaded Files:</h2>
                <ul className="w-full">
                  {data.map((file, index) => (
                    <li
                      key={index}
                      className="bg-gray-700 p-2 rounded-lg text-white hover:bg-gray-600 mb-4"
                    >
                      <a href={file.url} target="_blank" rel="noreferrer">
                        {file.name}
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
