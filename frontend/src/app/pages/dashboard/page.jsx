"use client"
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Grid from '../../components/Grid';
import SubjectForm from '../../components/SubjectForm';
import { useAuth } from '../../context/AuthContext';

export default function Dashboard(){
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) return <p>You do not hace access to this information</p>

    return(
        <div>
            <Grid/>
            <SubjectForm/>
        </div>
    )
}