import React, { useState, useEffect } from "react";
// Firebase removed: switching to backend S3 upload
import TeacherSideBar from "../../../../components/shared/TeacherSideBar";
import { toast } from "react-hot-toast";
import { HideLoading, ShowLoading } from "../../../../redux/alerts";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const AddResource = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [classR, setClassR] = useState("");
  const { teacher } = useSelector((state) => state.teacher);
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [progress, setProgress] = useState(0);
  const [subject, setSubject] = useState(teacher?.subject || "");

  useEffect(() => {
    if (!subject && teacher?.subject) {
      setSubject(teacher.subject);
    }
  }, [teacher?.subject]);
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
    if (files && files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("class", classR);
      formData.append("subject", subject || teacher?.subject || "info");
      formData.append("fileName", file.name);
      formData.append("uploadedBy", JSON.stringify(teacher));
      if (description) formData.append("description", description);
      if (tags) formData.append("tags", tags);

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/teacher/upload-resource`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (evt) => {
              if (evt.total) {
                const p = Math.round((evt.loaded * 100) / evt.total);
                setProgress(p);
              }
            },
          }
        );
        dispatch(HideLoading());
        if (response.data.success) {
          toast.success(response.data.message);
          setData([...data, response.data.data]);
          setProgress(0);
          setFiles([]);
          setDescription("");
          setTags("");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        toast.error(error.message);
      }
    } else {
      dispatch(HideLoading());
      toast.error("Please select a file");
    }
  };

  return (
    <>
      <div className="flex h-[90vh]">
        <TeacherSideBar />
        <div className="flex-1 mt-8 px-6 overflow-auto">
          <div className="max-w-3xl mx-auto w-full">
            <div className="bg-gray-800/60 rounded-xl p-6 shadow-xl border border-gray-700">
              <h2 className="text-white text-2xl font-bold mb-4">
                Upload Resource
              </h2>
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                onSubmit={handleChange}
              >
                <input
                  className="rounded-md text-lg font-semibold outline-none p-3 bg-gray-700/70 text-white placeholder-gray-300"
                  placeholder="class"
                  type="text"
                  required
                  onChange={(e) => setClassR(e.target.value)}
                />
                <input
                  className="rounded-md text-lg font-semibold outline-none p-3 bg-gray-700/70 text-white placeholder-gray-300"
                  placeholder="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <input
                  className="rounded-md text-lg font-semibold outline-none p-3 bg-gray-700/70 text-white placeholder-gray-300 md:col-span-2"
                  placeholder="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  className="rounded-md text-lg font-semibold outline-none p-3 bg-gray-700/70 text-white placeholder-gray-300 md:col-span-2"
                  placeholder="tags (comma separated)"
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
                <div className="md:col-span-2 flex items-center gap-4">
                  <label
                    htmlFor="upload-file"
                    className="border border-white/30 hover:border-white text-white px-6 py-3 rounded-lg cursor-pointer bg-gray-700/70 hover:bg-gray-600 transition"
                  >
                    Select File
                  </label>
                  <input
                    id="upload-file"
                    type="file"
                    className="hidden"
                    required
                    onChange={(e) => setFiles(e.target.files)}
                  />
                  <button className="ml-auto bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-lg font-semibold transition">
                    Upload
                  </button>
                </div>
              </form>
              {progress > 0 ? (
                <div className="mt-4">
                  <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-indigo-500 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="text-white text-sm mt-2">
                    Uploading: {progress}%
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mt-8">
              {data?.length > 0 ? (
                <div>
                  <h2 className="text-white text-2xl font-bold mb-4">
                    Uploaded Files
                  </h2>
                  <ul className="w-full">
                    {data.map((file, index) => (
                      <li
                        key={index}
                        className="bg-gray-800/60 border border-gray-700 p-4 rounded-lg text-white hover:bg-gray-700/70 mb-4"
                      >
                        <div className="flex flex-col gap-1">
                          <a
                            href={file.fileURL}
                            target="_blank"
                            rel="noreferrer"
                            className="text-indigo-300 hover:text-indigo-200"
                          >
                            {file.fileName}
                          </a>
                          {file.description ? (
                            <span className="text-sm text-gray-300">
                              {file.description}
                            </span>
                          ) : null}
                          {file.tags?.length ? (
                            <span className="text-xs text-gray-400">
                              {file.tags.join(", ")}
                            </span>
                          ) : null}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-white text-xl text-center">
                  No resources shared
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddResource;
