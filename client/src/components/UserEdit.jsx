import React, { useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { assets } from "../assets/assets.js";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UserEdit = () => {
  const { backendURL , setUsers } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/user/data/${id}`);
      if (data.success) {
        setUser(data.user);
        setFormData({ name: data.user.name, email: data.user.email });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch user data");
    }
  };

  useEffect(() => {
    getUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${backendURL}/api/user/edit/${id}`,
        formData
      );
      const updatedUsers = users.map(user => 
        user._id === id ? { ...user, ...formData } : user
      );
      setUsers(updatedUsers);
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update user data");
    }
  };

  if (!user) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="mt-[30vh]">
      <div className="flex items-center justify-center flex-col">
        <div>
          <h2 className="text-3xl font-semibold text-center mb-3">
            Edit User Info
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-100">
            <img src={assets.person_icon} alt="" />
            <input
              onChange={handleChange}
              value={formData.name}
              className="bg-transparent outline-none"
              type="text"
              placeholder="Full Name"
              name="name"
              required
            />
          </div>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-100">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={handleChange}
              value={formData.email}
              className="bg-transparent outline-none"
              type="email"
              placeholder="Email ID"
              name="email"
              required
            />
          </div>

          <button className="cursor-pointer text-white w-full py-2.5 rounded-full bg-linear-to-r/increasing from-[#0571e1] to-[#013ca0] ">
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;
