import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");
  return token ? <div>{children}</div> : <Navigate replace to="/users/login" />;
};

export default ProtectedRoute;
