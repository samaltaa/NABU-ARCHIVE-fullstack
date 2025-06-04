import React from "react";


const BioSearchCard = () => {
    return (
        <>
            <div className="flex flex-col items-center bg-white p-4 border border-gray-300">
                <div className="flex flex-col items-center bg-white p-4 gap-4 ">
                    <div>
                        <img className="h-40 w-40" src="https://i.redd.it/slsmetea3g2b1.jpg" alt="Lana Del Rey"/>
                        <p className="pt-1 pb-2">
                            <span class="inline-flex w-14 items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">Threat: High</span>
                            <span class="inline-flex w-14 items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-600/20 ring-inset">Politics: Liberal</span>
                            <span class="inline-flex w-14 items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-600/20 ring-inset">Party: Dixiecrat</span>
                        </p>
                        <p>Name: Del Rey, Lana</p> 
                        
                        <p>DOB: 2344 Main St, Los Angeles, CA 09832</p>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                    <div className="bg-yellow-100 opacity-50 p-2 rounded-md border border-gray-300 h-18 w-30">
                        //Biological data
                    </div>

                    <div className="bg-yellow-100 opacity-50 p-2 rounded-md border border-gray-300 h-18 w-25">
                        //Social data
                    </div>

                    <div className="bg-yellow-100 opacity-50 p-2 rounded-md border border-gray-300 h-18 w-30">
                        //Ethnic data
                    </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default BioSearchCard;