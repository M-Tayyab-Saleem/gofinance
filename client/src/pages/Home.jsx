import React, { useContext } from "react";
import UserTable from "../components/UserTable";
import SearchBar from "../components/SearchBar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { AppContext } from "../context/AppContext";

import {
  LayoutGrid,
  TestTube,
  Calendar,
  Pill,
  MessageSquare,
  CreditCard,
  Settings,
  HelpCircle,
  ChevronDown,
} from "lucide-react";



const menuItems = [
  { icon: <LayoutGrid size={25} />, text: "Dashboard" },
  { icon: <TestTube size={25} />, text: "Lab Test" },
  { icon: <Calendar size={25} />, text: "Appointment" },
  { icon: <Pill size={25} />, text: "Medicine Order" },
  { icon: <MessageSquare size={25} />, text: "Message" },
  { icon: <CreditCard size={25} />, text: "Payment" },
  { icon: <Settings size={25} />, text: "Settings" },
];

const Home = () => {

  const { userData }  = useContext(AppContext);
  
  return (
    <div className="flex min-h-screen bg-gray-50 ">
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-6">Sales.</h1>
        </div>
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center gap-3 px-3 py-2 ${
                item.text === "Dashboard" ? "text-blue-600" : "text-gray-600"
              } hover:bg-gray-50 rounded-lg transition-colors`}
            >
              {item.icon}
              <span className="text-md">{item.text}</span>
            </a>
          ))}
        </nav>
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors absolute bottom-4"
        >
          <HelpCircle size={30} />
          <span className="text-md">Help</span>
        </a>
      </div>
      <div className="px-[50px] w-full flex flex-col justify-evenly">
        <div className="flex justify-between items-center">
          <span>
            <SearchBar />
          </span> 
          <div className="flex items-center gap-4">
            <div className="px-2 py-1 bg-white border-1 border-gray-200 text-gray-400 rounded-[2px]">
              <Badge badgeContent={4} color="primary">
                <NotificationsIcon></NotificationsIcon>
              </Badge>

            </div>
            <span>
              <p className="text-gray-600">Hi {userData ? userData.name : "Developer"}</p>
            </span>
          </div>
        </div>
        <h1 className="text-2xl">User Information</h1>
        <div>
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default Home;
