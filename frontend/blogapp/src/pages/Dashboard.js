import React, { useState, useEffect } from 'react'
import { CONSTANTS } from '../constants/Constants';
import axios from "axios";

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            setTimeout(async () => {
              const res = await axios.get(`http://localhost:8000${CONSTANTS.API_CONFIG.GET_USERS}`);
              setIsLoading(false);
              console.log(res?.data);
              setUsers(res?.data);
            }, 1000);
          } catch (error) {
            console.error(error);
            setIsLoading(false);
          }
    }

    useEffect(() => {
        fetchUsers();
      }, []);

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard