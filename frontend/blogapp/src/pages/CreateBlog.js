import React, { useState } from "react";
import axios from "axios";
import Notification from "../components/shared/Notification";
import { CONSTANTS } from "../constants/Constants";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState("");
  const [post, setPost] = useState("");
  const [image, setImage] = useState("");
  const [notification, setNotification] = useState({
    type: "",
    message: "",
  });

  const token = localStorage.getItem("token");

  const triggerNotification = (type, message) => {
    setNotification({ type, message });
  };

  const postBlog = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `http://localhost:8000${CONSTANTS.API_CONFIG.CREATE_BLOG}`,
      {
        title,
        preview,
        post,
        // image,
      },
      {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      }
    );
    setTitle("");
    setPreview("");
    setPost("");
    setImage("");
    triggerNotification(CONSTANTS.TOAST_TYPE.SUCCESS, res?.data?.message);
    return res;
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(URL.createObjectURL(img));
    }
  };

  return (
    <div className="p-3 w-100 d-flex align-items-center justify-content-center">
      <div className="w-75 d-flex flex-column align-items-center justify-content-center">
        <h3 className="mb-4 underline fw-bold">{CONSTANTS.HEADINGS.CREATE_BLOG}</h3>
        <form
          className="w-75 needs-validation"
          onSubmit={postBlog}
        >
          <div class="mb-3">
            <label for="blogtitle" class="form-label">
             {CONSTANTS.FORM_LABELS.TITLE}
            </label>
            <input
              type="text"
              class="form-control"
              id="blogtitle"
              placeholder={CONSTANTS.PLACEHOLDERS.ENTER_TITLE}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <div class="invalid-feedback"></div>
          </div>
          <div class="mb-3">
            <label for="blogpreview" class="form-label">
            {CONSTANTS.FORM_LABELS.PREVIEW}
            </label>
            <input
              type="text"
              class="form-control"
              id="blogpreview"
              placeholder={CONSTANTS.PLACEHOLDERS.ENTER_PREVIEW}
              value={preview}
              onChange={(e) => setPreview(e.target.value)}
              required
            />
          </div>
          <div class="mb-3">
            <label for="blogpost" class="form-label">
            {CONSTANTS.FORM_LABELS.POST}
            </label>
            <textarea
              class="form-control"
              id="blogpost"
              rows="10"
              placeholder={CONSTANTS.PLACEHOLDERS.ENTER_BLOG}
              value={post}
              onChange={(e) => setPost(e.target.value)}
              required
            ></textarea>
          </div>
          {/* <div className="mb-3">
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
          </div> */}
          <button type="submit" class="btn btn-primary">
            {CONSTANTS.BUTTON.POST_BLOG}
          </button>
        </form>
        <Notification
          type={notification.type}
          message={notification.message}
          autoClose={700}
        />
      </div>
    </div>
  );
};

export default CreateBlog;
