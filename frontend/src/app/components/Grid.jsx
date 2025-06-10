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
    <div className="relative z-0 bg-gray-100 py-12 mt-4 sm:py-12 font-mono">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Header Section */}
            <div className="mx-auto max-w-xl mb-12">
                <div className="bg-white border-2 border-gray-400 shadow-lg p-6">
                    <div className="bg-gray-100 border border-gray-300 p-4 mb-4">
                        <h2 className="text-2xl font-bold tracking-wider text-black uppercase text-center sm:text-3xl">
                            REGISTERED INDIVIDUALS
                        </h2>
                    </div>
                    <div className="bg-gray-200 border border-gray-300 p-3">
                        <p className="text-sm text-black font-semibold uppercase tracking-wide leading-relaxed">
                            AUTHORIZED ACCESS ONLY. THIS INTERFACE DISPLAYS COMPLETE 
                            REGISTRY OF ENROLLED SUBJECTS. EACH ENTRY CONTAINS 
                            ESSENTIAL IDENTIFICATION AND BIOMETRIC REFERENCE DATA. 
                            PERSONNEL MAY FILTER, SEARCH, AND REVIEW RECORDS FOR 
                            OPERATIONAL PURPOSES.
                        </p>
                    </div>
                </div>
            </div>

            {/* Subjects Grid */}
            <div className="mb-2 mx-auto max-w-4xl">
                <div className="bg-white border-2 border-gray-400 shadow-lg p-4">
                    <div className="bg-gray-100 border border-gray-300 p-2 mb-4">
                        <h3 className="font-bold text-black uppercase tracking-wider text-center">
                            SUBJECT REGISTRY
                        </h3>
                    </div>
                    <ul role="list" className="grid gap-4 grid-cols-1 md:grid-cols-2 bg-gray-200 p-4 border border-gray-300">
                        {subjects.map((subject) => (
                            <li key={subject._id} className="bg-white border border-gray-400 shadow-sm">
                                <SubjectCardPreview
                                    subject={subject}
                                    onClick={() => handlePreviewClick(subject)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Pagination Section */}
            <div className="flex justify-center items-center">
                <div className="bg-white border-2 border-gray-400 shadow-lg p-4">
                    
                    <div className="bg-gray-200 border border-gray-300 p-3">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-2 bg-gray-600 text-gray-100 border border-gray-500 font-bold uppercase tracking-wide text-xs hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                PREV
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
                                                    className={`px-2 py-1 border font-bold uppercase tracking-wide text-xs transition-colors ${
                                                        currentPage === i 
                                                            ? 'bg-red-800 text-red-100 border-red-700 hover:bg-red-900' 
                                                            : 'bg-gray-600 text-gray-100 border-gray-500 hover:bg-gray-700'
                                                    }`}
                                                >
                                                    {i.toString().padStart(2, '0')}
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
                                                    className={`px-2 py-1 border font-bold uppercase tracking-wide text-xs transition-colors ${
                                                        currentPage === i 
                                                            ? 'bg-red-800 text-red-100 border-red-700 hover:bg-red-900' 
                                                            : 'bg-gray-600 text-gray-100 border-gray-500 hover:bg-gray-700'
                                                    }`}
                                                >
                                                    {i.toString().padStart(2, '0')}
                                                </button>
                                            );
                                        }
                                        
                                        // Ellipsis
                                        if (showFirst < totalPages - showLast) {
                                            pages.push(
                                                <span key="ellipsis" className="px-2 py-1 text-gray-600 font-bold">
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
                                                    className={`px-2 py-1 border font-bold uppercase tracking-wide text-xs transition-colors ${
                                                        currentPage === i 
                                                            ? 'bg-red-800 text-red-100 border-red-700 hover:bg-red-900' 
                                                            : 'bg-gray-600 text-gray-100 border-gray-500 hover:bg-gray-700'
                                                    }`}
                                                >
                                                    {i.toString().padStart(2, '0')}
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
                                className="px-3 py-2 bg-gray-600 text-gray-100 border border-gray-500 font-bold uppercase tracking-wide text-xs hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                NEXT
                            </button>
                        </div>
                    </div>
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