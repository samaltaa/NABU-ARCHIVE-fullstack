"use client"
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';


export default function Login() {
    //const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post('http://127.0.0.1:8000/login/', {email, password});
        Cookies.set('token', response.data.access_token);
        //router.push('/dashboard')
        window.location.href = '/dashboard'; //redirect to the page with subject list
        //see if you can use router.push('/') instead of window.location.href
    }

    return(
        <section className='bg-white dark:bg-white'>
            <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-600">
                    <img className="w-8 h-8 mr-2" src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/egyptian-symbol-falcon-granger.jpg" alt="logo" />
                    
                    NABU
                </a>
                <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-600 dark:border-gray-700'>
                    <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                            Sign In
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <label className='block mb-2 text-sm font-bold text-gray-900 dark:text-white'>Email:</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Email'/>

                            <label className='block mb-2 text-sm font-bold text-gray-900 dark:text-white'>Password:</label>
                            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Password'/>
                            <button className='w-full text-white border bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800' type='submit'>Login</button>

                        </form>
                    </div>
                </div>

            </div>
        </section>
    )
}