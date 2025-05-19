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
        <div className="bg-white py-8 px-6 shadow-md rounded-lg border border-gray-200 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-6">
                Submit Information
            </h2>
            <form 
                id="subject-form"
                className="space-y-6"
                onSubmit={handleSubmit(handleFormSubmit)}
                encType="multipart/form-data"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">ID: </label>
                        <input
                            type="text"
                            placeholder="ID"
                            className="w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2 border"
                            {...register('id', { required:'ID is required' })}
                        />
                        {errors.id && <p className="text-red-500 text-sm mt-1">{errors.id.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">First Name: </label>
                        <input
                            type="text"
                            placeholder="First Name"
                            className="w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2 border"
                            {...register('first_name', { required: 'First name is required' })}
                        />
                        {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Last Name: </label>
                        <input 
                            type="text"
                            placeholder="Last Name"
                            className="w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2 border"
                            {...register('last_name', { required: 'Last name is required' })}
                        />
                        {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Sex: </label>
                        <select 
                            className="w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2 border"
                            {...register('sex', { required: 'Sex is required'})}
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {errors.sex && <p className="text-red-500 text-sm mt-1">{errors.sex.message}</p>}
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Address Information:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Street: </label>
                            <input 
                                type="text"
                                placeholder="Street"
                                className="w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2 border"
                                {...register('street', { required: 'Street is required' })}/>
                            {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-900">City: </label>
                            <input 
                                type="text"
                                placeholder="City"
                                className="w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2 border"
                                {...register('city', { required: 'City is required' })}/>
                            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">State: </label>
                            <input 
                                type="text"
                                placeholder="State"
                                className="w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2 border"
                                {...register('state', { required: 'State is required' })}/>
                            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Zip Code: </label>
                            <input 
                                type="text"
                                placeholder="Zip Code"
                                className="w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2 border"
                                {...register('zip_code', { required: 'Zip code is required' })}/>
                            {errors.zip_code && <p className="text-red-500 text-sm mt-1">{errors.zip_code.message}</p>}
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Bio-demographic Data:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Date of Birth: </label>
                            <input 
                                type="date"
                                className="w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2 border"
                                {...register('dob', { required: 'Date of birth is required' })}/>
                            {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Full-face Image: </label>
                            <input 
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                {...register('image', { required: 'Image is required' })}/>
                            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
                            <p className="text-xs text-gray-300">face will be encoded for facial recognition.</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-6">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    )
}