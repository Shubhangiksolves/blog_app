const router = require("express");
const multer = require("multer");
const controller = require("../controllers/BlogController");
const authenticate = require("../middlewares/Auth");
const { CONSTANTS } = require("../constants/constant");

const route = router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "../uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });
// const upload = multer({ dest: "uploads/" });

route.get(CONSTANTS.API_CONFIG.GET_BLOGS, controller.getBlogs);
route.post(CONSTANTS.API_CONFIG.POST_BLOG, authenticate, controller.postBlogs);
// route.get("/blogs/:id", controller.getBlogById);
// route.put("/blogs/:id", controller.updateBlogById);
// route.delete("/blogs/:id", controller.deleteBlogById);

module.exports = route;
