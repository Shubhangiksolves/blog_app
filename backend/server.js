const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/BlogRoutes");

//connect to express

const app = express();
const PORT = 8000;

//connect to mongodb

const dbURI =
  "mongodb+srv://shubhi:shubhi123@cluster0.mm4tc.mongodb.net/blog-app?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`server started at port ${PORT}`));
  })
  .catch((error) => {
    console.log("error--", error);
  });

//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/", router);
