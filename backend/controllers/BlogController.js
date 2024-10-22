const knex = require("../db/knex");

const getBlogs = async (req, res) => {
  const blogs = await knex.select().from("blogs");
  res.status(201).json(blogs);
};

const postBlogs = async (req, res) => {
  const body = req.body;
  try{
    if (!body || !body.title || !body.preview || !body.post) {
      return res.status(400).json({ message: "All fields are required" });
    } else {
      const result = await knex("blogs").insert(body);
      return res.status(201).json({ message: "Blog created successfully" });
    }
  }
  catch (error) {
    console.error("Error creating Blog:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// const getBlogById = async (req, res) => {
//   const id = req.params.id;
//   const result = await blog.findById(id);
//   if (!result) return res.status(404).json({ message: "Blog not exists" });
//   else return res.status(201).json(result);
// };

// const updateBlogById = async (req, res) => {
//   const id = req.params.id;
//   const body = req.body;
//   await blog.findByIdAndUpdate(id, {
//     title: body.title,
//     preview: body.preview,
//     post: body.post,
//   });
//   return res.status(200).json({ message: "Blog Updated Successfully" });
// };

// const deleteBlogById = async (req, res) => {
//   const id = req.params.id;
//   await blog.findByIdAndDelete(id);
//   return res.status(200).json({ message: "Blog deleted Successfully" });
// };

module.exports = {
  getBlogs,
  postBlogs,
  // getBlogById,
  // updateBlogById,
  // deleteBlogById,
};
