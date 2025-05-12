import React from "react";

const SubjectCard = ({ subject, onClose}) => {
    return (
        <div className="">
            <button className="" onClick={onClose}>X</button>
            <img
                src={`data:image/jpeg;base64,${subject.image}`}
                alt="Subject"
                className="w-32 h-32"
            />
            <h2 className="">{subject.first_name} {subject.last_name}</h2>
            <p className="">ID: {subject.id}</p>
            <p className="">Sex: {subject.sex}</p>
            <p className="">Street: {subject.address.street}</p>
            <p className="">City: {subject.address.city}</p>
            <p className="">State: {subject.address.state}</p>
            <p className="">Zip: {subject.address.zip_code}</p>
        </div>
    )
}

export default SubjectCard;