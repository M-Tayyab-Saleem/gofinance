import React from "react";
import Box from "@mui/material/Box";
import { useState } from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user")

  const { backendURL, setIsloggedin, getUserData } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendURL}/api/auth/register`, {
          name,
          email,
          password,
          role
        });
        if (data.success) {
          setIsloggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendURL}/api/auth/login`, {
          email,
          password,
        });
        if (data.success) {
          setIsloggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(data.message);
    }
  };

  return (
    <div className="flex justify-between main-div">
      <div className="container w-[53%] bg-linear-to-r/increasing from-[#0571e1] to-[#021d7b] h-[100vh] flex items-center justify-center">
        <div className="text-white space-y-2">
          <h1 className="text-3xl font-bold sm-text-xs lg-text-lg">
            GoFinance
          </h1>
          <p>The most popular peer to peer lending Sea</p>
          <button className="rounded-full px-6 cursor-pointer py-2.5 bg-[#0575e6]">
            See More
          </button>
          <Box
            sx={{
              position: "absolute",
              bottom: -400,
              left: -400,
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              border: "2px solid rgba(255, 255, 255, 0.4)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -500,
              left: -200,
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              border: "2px solid rgba(255, 255, 255, 0.4)",
            }}
          />
        </div>
      </div>

      <div className="flex items-center justify-center w-[48%] flex-col">
        <div>
          <h2 className="text-3xl font-semibold text-center mb-3">
            {state === "Sign Up" ? "Create account" : "Login"}
          </h2>
          <p className="text-center mb-3 text-sm">
            {state === "Sign Up"
              ? "Create your account"
              : "Login to your account!"}
          </p>
        </div>
        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-100">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-transparent outline-none"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-100">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none"
              type="email"
              placeholder="Eamil id"
              required
            />
          </div>
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 px-5 py-2.5 rounded-full bg-gray-100">
              <label htmlFor="role" className="text-gray-400">Select Your Role:</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} id="role" className="text-gray-800">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-100">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none"
              type="password"
              placeholder="Password "
              required
            />
          </div>
          <p
            onClick={() => navigate("/reset-password")}
            className=" mb-4 text-blue-500 cursor-pointer"
          >
            Forgot Password?
          </p>
          <button className="cursor-pointer text-white w-full py-2.5 rounded-full bg-linear-to-r/increasing from-[#0571e1] to-[#013ca0] ">
            {state}
          </button>
        </form>
        {state === "Sign Up" ? (
          <p className="text-gray-400 text-center text-xs mt-4">
            Already have an account?
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 cursor-pointer hover:underline"
            >
              {" "}
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-4">
            Don't have an account?
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-400 cursor-pointer hover:underline"
            >
              {" "}
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
