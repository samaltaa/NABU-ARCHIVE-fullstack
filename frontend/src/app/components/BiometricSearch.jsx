import React from "react";
import FaceCapture from "./FaceCapture";
import BioSearchCard from "./BioSearchCard";


const BiometricSearch = () => {

    return (
        <>
            <div className="flex flex-col items-center bg-white p-4 border border-gray-300">
                <h1 className="text-black font-bold text-xl">Biometric Search</h1>
                <div className="flex flex-row items-center bg-white p-4 border border-gray-300 gap-4">
                    <div className="">
                        <FaceCapture />
                    </div>
                    <div className="flex flex-col items-center text-black">
                        <BioSearchCard/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BiometricSearch;