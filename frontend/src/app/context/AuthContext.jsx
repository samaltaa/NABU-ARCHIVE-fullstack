"use client"
import { createContext, useContext, useState, useEffect } from "react";
import { getToken, decodeToken, clearToken } from "../lib/auth";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({ children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = getToken();
        if (token){
            const decoded = decodeToken(token);
            if (decoded?.exp * 1000 > Date.now()){
                setUser(decoded);
                setIsAuthenticated(true);
            } else {
                clearToken();
            }
        }
        setLoading(false);
    }, []);

    const login = (token) => {
        Cookies.set("token", token);
        const decoded = decodeToken(token);
        setUser(decoded);
        setIsAuthenticated(true);
    };

    const logout = () => {
        clearToken();
        setUser(null);
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}