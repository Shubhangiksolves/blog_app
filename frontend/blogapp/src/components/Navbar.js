import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg  bg-body-tertiary">
        <div class="container-fluid">
          <Link to={"/"}>
            <a class="navbar-brand">BlogApp</a>
          </Link>
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
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
