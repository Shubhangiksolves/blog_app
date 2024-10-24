import { Routes, Route } from "react-router-dom";
import './assets/css/index.js';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { CONSTANTS } from "./constants/Constants";
import Dashboard from "./pages/Dashboard.js";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path={CONSTANTS.ROUTES.HOME} element={<Home />} />
        <Route path={CONSTANTS.ROUTES.SIGNUP} element={<Signup/>}/>
        <Route path={CONSTANTS.ROUTES.LOGIN} element={<Login/>}/>
        <Route path={CONSTANTS.ROUTES.CREATE_BLOG} element={<CreateBlog />} />
        <Route path={CONSTANTS.ROUTES.ADMIN_DASHBOARD} element={<Dashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
