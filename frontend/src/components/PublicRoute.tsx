import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { token, user } = useAuth();

    // redirect to /chat if user already logged in
    if (token && user?.id)
        return <Navigate to="/chat" replace />;

    return children;
};

export default PublicRoute;