import React from "react";

const SubjectCard = ({ subject, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full mx-4 overflow-hidden shadow-xl">
                <div className="relative p-6">
                   
                    
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Left Column - Image, Name, ID */}
                        <div className="flex flex-col items-center md:items-start">
                            <img
                                src={`data:image/jpeg;base64,${subject.image}`}
                                alt={`${subject.first_name} ${subject.last_name}`}
                                className="size-48 rounded-full object-cover mb-4"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23eef2ff'/%3E%3Ctext x='50%' y='50%' font-size='40' text-anchor='middle' dominant-baseline='middle' font-family='sans-serif' font-weight='bold' fill='%234f46e5'%3E" + (subject.first_name ? subject.first_name.charAt(0) : "S") + "%3C/text%3E%3C/svg%3E";
                                }}
                            />
                            <h3 className="text-xl font-semibold tracking-tight text-gray-900">
                                {subject.first_name} {subject.last_name}
                            </h3>
                            <p className="text-sm font-semibold text-indigo-600 mt-1">
                                ID: {subject.id}
                            </p>
                            {subject.sex && (
                                <p className="text-sm text-gray-600 mt-2">
                                    Sex: {subject.sex}
                                </p>
                            )}
                        </div>
                        
                        {/* Right Column - Address */}
                        <div className="md:border-l md:pl-6 md:ml-2 flex-1">
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Address</h4>
                            <div className="space-y-2">
                                {subject.address && (
                                    <>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Street:</span> {subject.address.street}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">City:</span> {subject.address.city}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">State:</span> {subject.address.state}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Zip:</span> {subject.address.zip_code}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubjectCard;