import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:8000/check-auth", { withCredentials: true });
  //       setIsAuthenticated(true);
  //     } catch (error) {
  //       setIsAuthenticated(false);
  //     }
  //   };
  //   checkAuth();
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg  bg-body-tertiary">
        <div class="container-fluid">
          <Link to={"/"}>
            <a class="navbar-brand">BlogApp</a>
          </Link>
          {isLoggedIn ? (
            <div className="" id="navbarNavDropdown">
              <ul class="navbar-nav">
                <Link to={"/createblog"}>
                  <li class="nav-item">
                    <a class="nav-link " aria-current="page" href="#">
                      Create a Blog
                    </a>
                  </li>
                </Link>
                <Link>
                  <li class="nav-item">
                    <a class="nav-link " aria-current="page" href="#">
                      Features
                    </a>
                  </li>
                </Link>
                <Link>
                  <li class="nav-item">
                    <a class="nav-link " aria-current="page" href="#">
                      Contact Us
                    </a>
                  </li>
                </Link>
                <li className="nav-item">
                  <button
                    className="nav-link"
                    onClick={handleLogout}
                    style={{ cursor: "pointer" }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="" id="navbarNavDropdown">
              <Link to={"/login"}>
                <li className="nav-item">
                  <button className="nav-link">Login</button>
                </li>
              </Link>
              <Link to={"/signup"}>
                <li className="nav-item">
                  <button className="nav-link">Signup</button>
                </li>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
