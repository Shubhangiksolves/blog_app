const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  preview: String,
  post: String,
  image: { data: Buffer, contentType: String }, // Field for storing image data
  createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
