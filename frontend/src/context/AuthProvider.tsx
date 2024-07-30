import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api";
import type { User } from "@/types/user";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { LocalStorage } from "@/lib/utils";
import { GoogleOAuthProvider } from '@react-oauth/google';

interface AuthProviderProps {
    children?: React.ReactNode;
}

interface LoginProps {
    email: string;
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
    googleLogin: (code: string) => Promise<void>;
    googleSignup: (code: string) => Promise<void>;
    signup: (data: SignUpProps) => Promise<void>;
    logout: () => Promise<void>;
}>({
    user: null,
    token: null,
    login: async () => { },
    googleLogin: async () => { },
    googleSignup: async () => { },
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

            LocalStorage.set("user", res.data.user);
            LocalStorage.set("token", res.data.accessToken);

            navigate("/chat");
        } catch (err) {
            // toast
            console.error(err);
        } finally {
            // toast
            setIsLoading(false);
        }
    }

    const googleLogin = async (code: string) => {
        setIsLoading(true);

        try {
            const res = await api.googleLogin(code);

            setUser(res.data.user);
            setToken(res.data.accessToken);

            LocalStorage.set("user", res.data);
            LocalStorage.set("token", res.data.accessToken);

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

    const googleSignup = async (code: string) => {
        setIsLoading(true);

        try {
            const res = await api.googleLogin(code);

            setUser(res.data.user);
            setToken(res.data.accessToken);

            LocalStorage.set("user", res.data);
            LocalStorage.set("token", res.data.accessToken);

            navigate("/chat");
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

            LocalStorage.clear();
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
        const _token = LocalStorage.get("token");
        const _user = LocalStorage.get("user");
        if (_token && _user?._id) {
            setUser(_user);
            setToken(_token);
        }
        setIsLoading(false);
    }, []);

    // Provide auth data through the context
    return (
        <AuthContext.Provider value={{ user, login, signup, logout, googleLogin, googleSignup, token }}>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
                {isLoading ? <LoadingSpinner /> : children}
            </GoogleOAuthProvider >
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider, useAuth };
