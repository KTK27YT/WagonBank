"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import { getUserTokenSession } from '@/components/Auth/auth';

const Dashboard = () => {
    const [user_token, setUserToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        const token = getUserTokenSession();
        setUserToken(token);
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome to the dashboard!</p>
            <p>Your user token is: {user_token}</p>
        </div>
    );
};

export default Dashboard;