import React from 'react';

const SubjectCardPreview = ({ subject, onClick }) => {
    return (
        <div onClick={onClick} className="flex items-center gap-x-6 cursor-pointer hover:bg-gray-50 p-4 rounded-lg transition-colors">
            <div className="size-16 rounded-full bg-indigo-100 flex items-center justify-center">
                <img src={subject.image} alt={subject.name} className="w-16 h-16 rounded-full" />
            </div>
            <div>
                <h3 className="text-base font-semibold tracking-tight text-gray-900">
                    {subject.first_name} {subject.last_name}
                </h3>
                <p className="text-sm font-semibold text-indigo-600">
                    ID: {subject.id}
                </p>
            </div>
        </div>
    )
}

export default SubjectCardPreview;