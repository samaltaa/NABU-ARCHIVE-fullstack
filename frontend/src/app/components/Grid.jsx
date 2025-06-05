'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import SubjectCardPreview from './SubjectCardPreview';
import SubjectCard from './SubjectCard';
import { useAuth } from '../context/AuthContext';

function Grid() {
    // State to handle pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    // State to hold subjects and loading state
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) return null;

    const handlePreviewClick = (subject) => {
        setSelectedSubject(subject);
    }

    useEffect(() => {
        const fetchSubjects = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://127.0.0.1:8000/subjects/?page=${currentPage}&limit=${limit}`);
                const data = await response.json();
                setSubjects(data.subjects);
                setTotalPages(data.pages)
            } catch (err) {
                console.error("Error fetching subjects:", err);
            }
            setLoading(false);
        };
        fetchSubjects();
    }, [currentPage])

    if (loading) return <div className="flex justify-center items-center py-24">Loading...</div>;
    if (subjects.length === 0) return <div className="flex justify-center items-center py-24">No subjects found</div>;

    return (
    <div className="relative z-0 bg-white py-12 mt-4 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Header Section */}
            <div className="mx-auto max-w-xl mb-12">
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                    Browse Registered Individuals
                </h2>
                <p className="mt-2 text-lg text-gray-600">
                    This interface displays a complete list of 
                    individuals enrolled in the system. Each entry 
                    includes essential identifying information and 
                    biometric reference data. Authorized personnel 
                    may filter, search, and review subject records 
                    for operational or administrative purposes.
                </p>
            </div>

            {/* Subjects Grid */}
            <div className="mb-4 mx-auto max-w-4xl">
                <ul role="list" className="grid gap-6 grid-cols-1 md:grid-cols-2">
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

            {/* Pagination Section */}
            <div className="flex justify-center items-center">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Previous
                    </button>

                    <div className="flex gap-1 items-center">
                        {(() => {
                            const maxVisiblePages = 10;
                            const pages = [];
                            
                            if (totalPages <= maxVisiblePages) {
                                // Show all pages if total is 10 or less
                                for (let i = 1; i <= totalPages; i++) {
                                    pages.push(
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i)}
                                            className={`px-3 py-2 rounded-md transition-colors ${
                                                currentPage === i 
                                                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                        >
                                            {i}
                                        </button>
                                    );
                                }
                            } else {
                                // Show first few pages, ellipsis, and last few pages
                                const showFirst = Math.min(7, maxVisiblePages - 3);
                                const showLast = 3;
                                
                                // First pages
                                for (let i = 1; i <= showFirst; i++) {
                                    pages.push(
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i)}
                                            className={`px-3 py-2 rounded-md transition-colors ${
                                                currentPage === i 
                                                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                        >
                                            {i}
                                        </button>
                                    );
                                }
                                
                                // Ellipsis
                                if (showFirst < totalPages - showLast) {
                                    pages.push(
                                        <span key="ellipsis" className="px-3 py-2 text-gray-500">
                                            ...
                                        </span>
                                    );
                                }
                                
                                // Last pages
                                for (let i = Math.max(showFirst + 1, totalPages - showLast + 1); i <= totalPages; i++) {
                                    pages.push(
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i)}
                                            className={`px-3 py-2 rounded-md transition-colors ${
                                                currentPage === i 
                                                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                        >
                                            {i}
                                        </button>
                                    );
                                }
                            }
                            
                            return pages;
                        })()}
                    </div>

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>

        {/* Subject Detail Modal/Overlay */}
        {selectedSubject && (
            <div>
                <SubjectCard
                    subject={selectedSubject}
                    onClose={() => setSelectedSubject(null)}
                />
            </div>
        )}
    </div>
);
}

export default Grid;