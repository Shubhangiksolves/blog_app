import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CONSTANTS } from "../constants/Constants";
import { jwtDecode } from "jwt-decode";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

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

  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate(CONSTANTS.ROUTES.LOGIN);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <Link to={"/"}>
              <div className="text-white flex flex-shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png"
                  className="h-12 w-12 rounded-full"
                />
              </div>
            </Link>
            <div className="hidden  items-center justify-center sm:ml-6 sm:flex">
              <div className="flex items-center justify-center space-x-4">
                {isAdmin && isLoggedIn && (
                  <Link to={CONSTANTS.ROUTES.ADMIN_DASHBOARD}>
                    <a
                      className={classNames(
                        "text-gray-100 hover:bg-slate-200 hover:text-black",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {CONSTANTS.BUTTON.ADMIN_DASHBOARD}
                    </a>
                  </Link>
                )}
                {isLoggedIn && (
                  <Link to={CONSTANTS.ROUTES.CREATE_BLOG}>
                    <a
                      className={classNames(
                        "text-gray-100 hover:bg-slate-200 hover:text-black",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {CONSTANTS.BUTTON.CREATE_BLOG}
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>
          {isLoggedIn ? (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Profile dropdown */}
              {/* <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="h-8 w-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <Link to={"/profile"}>
                      <a className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                        Your Profile
                      </a>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <a
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      {CONSTANTS.BUTTON.LOGOUT}
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu> */}
                    <a
                      onClick={handleLogout}
                      className={classNames(
                        "text-gray-100 hover:bg-slate-200 hover:text-black",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {CONSTANTS.BUTTON.LOGOUT}
                    </a>
            </div>
          ) : (
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link to={CONSTANTS.ROUTES.LOGIN}>
                  <a
                    className={classNames(
                      "text-gray-100 bg-slate-600 hover:bg-slate-200 hover:text-black",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {CONSTANTS.BUTTON.LOGIN}
                  </a>
                </Link>
                <Link to={CONSTANTS.ROUTES.SIGNUP}>
                  <a
                    className={classNames(
                      "text-gray-100 bg-slate-600 hover:bg-slate-200 hover:text-black",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {CONSTANTS.BUTTON.SIGNIN}
                  </a>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {isAdmin && isLoggedIn && (
            <Link to={CONSTANTS.ROUTES.ADMIN_DASHBOARD}>
              <DisclosureButton
                as="a"
                className={classNames(
                  "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {CONSTANTS.BUTTON.ADMIN_DASHBOARD}
              </DisclosureButton>
            </Link>
          )}
          {isLoggedIn ? (
            <Link to={CONSTANTS.ROUTES.CREATE_BLOG}>
              <DisclosureButton
                as="a"
                className={classNames(
                  "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {CONSTANTS.BUTTON.CREATE_BLOG}
              </DisclosureButton>
            </Link>
          )
         :
         <>
            <Link to={CONSTANTS.ROUTES.LOGIN}>
              <DisclosureButton
                as="a"
                className={classNames(
                  "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {CONSTANTS.BUTTON.LOGIN}
              </DisclosureButton>
            </Link>
            <Link to={CONSTANTS.ROUTES.SIGNUP}>
              <DisclosureButton
                as="a"
                className={classNames(
                  "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {CONSTANTS.BUTTON.SIGNIN}
              </DisclosureButton>
            </Link>
         </>
        }
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbar;
