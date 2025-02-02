import { createContext } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';


export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [users, setUsers] = useState([""])
    const [isloggedin, setIsloggedin] = useState(false);
    const [userData, setUserData] = useState({});   

    const getUserData = async () => {
        try {
            const { data } = await axios.get(`${backendURL}/api/user/data`);
            data.success ? setUserData(data.userData) : toast.error(data.message); 
        } catch (error) {
            toast.error(data.message || error.message); 
        }
    }

    const getAllUserData = async (req,res) =>{
        try {
            const { data } = await axios.get(`${backendURL}/api/user/all-data`);
            if(!data){
                toast.error(data.message); 
            }
             setUsers(data);
        } catch (error) {
            toast.error(data.message || error.message); 
        }
    }

    const value = {
        backendURL,
        isloggedin,
        setIsloggedin,
        userData, 
        setUserData,
        getUserData,
        getAllUserData,
        users,
        setUsers
    };
    return (
        <AppContext.Provider value={value}>
        {props.children}
        </AppContext.Provider>
    );
}