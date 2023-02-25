import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { loggedInUser } = useSelector(
    state => state.loginSlice.loggetInWithOTP
  );

  const navigate = useNavigate();
  if (!loggedInUser) {
    return navigate("/login");
  }
  return children;
}

export default ProtectedRoute