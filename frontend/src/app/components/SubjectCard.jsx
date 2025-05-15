import React from "react";

const SubjectCard = ({ subject, onClose}) => {
    return (
        <div className="mx-auto my-10 flex-col items-center border px-4 text-center bg-cyberpunk-bg md:max-w-lg md:flex-row mid:items-start md:text-left">
            <div className="mb-4 md:mr-6 md:mb-0">
                <button className="" onClick={onClose}>X</button>
                <img
                    src={`data:image/jpeg;base64,${subject.image}`}
                    alt="Subject"
                    className="h-32 object-cover md:h-48 md:w-32"
                />
            </div>
            <div className="">
                <p className="text-xl font-medium text-gray-700">{subject.first_name} {subject.last_name}</p>
                <p className="mb-4 text-sm font-medium text-gray-500">ID: {subject.id}</p>
                <div className="flex space-x-2 text-left">
                    <p className="text-sm font-medium text-gray-700">Sex: {subject.sex}</p>
                    <p className="text-sm font-medium text-gray-700">Street: {subject.address.street}</p>
                    <p className="text-sm font-medium text-gray-700">City: {subject.address.city}</p>
                    <p className="text-sm font-medium text-gray-700">State: {subject.address.state}</p>
                    <p className="text-sm font-medium text-gray-700">Zip: {subject.address.zip_code}</p>
                </div>
            </div>
        </div>
    )
}

export default SubjectCard;