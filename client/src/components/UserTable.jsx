import * as React  from "react";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from 'react-toastify';
import { useState } from "react";


export default function DataTable() {
  const { users, backendURL} = useContext(AppContext);
  const navigate = useNavigate();

  const edithandler = () => {};


  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Button onClick={() => navigate(`/edit/${user._id}`)}>
                  Edit
                </Button>
                <Button>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
