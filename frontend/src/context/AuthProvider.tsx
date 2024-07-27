import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api";
import type { User } from "@/types/user";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface AuthProviderProps {
    children?: React.ReactNode;
}

interface LoginProps {
    username: string;
    password: string;
}

interface SignUpProps {
    email: string;
    username: string;
    password: string;
}

const AuthContext = React.createContext<{
    user: User | null;
    token: string | null;
    login: (data: LoginProps) => Promise<void>;
    signup: (data: SignUpProps) => Promise<void>;
    logout: () => Promise<void>;
}>({
    user: null,
    token: null,
    login: async () => { },
    signup: async () => { },
    logout: async () => { },
});

const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const navigate = useNavigate();

    // handle user login
    const login = async (data: LoginProps) => {
        setIsLoading(true);

        try {
            const res = await api.login(data);
            // const { data } = res;
            setUser(res.data.user);
            setToken(res.data.accessToken);

            localStorage.set("user", res.data.user);
            localStorage.set("token", res.data.accessToken);

            navigate("/chat");
        } catch (err) {
            // toast
            console.error(err);
        } finally {
            // toast
            setIsLoading(false);
        }
    }

    // handle user registration
    const signup = async (data: SignUpProps) => {
        setIsLoading(true);

        try {
            await api.signup(data);
            navigate("/login");
        } catch (err) {
            // toast
            console.error(err);
        } finally {
            // toast
            setIsLoading(false);
        }
    }

    // Function to handle user logout
    const logout = async () => {
        setIsLoading(true);
        try {
            await api.logout(),

                setUser(null);
            setToken(null);

            localStorage.clear();
            navigate("/login");
        } catch (err) {
            // toast
            console.error(err);
        } finally {
            // toast
            setIsLoading(false);
        }
    };

    // Check for saved user and token in local storage
    useEffect(() => {
        setIsLoading(true);
        const _token = localStorage.get("token");
        const _user = localStorage.get("user");
        if (_token && _user?._id) {
            setUser(_user);
            setToken(_token);
        }
        setIsLoading(false);
    }, []);

    // Provide auth data through the context
    return (
        <AuthContext.Provider value={{ user, login, signup, logout, token }}>
            {isLoading ? <LoadingSpinner /> : children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider, useAuth };
