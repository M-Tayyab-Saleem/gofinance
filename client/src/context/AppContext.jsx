import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [users, setUsers] = useState([]);
    const [isloggedin, setIsloggedin] = useState(false);
    const [userData, setUserData] = useState({});

    // Fetch logged-in user data
    const getUserData = async () => {
        try {
            const { data } = await axios.get(`${backendURL}/api/user/data`);
            if (data.success) {
                setUserData(data.user);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch user data");
        }
    };

    // Fetch all users
    const getAllUserData = async () => {
        try {
            const { data } = await axios.get(`${backendURL}/api/user/all-data`);
            if (data) {
                setUsers(data);
            } else {
                toast.error("No users found");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch users");
        }
    };


    // Fetch data on mount
    useEffect(() => {
        getAllUserData();
    }, [users]);

    const value = {
        backendURL,
        isloggedin,
        setIsloggedin,
        userData,
        setUserData,
        getUserData,
        getAllUserData,
        users,
        setUsers,
    };

    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};
