import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import BlogProfile from "./pages/BlogProfile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* <Route path="/signup" element={<Signup/>}/> */}
        <Route path="/" element={<Home />} />
        <Route path="/navbar" element={<Navbar/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/createblog" element={<CreateBlog />} />
        <Route path="/blogs/:id" element={<BlogProfile />} />
      </Routes>
    </div>
  );
}

export default App;
