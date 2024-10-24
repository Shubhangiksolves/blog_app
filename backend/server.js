const express = require("express");
require('dotenv').config();
// const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const blogRouter = require("./routes/BlogRoutes");
const userRouter = require('./routes/UserRoutes');

//connect to express

const app = express();
const PORT = process.env.PORT || 3000;

//connect to mongodb

// const dbURI =
//   "mongodb+srv://shubhi:shubhi123@cluster0.mm4tc.mongodb.net/blog-app?retryWrites=true&w=majority&appName=Cluster0";
// mongoose
//   .connect(dbURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     app.listen(PORT, () => console.log(`server started at port ${PORT}`));
//   })
//   .catch((error) => {
//     console.log("error--", error);
//   });

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/", blogRouter);
app.use('/', userRouter);

app.listen(PORT, () => console.log(`server started at port ${PORT}`))

