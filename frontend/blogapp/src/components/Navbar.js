import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CONSTANTS } from "../constants/Constants";
import {jwtDecode} from 'jwt-decode';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate(CONSTANTS.ROUTES.LOGIN);
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg  bg-body-tertiary">
        <div class="container-fluid">
          <Link to={"/"}>
            <a class="navbar-brand">{CONSTANTS.LOGO}</a>
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          {isLoggedIn ? (
            <div className="navbar-collapse collapse" id="navbarNavAltMarkup">
              <ul class="navbar-nav ms-auto">
                {isAdmin &&
                 <Link to={CONSTANTS.ROUTES.ADMIN_DASHBOARD}>
                 <li class="nav-item me-3">
                   <a class="btn btn-secondary" aria-current="page">
                     {CONSTANTS.BUTTON.ADMIN_DASHBOARD}
                   </a>
                 </li>
               </Link>
                }
                <Link to={CONSTANTS.ROUTES.CREATE_BLOG}>
                  <li class="nav-item me-3">
                    <a class="btn btn-secondary" aria-current="page">
                      {CONSTANTS.BUTTON.CREATE_BLOG}
                    </a>
                  </li>
                </Link>
                <li className="nav-item">
                  <button
                    className="btn btn-secondary"
                    onClick={handleLogout}
                    style={{ cursor: "pointer" }}
                  >
                    {CONSTANTS.BUTTON.LOGOUT}
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="navbar-collapse collapse " id="navbarNavAltMarkup">
              <ul class="navbar-nav ms-auto">
                <Link to={CONSTANTS.ROUTES.LOGIN}>
                  <li className="nav-item me-2">
                    <button className=" btn btn-secondary">
                      {CONSTANTS.BUTTON.LOGIN}
                    </button>
                  </li>
                </Link>
                <Link to={CONSTANTS.ROUTES.SIGNUP}>
                  <li className="nav-item">
                    <button className="btn btn-secondary">
                      {CONSTANTS.BUTTON.SIGNIN}
                    </button>
                  </li>
                </Link>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
