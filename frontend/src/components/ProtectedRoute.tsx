import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { token, user } = useAuth();

    // redirect to /login if user is not logged in
    if (!token || !user?._id)
        return <Navigate to="/login" replace />;

    return children;
};

export default ProtectedRoute;