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
        <form onSubmit={handleSubmit}>
            <label className=''>Email:</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>

            <label className=''>Password:</label>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
            <button type='submit'>Login</button>
        </form>
    )
}