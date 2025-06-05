import React from "react";

const BioSearchCard = () => {
    return (
        <>
            <div className="flex flex-col items-center bg-white p-4  border border-gray-300 shadow-lg font-mono">
                <div className="flex flex-col items-center p-2 border border-gray-100 bg-gray-100 h-full w-full">
                    <h1 className="font-bold text-xl text-black uppercase tracking-wider">MATCHED SUBJECT DETAILS</h1>
                </div>
                <div className="flex flex-col items-center bg-gray-100 p-4 gap-4 mt-2 mb-2 w-full">

                    <div className="relative w-full">
                        <div className="flex flex-row">
                            <div className="z-20">
                               <img className="h-40 w-40 border-2 border-gray-400" src="https://i.redd.it/slsmetea3g2b1.jpg" alt="Subject Photograph"/>
                                <div className="pt-2 pb-2 gap-5 flex flex-wrap">
                                    <span className="inline-flex items-center bg-red-800 px-2 py-1 text-xs font-bold text-red-100 border border-red-700 uppercase tracking-wide">THREAT</span>
                                    <span className="inline-flex items-center bg-gray-600 px-2 py-1 text-xs font-semibold text-gray-100 border border-gray-500 uppercase tracking-wide">UNSTABLE</span>
                                </div> 
                            </div>
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none z-10">
                                <img className="w-full h-75 opacity-10 z-10" src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/egyptian-symbol-falcon-granger.jpg" alt="Classification Symbol"/>
                            </div>
                        </div>
                        <div className="relative z-10 opacity-60 mt-3 bg-gray-200 border border-gray-300 p-2">
                            <p className="font-bold text-black uppercase tracking-wide text-sm">NAME: DEL REY, LANA</p> 
                            <p className="font-bold text-black uppercase tracking-wide text-sm">LOCATION: ROOM 157, BUILDING A, WI CAMPUS</p>
                        </div>
                    </div>
            </div>
            <div className="flex flex-row items-start gap-2 w-full">
                <div className="bg-gray-200 p-3 border border-gray-300 w-[140px] h-[140px] overflow-auto text-xs leading-relaxed">
                    <p className="font-bold bg-gray-300 mb-2 px-2 py-1 border border-gray-400 text-black uppercase tracking-wider text-center">BIOLOGICAL DATA</p>
                    <div className="text-black space-y-1 font-mono">
                        <p><span className="text-gray-600 uppercase text-xs">SEX:</span> FEMALE</p>
                        <p><span className="text-gray-600 uppercase text-xs">CHROMO:</span> XX</p>
                        <p><span className="text-gray-600 uppercase text-xs">RACE:</span> WHITE</p>
                        <p><span className="text-gray-600 uppercase text-xs">BLOOD:</span> B+</p>
                        <p><span className="text-gray-600 uppercase text-xs">LMC:</span> 05/10/2025</p>
                    </div>
                </div>

                <div className="bg-gray-200 p-3 border border-gray-300 w-[140px] h-[140px] overflow-auto text-xs leading-relaxed">
                    <p className="font-bold bg-gray-300 mb-2 px-2 py-1 border border-gray-400 text-black uppercase tracking-wider text-center">PERSONAL DATA</p>
                    <div className="text-black space-y-1 font-mono">
                        <p><span className="text-gray-600 uppercase text-xs">ASSOC:</span> FRANCOIS DUVALIER, DONALD TRUMP...</p>
                        <p><span className="text-gray-600 uppercase text-xs">RELIGION:</span> CATHOLIC</p>
                        <p><span className="text-gray-600 uppercase text-xs">ATTEND:</span> WEEKLY</p>
                        <p><span className="text-gray-600 uppercase text-xs">SOCIAL:</span> IG, TW...</p>
                    </div>
                </div>

                <div className="bg-gray-200 p-3 border border-gray-300 w-[140px] h-[140px] overflow-auto text-xs leading-relaxed">
                    <p className="font-bold bg-gray-300 mb-2 px-2 py-1 border border-gray-400 text-black uppercase tracking-wider text-center">OFFENSE RECORD</p>
                    <div className="text-black space-y-1 font-mono">
                        <p><span className="text-gray-600 uppercase text-xs">RECORD:</span> AGG.ASSAULT, COCA.POSS...</p>
                        <p><span className="text-gray-600 uppercase text-xs">HOME:</span> 18:00-08:00</p>
                        <p><span className="text-gray-600 uppercase text-xs">WORK:</span> 09:00-17:00</p>
                        <p><span className="text-gray-600 uppercase text-xs">COMMON:</span> [CLASSIFIED]</p>
                    </div>
                </div>
                </div>
                
            </div>
        </>
    )
}

export default BioSearchCard;