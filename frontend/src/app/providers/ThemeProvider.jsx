import React from "react";

const ThemeProvider = ({ children }) => {
    return(
        <div className="min-h-screen bg-cyberpunk-bg font-terminal text-cyberpunk-text overflow-hidden">

            <div className="fixed inset-0 bg-scanlines pointer-events-none z-0 opacity-30"></div>

            {/* MAIN CONTENT CONTAINER */}
            <div className="relative z-10 ">
                {children}
            </div>

        </div>
    );
};

export default ThemeProvider;