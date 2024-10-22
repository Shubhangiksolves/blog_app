import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      setTimeout(async () => {
        const res = await axios.get("http://localhost:8000/blogs");
        setIsLoading(false);
        setBlogs(res?.data);
      }, 1000);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchBlogs();
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100">
      <h1 className="mb-4 mt-2 underline fw-bold">BLOGS</h1>
      <Loader loading={isLoading} />
      {blogs.length && !isLoading ? (
        blogs?.map((blog) => {
          return (
            <div
              style={{ maxWidth: "50%" }}
              id={blog._id}
              className="w-50 p-2 d-flex mb-2 flex-column align-items-center justify-content-center bg-primary-subtle rounded-pill"
            >
              <h1>{blog.title}</h1>
              <p title={blog.preview} className="text-truncate">
                {blog.preview}
              </p>
            </div>
          );
        })
      ) : (
        <div className="d-flex flex-column gap-2">
          <p>No Blogs to show</p>
          <button
            onClick={() => {
              isLoggedIn ? navigate("/createblog") : navigate("/login");
            }}
            className="btn btn-secondary"
          >
            Create Blog
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;