'use client'
import react from 'react';
import { useState, useEffect } from 'react';
import SubjectCardPreview from './SubjectCardPreview';
import SubjectCard from './SubjectCard';

function Grid(){
    const [subject, setSubject] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSubject, setSelectedSubject] = useState(null);

    const handlePreviewClick = (subject) => {
        setSelectedSubject(subject);
    }

    useEffect(() => {
        fetch('http://127.0.0.1:8000/subjects/',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }})
                .then((response) => response.json())
                .then((data) => {
                        setSubject(data);
                        setLoading(false);
                    }).catch((error) => {
                        console.error('Error fetching subjects:', error);
                        setLoading(false);
                    })
    }, [])

    if (loading) return <div>Loading...</div>;
    if (subject.length === 0) return <div>No subjects found</div>;

    return(
        <div className=''>
            {subject.map((subject) => (
                <div key={subject._id} className="">
                    <SubjectCardPreview 
                        subject={subject}
                        onClick={() => handlePreviewClick(subject)}
                    />
                </div>
            ))}

            {selectedSubject && (
                <div>
                    <SubjectCard 
                        subject={selectedSubject}
                        onClose={() => setSelectedSubject(null)}
                    />
                </div>
            )}
        </div>
    )
}

export default Grid;