'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import SubjectCardPreview from './SubjectCardPreview';
import SubjectCard from './SubjectCard';
import { useAuth } from '../context/AuthContext';

function Grid() {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSubject, setSelectedSubject] = useState(null);

    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) return null;

    const handlePreviewClick = (subject) => {
        setSelectedSubject(subject);
    }

    useEffect(() => {
        fetch('http://127.0.0.1:8000/subjects/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setSubjects(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching subjects:', error);
                setLoading(false);
            })
    }, [])

    if (loading) return <div className="flex justify-center items-center py-24">Loading...</div>;
    if (subjects.length === 0) return <div className="flex justify-center items-center py-24">No subjects found</div>;

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid gap-20 xl:grid-cols-3">
                    <div className="max-w-xl">
                        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">Our Subjects</h2>
                        <p className="mt-6 text-lg text-gray-600">
                            Explore our comprehensive collection of subjects designed to enhance your learning experience and help you achieve your academic goals.
                        </p>
                    </div>
                    <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                        {subjects.map((subject) => (
                            <li key={subject._id}>
                                <SubjectCardPreview
                                    subject={subject}
                                    onClick={() => handlePreviewClick(subject)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

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