"use client"
import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

export default function SubjectForm({onSubmit}) {
    //React Hook Form 
    const {
        register, 
        handleSubmit,
        formState: {errors},
        reset
    } = useForm();

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form submission handler
    const handleFormSubmit = async (data) => {
        try{
            setIsSubmitting(true);

            // Create a FormData object 
            const formData = new FormData();

            // Add all form fields to FormData
            formData.append('id', data.id);
            formData.append('first_name', data.first_name);
            formData.append('last_name', data.last_name);
            formData.append('sex', data.sex);
            formData.append('street', data.street);
            formData.append('city', data.city);
            formData.append('state', data.state);
            formData.append('zip_code', data.zip_code);
            formData.append('dob', data.dob);
            formData.append('image', data.image[0]);

            // Send the form data to the server
            const response = await axios.post('http://127.0.0.1:8000/subjects/', formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });

            alert('Subject created successfully');
            reset();

            // Refresh subject list 
            if (onSubmit) {
                onSubmit();
            }
            

        } catch (error){
            const errorMessage = error.response?.data?.detail || 'An error occurred';
            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white border-2 border-gray-400 shadow-lg font-mono max-w-4xl mx-auto">
            <div className="bg-gray-100 border border-gray-300 p-4">
                <h2 className="text-xl font-bold tracking-wider text-black uppercase text-center">
                    SUBJECT REGISTRATION FORM
                </h2>
            </div>
            
            <div className="bg-gray-200 p-6">
                <form 
                    id="subject-form"
                    className="space-y-6"
                    onSubmit={handleSubmit(handleFormSubmit)}
                    encType="multipart/form-data"
                >
                    {/* Personal Information Section */}
                    <div className="bg-white border border-gray-400 p-4">
                        <div className="bg-gray-300 border border-gray-400 p-2 mb-4">
                            <h3 className="font-bold text-black uppercase tracking-wider text-center text-sm">
                                PERSONAL IDENTIFICATION
                            </h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide">SUBJECT ID:</label>
                                <input
                                    type="text"
                                    placeholder="ENTER ID"
                                    className="w-full text-black bg-gray-100 border border-gray-400 px-3 py-2 text-sm font-mono uppercase tracking-wide focus:bg-white focus:border-gray-600 focus:outline-none"
                                    {...register('id', { required:'ID is required' })}
                                />
                                {errors.id && <p className="text-red-800 text-xs mt-1 font-bold uppercase">{errors.id.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide">FIRST NAME:</label>
                                <input
                                    type="text"
                                    placeholder="ENTER FIRST NAME"
                                    className="w-full text-black bg-gray-100 border border-gray-400 px-3 py-2 text-sm font-mono uppercase tracking-wide focus:bg-white focus:border-gray-600 focus:outline-none"
                                    {...register('first_name', { required: 'First name is required' })}
                                />
                                {errors.first_name && <p className="text-red-800 text-xs mt-1 font-bold uppercase">{errors.first_name.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide">LAST NAME:</label>
                                <input 
                                    type="text"
                                    placeholder="ENTER LAST NAME"
                                    className="w-full text-black bg-gray-100 border border-gray-400 px-3 py-2 text-sm font-mono uppercase tracking-wide focus:bg-white focus:border-gray-600 focus:outline-none"
                                    {...register('last_name', { required: 'Last name is required' })}
                                />
                                {errors.last_name && <p className="text-red-800 text-xs mt-1 font-bold uppercase">{errors.last_name.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide">BIOLOGICAL SEX:</label>
                                <select 
                                    className="w-full text-black bg-gray-100 border border-gray-400 px-3 py-2 text-sm font-mono uppercase tracking-wide focus:bg-white focus:border-gray-600 focus:outline-none"
                                    {...register('sex', { required: 'Sex is required'})}
                                >
                                    <option value="">SELECT CLASSIFICATION</option>
                                    <option value="Male">MALE</option>
                                    <option value="Female">FEMALE</option>
                                </select>
                                {errors.sex && <p className="text-red-800 text-xs mt-1 font-bold uppercase">{errors.sex.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Address Information Section */}
                    <div className="bg-white border border-gray-400 p-4">
                        <div className="bg-gray-300 border border-gray-400 p-2 mb-4">
                            <h3 className="font-bold text-black uppercase tracking-wider text-center text-sm">
                                RESIDENTIAL ADDRESS
                            </h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide">STREET ADDRESS:</label>
                                <input 
                                    type="text"
                                    placeholder="ENTER STREET ADDRESS"
                                    className="w-full text-black bg-gray-100 border border-gray-400 px-3 py-2 text-sm font-mono uppercase tracking-wide focus:bg-white focus:border-gray-600 focus:outline-none"
                                    {...register('street', { required: 'Street is required' })}/>
                                {errors.street && <p className="text-red-800 text-xs mt-1 font-bold uppercase">{errors.street.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide">CITY:</label>
                                <input 
                                    type="text"
                                    placeholder="ENTER CITY"
                                    className="w-full text-black bg-gray-100 border border-gray-400 px-3 py-2 text-sm font-mono uppercase tracking-wide focus:bg-white focus:border-gray-600 focus:outline-none"
                                    {...register('city', { required: 'City is required' })}/>
                                {errors.city && <p className="text-red-800 text-xs mt-1 font-bold uppercase">{errors.city.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide">STATE/PROVINCE:</label>
                                <input 
                                    type="text"
                                    placeholder="ENTER STATE"
                                    className="w-full text-black bg-gray-100 border border-gray-400 px-3 py-2 text-sm font-mono uppercase tracking-wide focus:bg-white focus:border-gray-600 focus:outline-none"
                                    {...register('state', { required: 'State is required' })}/>
                                {errors.state && <p className="text-red-800 text-xs mt-1 font-bold uppercase">{errors.state.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide">POSTAL CODE:</label>
                                <input 
                                    type="text"
                                    placeholder="ENTER ZIP CODE"
                                    className="w-full text-black bg-gray-100 border border-gray-400 px-3 py-2 text-sm font-mono uppercase tracking-wide focus:bg-white focus:border-gray-600 focus:outline-none"
                                    {...register('zip_code', { required: 'Zip code is required' })}/>
                                {errors.zip_code && <p className="text-red-800 text-xs mt-1 font-bold uppercase">{errors.zip_code.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Bio-demographic Data Section */}
                    <div className="bg-white border border-gray-400 p-4">
                        <div className="bg-gray-300 border border-gray-400 p-2 mb-4">
                            <h3 className="font-bold text-black uppercase tracking-wider text-center text-sm">
                                BIOMETRIC DATA COLLECTION
                            </h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide">DATE OF BIRTH:</label>
                                <input 
                                    type="date"
                                    className="w-full text-black bg-gray-100 border border-gray-400 px-3 py-2 text-sm font-mono uppercase tracking-wide focus:bg-white focus:border-gray-600 focus:outline-none"
                                    {...register('dob', { required: 'Date of birth is required' })}/>
                                {errors.dob && <p className="text-red-800 text-xs mt-1 font-bold uppercase">{errors.dob.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide">FACIAL RECOGNITION IMAGE:</label>
                                <div className="bg-gray-100 border border-gray-400 p-2">
                                    <input 
                                        type="file"
                                        accept=".jpg, .jpeg, .png"
                                        className="w-full text-xs text-black file:mr-2 file:py-1 file:px-2 file:border file:border-gray-400 file:text-xs file:font-bold file:bg-gray-600 file:text-gray-100 file:uppercase file:tracking-wide hover:file:bg-gray-700"
                                        {...register('image', { required: 'Image is required' })}/>
                                    {errors.image && <p className="text-red-800 text-xs mt-1 font-bold uppercase">{errors.image.message}</p>}
                                    <p className="text-xs text-gray-600 mt-2 font-bold uppercase tracking-wide">
                                        WARNING: FACIAL DATA WILL BE ENCODED FOR BIOMETRIC IDENTIFICATION
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Section */}
                    <div className="bg-white border border-gray-400 p-4">
                        
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-3 bg-red-800 text-red-100 border border-red-700 font-bold uppercase tracking-wider text-sm hover:bg-red-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'PROCESSING...' : 'REGISTER SUBJECT'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}