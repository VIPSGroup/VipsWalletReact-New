import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
console.log(loggedInUser);
useEffect(() => {
  if (!loggedInUser) {
    return navigate("/login");
  }
}, [loggedInUser])

  const navigate = useNavigate();
  return children;
};
export default ProtectedRoute;
