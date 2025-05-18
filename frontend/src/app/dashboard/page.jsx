"use client"
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
/*
THIS ENTIRE FILE OF CODE IS JUST FOR TESTING
ONCE THE ROUTES ARE TESTED AND FRONTEND IS TESTED THE LOGIC
TO FETCH THE COOKIES AND PASS THEM TO THE COMPONENT 
THAT THE USER WILL BE PUSHED TO BY THE ROUTER MUST BE TRANSFERED 
TO THAT COMPONENT (I.E THE GRID COMPONENT)

*/
export default function Dashboard(){
    //TRANSFER FROM HERE 
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        setAuthorized(!!token);
    }, []);

    if (!authorized) return <p>Access denied</p>
    //TO HERE 

    return <div>Welcome to the dashboard</div>
}