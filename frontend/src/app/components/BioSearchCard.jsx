import React from "react";


const BioSearchCard = () => {
    return (
        <>
            <div className="flex flex-col items-center bg-white p-4 border border-gray-300 shadow-lg">
                <div className="flex flex-col items-center p-2 border border-gray-100 bg-gray-100 h-full w-full">
                    <h1 className="font-bold text-xl text-black">Matched Subject Details</h1>
                </div>
                <div className="flex flex-col items-center bg-gray-100 p-4 gap-4 mt-2 mb-2">

                    <div className="relative">
                        <div className="flex flex-row ">
                            <div className=" z-20">
                               <img className="h-40 w-40 rounded-md" src="https://i.redd.it/slsmetea3g2b1.jpg" alt="Lana Del Rey"/>
                                <div className=" pt-1 pb-2 gap-1">
                                    <span class="inline-flex w-14 items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">Threat</span>
                                    <span class="inline-flex w-14 items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-yellow-600/20 ring-inset">Liberal</span>
                                    <span class="inline-flex w-14 items-center justify-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-yellow-600/20 ring-inset">Dixiecrat</span>
                                </div> 
                            </div>
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none z-10">
                                <img className="w-full h-75 opacity-10 z-10" src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/egyptian-symbol-falcon-granger.jpg" alt="Lana Del Rey"/>
                            </div>
                        </div>
                        <p className="font-bold text-gray-600">Name: Del Rey, Lana</p> 
                        
                        <p className="font-bold text-gray-600">Location: Room 157, Building A, WI Campus</p>
                    </div>
            </div>
            <div className="flex flex-row items-start gap-2">
                <div className="bg-gray-100 p-2  border border-gray-300 w-[120px] h-[120px] overflow-auto text-xs leading-tight">
                    <p className="font-bold bg-gray-100 mt-2 mb-1 px-1 border rounded-md">Biological Data</p>
                    <p>Sex: Female</p>
                    <p>Chromosomes: XX</p>
                    <p>Age: 40</p>
                    <p>Race: White</p>
                    <p>Blood: B+</p>
                    <p>Last Menstrual Cycle: 05/10/2025</p>
                </div>

                <div className="bg-gray-100 p-2 border border-gray-300 w-[120px] h-[120px] overflow-auto text-xs leading-tight">
                    <p className="font-bold bg-gray-100 mt-1 mb-1 px-1 border rounded-md">Personal Data</p>
                    <p>Religion: Catholic</p>
                    <p>Attendance: Weekly</p>
                    <p>Friends: Francois Duvalier, David Duke...</p>
                    <p>Socials: Instagram, Twitter...</p>
                </div>

                <div className="bg-gray-100 p-2 border border-gray-300 w-[120px] h-[120px] overflow-auto text-xs leading-tight">
                    <p className="font-bold bg-gray-100 mt-1 mb-1 px-1 border rounded-md">Criminal Record</p>
                    <p>Reacord: [agrivated assault, cocaine poss...]</p>
                    <p>At-Home: 6PM-8AM</p>
                    <p>At-Work: 9AM-5PM</p>
                    <p>Common Location: </p>
                </div>
                </div>
                
            </div>
        </>
    )
}

export default BioSearchCard;