import React, { useState, useEffect } from "react";
import { CONSTANTS } from "../constants/Constants";
import axios from "axios";
import { InputField } from "../components/shared/InputField";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Loader from "../components/common/Loader";
import { deleteUser, searchUser } from "../components/services/services";
import { ConfirmDelPopup } from "../components/utils/utils";
import Notification from "../components/shared/Notification";
import { triggerNotification } from "../components/utils/utils";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [showDelPopup, setShowDelPopup] = useState(false);
  const [userId, setUserId] = useState(null);
  const [notification, setNotification] = useState({
    id: null,
    type: "",
    message: "",
  });

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setTimeout(async () => {
        const res = await axios.get(
          `http://localhost:8000${CONSTANTS.API_CONFIG.GET_USERS}`
        );
        setIsLoading(false);
        console.log(res?.data);
        setUsers(res?.data);
      }, 1000);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const onSearch = async (search_text) => {
    setSearchTerm(search_text);
    if (searchTerm !== "" && searchTerm.length >= 2) {
      setIsLoading(true);
      const searchResults = await searchUser(search_text);
      setIsLoading(false);
      setUsers(searchResults);
    }
  };

  const onDeleteClick = (userId) => {
    setShowDelPopup(true);
    setUserId(userId);
  };

  const onUserDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8000${CONSTANTS.API_CONFIG.DELETE_USER}/${userId}`
      );
      triggerNotification(CONSTANTS.TOAST_TYPE.SUCCESS, res?.data?.message, setNotification);
      fetchUsers();
    } catch (error) {
      console.error(error);
      triggerNotification(CONSTANTS.TOAST_TYPE.ERROR, error?.response?.data?.message, setNotification);
    }
  };

  const onEdit = (id) => {
    setIsEditPopup(true);
  };

  useEffect(() => {
    if (!searchTerm) fetchUsers();
  }, [searchTerm]);

  return (
    <div className="flex justify-center	items-start px-3 py-5 bg-slate-100 min-h-90vh">
      <Loader loading={isLoading} />
      <div className="bg-white rounded p-5 shadow-sm flex flex-col align-start justify-center h-full w-11/12 max-w-screen-lg">
        <div className="flex align-center justify-between w-full p-2">
          <h3 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Users List
          </h3>
          <InputField
            value={searchTerm}
            type="search"
            name="search_user"
            placeholder="search users by name or email"
            icon={
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="block h-6 w-6"
              />
            }
            onInputChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white border-collapse border border-slate-600">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 text-left border border-slate-300">
                  Username
                </th>
                <th className="py-2 px-4 text-left border border-slate-300">
                  Email
                </th>
                <th className="py-2 px-4 text-left border border-slate-300">
                  Role
                </th>
                <th className="py-2 px-4 text-left border border-slate-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="py-2 px-4 border border-slate-300">
                    {user.name}
                  </td>
                  <td className="py-2 px-4 border border-slate-300">
                    {user.email}
                  </td>
                  <td className="py-2 px-4 border border-slate-300 capitalize">
                    {user.role}
                  </td>
                  <td className="py-2 px-4 border border-slate-300">
                    <button
                      className="bg-emerald-600 hover:bg-emerald-400 hover:text-slate-600 text-white px-4 py-1 rounded mr-2"
                      onClick={() => onEdit(user.id)}
                    >
                      {CONSTANTS.BUTTON.EDIT}
                    </button>
                    <button
                      className="bg-rose-700 hover:bg-rose-500 hover:text-slate-600 text-white px-4 py-1 rounded"
                      onClick={() => onDeleteClick(user.id)}
                    >
                      {CONSTANTS.BUTTON.DELETE}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ConfirmDelPopup
          showDelPopup={showDelPopup}
          setShowDelPopup={setShowDelPopup}
          onDelete={onUserDelete}
        />
        {notification && (
        <Notification
          key={notification.id}
          type={notification.type}
          message={notification.message}
          autoClose={1000}
        />
      )}
      </div>
    </div>
  );
};

export default Dashboard;
