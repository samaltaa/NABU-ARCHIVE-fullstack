import React from "react";

const SubjectCard = ({ subject, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-90 flex items-center justify-center z-50">
            <div className="bg-white border-2 border-gray-400 shadow-lg font-mono max-w-4xl w-full mx-4 overflow-hidden">
                <div className="relative p-4">
                    <div className="bg-gray-100 border border-gray-300 p-2 mb-4">
                        <h1 className="font-bold text-xl text-black uppercase tracking-wider text-center">SUBJECT PROFILE OVERVIEW</h1>
                    </div>
                    
                    <div className="bg-gray-100 p-4 gap-4">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex flex-col items-center md:items-start">
                                <div className="relative">
                                    <img
                                        src={`data:image/jpeg;base64,${subject.image}`}
                                        alt={`${subject.first_name} ${subject.last_name}`}
                                        className="h-40 w-40 border-2 border-gray-400 object-cover mb-4"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23eef2ff'/%3E%3Ctext x='50%' y='50%' font-size='40' text-anchor='middle' dominant-baseline='middle' font-family='sans-serif' font-weight='bold' fill='%234f46e5'%3E" + (subject.first_name ? subject.first_name.charAt(0) : "S") + "%3C/text%3E%3C/svg%3E";
                                        }}
                                    />
                                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
                                        <img className="w-full h-40 opacity-15" src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/egyptian-symbol-falcon-granger.jpg" alt="Classification Symbol"/>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-200 border border-gray-300 p-2 w-full">
                                    <p className="font-bold text-black uppercase tracking-wide text-sm">
                                        NAME: {subject.last_name ? subject.last_name.toUpperCase() : ''}, {subject.first_name ? subject.first_name.toUpperCase() : ''}
                                    </p>
                                    <p className="font-bold text-black uppercase tracking-wide text-sm">
                                        ID: {subject.id}
                                    </p>
                                    {subject.sex && (
                                        <p className="font-bold text-black uppercase tracking-wide text-sm">
                                            SEX: {subject.sex.toUpperCase()}
                                        </p>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex-1">
                                <div className="bg-gray-200 p-3 border border-gray-300 h-full overflow-auto text-xs leading-relaxed">
                                    <p className="font-bold bg-gray-300 mb-2 px-2 py-1 border border-gray-400 text-black uppercase tracking-wider text-center">RESIDENTIAL DATA</p>
                                    <div className="text-black space-y-1 font-mono">
                                        {subject.address && (
                                            <>
                                                <p><span className="text-gray-600 uppercase text-xs">STREET:</span> {subject.address.street ? subject.address.street.toUpperCase() : 'N/A'}</p>
                                                <p><span className="text-gray-600 uppercase text-xs">CITY:</span> {subject.address.city ? subject.address.city.toUpperCase() : 'N/A'}</p>
                                                <p><span className="text-gray-600 uppercase text-xs">STATE:</span> {subject.address.state ? subject.address.state.toUpperCase() : 'N/A'}</p>
                                                <p><span className="text-gray-600 uppercase text-xs">POSTAL:</span> {subject.address.zip_code || 'N/A'}</p>
                                                <p><span className="text-gray-600 uppercase text-xs">STATUS:</span> VERIFIED</p>
                                                <p><span className="text-gray-600 uppercase text-xs">REGION:</span> DOMESTIC</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-gray-200 border-t border-gray-300 px-6 py-4 flex justify-between">
                    <button
                        className="px-4 py-2 bg-gray-600 text-gray-100 border border-gray-500 font-bold uppercase tracking-wide text-xs hover:bg-gray-700 transition-colors"
                    >
                        SEE MORE DETAILS
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-red-800 text-red-100 border border-red-700 font-bold uppercase tracking-wide text-xs hover:bg-red-900 transition-colors"
                    >
                        CLOSE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubjectCard;