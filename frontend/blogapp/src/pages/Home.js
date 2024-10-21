import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    const res = await axios.get("http://localhost:8000/blogs");
    console.log(res);
    setBlogs(res?.data);
    console.log(blogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100">
      {blogs?.map((blog) => {
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
      })}
    </div>
  );
};

export default Home;
