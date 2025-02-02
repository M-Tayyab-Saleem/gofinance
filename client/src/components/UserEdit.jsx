import React from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { useNavigate, useParams } from "react-router-dom";



const UserEdit = () => {
  const { users, backendURL } = useContext(AppContext);
  const { id } = useParams();
  const user = users.filter((user)=> user._id == id)
  const navigate = useNavigate()
  

  const [formData, setFormData] = useState({
    name: user[0].name,
    email: user[0].email
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(`${backendURL}/api/user/edit/${id}`, formData);
      toast.success(data.message);
      navigate('/')
    } catch (error) {
      toast.error(data?.message);
    }
  };

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
              placeholder="Eamil id"
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
