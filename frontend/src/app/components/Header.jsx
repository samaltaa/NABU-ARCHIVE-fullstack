"use client"
import React, { useContext } from "react";
import { AuthProvider, useAuth } from "@/app/context/AuthContext";

const Header = () => {
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    }

    return(
        <div className="flex justify-between px-4 h-16 w-full bg-white border border-gray-300">
            <div className="flex py-2 gap-2 ">
                <a className="">
                    <img className="w-8 h-8" src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/egyptian-symbol-falcon-granger.jpg"/>
                </a>
                <p className="py-2 text-gray-500 font-bold">Nabu</p>
            </div>
            <div className="flex items-center gap-2 ml-4">
                {isAuthenticated ? (
                    <>
                    <button onClick={handleLogout} className="bg-gray-600 px-4 py-2 rounded-md font-bold">
                        Logout
                    </button>
                    </>
                ) : (
                    <button onClick={() => window.location.href = '/'} className="bg-gray-600 px-4 py-2 rounded-md font-bold">
                        Sign In 
                    </button>
                )}
            </div>
        </div>
    )
}
export default Header