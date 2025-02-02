import * as React from 'react';
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


export default function DataTable() {
     const { users } = useContext(AppContext);
     const navigate = useNavigate()

     const edithandler = ()=>{
      
     }
     
  return (
    <div className="container mx-auto p-4">
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-white">
          <tr>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Role</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b hover:bg-gray-100">
              <td className="py-3 px-6">{user.name}</td>
              <td className="py-3 px-6">{user.email}</td>
              <td className="py-3 px-6">{user.role}</td>
              <td className="py-3 px-6 flex justify-center space-x-3">
                <button className="text-blue-500 hover:text-blue-700">
                 <Link to={`/edit/${user._id}`}><Pencil size={18} /></Link>
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}
