import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { HideLoading, ShowLoading } from "../../../../redux/alerts";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import StudentSideBar from "../../../../components/shared/StudentSideBar";

export default function Resources() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [fileType, setFileType] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [showStarredOnly, setShowStarredOnly] = useState(false);
  // fixed desc order; no asc/desc toggle in UI
  const { student } = useSelector((state) => state.student);
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(ShowLoading());
        const params = new URLSearchParams();
        params.set("class", student.class);
        if (subject) params.set("subject", subject);
        if (fileType) params.set("fileType", fileType);
        if (search) params.set("search", search);
        params.set("sortBy", sortBy);
        params.set("sortOrder", "desc");
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/get-resources?${params.toString()}`
        );
        dispatch(HideLoading());
        if (response.data.success) {
          const items = response.data.data;
          const filtered = showStarredOnly
            ? items.filter((r) => (r.starredBy || []).includes(student._id))
            : items;
          setData(filtered);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        toast.error(error.message);
      }
    };

    fetchData();
  }, [student.class, subject, fileType, search, sortBy, showStarredOnly]);

  const toggleStar = async (resId, isStarred) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/resources/${resId}/star`,
        { studentId: student._id, action: isStarred ? "unstar" : "star" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setData((prev) =>
          prev.map((r) => (r._id === resId ? response.data.data : r))
        );
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="flex h-[100vh]">
        <StudentSideBar />
        <div className="flex-1 mt-8 px-6 overflow-auto">
          <div className="max-w-4xl mx-auto w-full">
            <div className="bg-gray-800/60 rounded-xl p-6 shadow-xl border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white text-2xl font-bold">Resources</h2>
                <div className="flex gap-2">
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                      !showStarredOnly
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-700/70 text-gray-200 border border-gray-600"
                    }`}
                    onClick={() => setShowStarredOnly(false)}
                  >
                    All
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                      showStarredOnly
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-700/70 text-gray-200 border border-gray-600"
                    }`}
                    onClick={() => setShowStarredOnly(true)}
                  >
                    Starred ★
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  className="rounded-md text-lg font-semibold outline-none p-3 bg-gray-700/70 text-white placeholder-gray-300 md:col-span-2"
                  placeholder="search by name or description"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <input
                  className="rounded-md text-lg font-semibold outline-none p-3 bg-gray-700/70 text-white placeholder-gray-300"
                  placeholder="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <select
                  className="rounded-md text-lg font-semibold outline-none p-3 bg-gray-700/70 text-white"
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value)}
                >
                  <option value="">all types</option>
                  <option value="application">documents</option>
                  <option value="image">images</option>
                  <option value="video">videos</option>
                </select>
                <select
                  className="rounded-md text-lg font-semibold outline-none p-3 bg-gray-700/70 text-white"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="createdAt">date</option>
                  <option value="fileName">name</option>
                </select>
              </div>
            </div>

            <div className="mt-8">
              {data?.length > 0 ? (
                <ul className="w-full">
                  {data?.map((file, index) => (
                    <li
                      key={index}
                      className="bg-gray-800/60 border border-gray-700 p-4 rounded-lg text-white hover:bg-gray-700/70 mb-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-col gap-1">
                          <a
                            href={file?.fileURL}
                            target="_blank"
                            rel="noreferrer"
                            className="text-indigo-300 hover:text-indigo-200"
                          >
                            {file.fileName}
                          </a>
                          {file.description ? (
                            <span className="text-sm text-gray-300">{file.description}</span>
                          ) : null}
                          {file.tags?.length ? (
                            <div className="flex flex-wrap gap-2 mt-1">
                              {file.tags.map((t, i) => (
                                <span key={i} className="text-[10px] uppercase tracking-wide bg-gray-700/70 text-gray-200 px-2 py-1 rounded">
                                  {t}
                                </span>
                              ))}
                            </div>
                          ) : null}
                          <div className="text-xs text-gray-400">
                            {file.mimeType} {file.size ? `· ${(file.size / 1024).toFixed(1)} KB` : ""}
                          </div>
                        </div>
                        <button
                          className="text-yellow-400 text-xl"
                          onClick={() => toggleStar(file._id, (file.starredBy || []).includes(student._id))}
                          title={(file.starredBy || []).includes(student._id) ? "Unstar" : "Star"}
                        >
                          {(file.starredBy || []).includes(student._id) ? "★" : "☆"}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex items-center justify-center h-[60vh] w-full">
                  <div className="text-center">
                    <div className="mx-auto h-16 w-16 rounded-full bg-gray-700/60 flex items-center justify-center mb-4">
                      <span className="text-2xl">📄</span>
                    </div>
                    <p className="text-white text-xl font-semibold">No resources found</p>
                    <p className="text-gray-300">Try adjusting your filters or search.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
