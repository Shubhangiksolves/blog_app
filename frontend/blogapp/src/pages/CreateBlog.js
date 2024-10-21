import React, { useState } from "react";
import axios from "axios";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState("");
  const [post, setPost] = useState("");
  const [image, setImage] = useState("");

  const postBlog = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:8000/blogs",
      {
        title,
        preview,
        post,
        image,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setTitle("");
    setPreview("");
    setPost("");
    setImage("");
    alert(res?.data?.message);
    return res;
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(URL.createObjectURL(img));
    }
  };

  return (
    <div className="w-100 d-flex align-items-center justify-content-center">
      <div className="w-75 d-flex flex-column align-items-center justify-content-center">
        <h1 className="mb-4 underline">Create a Blog</h1>
        <form
          method="post"
          action="/blogs"
          className="w-75 needs-validation"
          onSubmit={postBlog}
          enctype="multipart/form-data"
        >
          <div class="mb-3">
            <label for="blogtitle" class="form-label">
              Title
            </label>
            <input
              type="text"
              class="form-control"
              id="blogtitle"
              placeholder="enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <div class="invalid-feedback">Please Enter Title.</div>
          </div>
          <div class="mb-3">
            <label for="blogpreview" class="form-label">
              Preview
            </label>
            <input
              type="text"
              class="form-control"
              id="blogpreview"
              placeholder="enter blog preview"
              value={preview}
              onChange={(e) => setPreview(e.target.value)}
              required
            />
            <div class="invalid-feedback">Please Enter Preview.</div>
          </div>
          <div class="mb-3">
            <label for="blogpost" class="form-label">
              Post
            </label>
            <textarea
              class="form-control"
              id="blogpost"
              rows="10"
              placeholder="post blog here"
              value={post}
              onChange={(e) => setPost(e.target.value)}
              required
            ></textarea>
            <div class="invalid-feedback">Please Enter Blog.</div>
          </div>
          <div className="mb-3">
            <label for="blogImage" class="form-label">
              Upload Image
            </label>
            <input
              type="file"
              class="form-control"
              name="blogImage"
              onChange={onImageChange}
              //   value={image}
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Post Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
