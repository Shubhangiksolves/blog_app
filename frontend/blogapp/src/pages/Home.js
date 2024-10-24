import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import { CONSTANTS } from "../constants/Constants";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      setTimeout(async () => {
        const res = await axios.get(`http://localhost:8000${CONSTANTS.API_CONFIG.GET_BLOG}`);
        setIsLoading(false);
        setBlogs(res?.data);
      }, 1000);
    } catch (error) {
      console.error(error);
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
      <h3 className="mb-4 mt-2 underline fw-bold">{CONSTANTS.HEADINGS.BLOGS}</h3>
      <Loader loading={isLoading} />
      {blogs.length && !isLoading ? (
        blogs?.map((blog) => {
          return (
            <div
              style={{ maxWidth: "50%" }}
              id={blog._id}
              className="w-50 p-2 d-flex mb-2 flex-column align-items-center justify-content-center bg-primary-subtle rounded-pill"
            >
              <h5>{blog.title}</h5>
              <p title={blog.preview} className="text-truncate">
                {blog.preview}
              </p>
            </div>
          );
        })
      ) : (
        <div className="d-flex flex-column gap-2">
          <p>{CONSTANTS.TEXT.NO_BLOGS}</p>
          <button
            onClick={() => {
              isLoggedIn ? navigate(CONSTANTS.ROUTES.CREATE_BLOG) : navigate(CONSTANTS.ROUTES.LOGIN);
            }}
            className="btn btn-secondary"
          >
            {CONSTANTS.BUTTON.CREATE_BLOG}
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;