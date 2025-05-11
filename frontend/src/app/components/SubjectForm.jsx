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
        <div>
            <h2 className="">
                Submit Info 
            </h2>
            <form 
                id="subject-form"
                className=""
                onSubmit={handleSubmit(handleFormSubmit)}
                encType="multipart/form-data"
            >

                <label className="">ID: </label>
                <input
                    type="text"
                    {...register('id', { required:'ID is required' })}
                />
                {errors.id && <p className="">{errors.id.message}</p>}

                <label className="">First Name: </label>
                <input
                    type="text"
                    {...register('first_name', { required: 'First name is required' })}
                />
                {errors.first_name && <p className="">{errors.first_name.message}</p>}

                <label className="">Last Name: </label>
                <input 
                    type="text"
                    {...register('last_name', { required: 'Last name is required' })}
                />
                {errors.last_name && <p className="">{errors.last_name.message}</p>}

                <label className="">Sex: </label>
                <select 
                    {...register('sex', { required: 'Sex is required'})}
                >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>

                </select>
                {errors.sex && <p className="">{errors.sex.message}</p>}

                <label className="">Street: </label>
                <input 
                    type="text"
                    {...register('street', { required: 'Street is required' })}/>
                {errors.street && <p className="">{errors.street.message}</p>}

                <label className="">City: </label>
                <input 
                    type="text"
                    {...register('city', { required: 'City is required' })}/>
                {errors.city && <p className="">{errors.city.message}</p>}

                <label className="">State: </label>
                <input 
                    type="text"
                    {...register('state', { required: 'State is required' })}/>
                {errors.state && <p className="">{errors.state.message}</p>}

                <label className="">Zip Code: </label>
                <input 
                    type="text"
                    {...register('zip_code', { required: 'Zip code is required' })}/>
                {errors.zip_code && <p className="">{errors.zip_code.message}</p>}

                <label className="">Date of Birth: </label>
                <input 
                    type="date"
                    {...register('dob', { required: 'Date of birth is required' })}/>
                {errors.dob && <p className="">{errors.dob.message}</p>}

                <label className="">Image: </label>
                <input 
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    {...register('image', { required: 'Image is required' })}/>
                {errors.image && <p className="">{errors.image.message}</p>}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className=""
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>

            </form>
        </div>
    )
}