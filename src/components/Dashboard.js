import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Appointments from "./Appointments";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const getData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `https://hiring-test-task.vercel.app/api/appointments`,
                {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/");
        } else {
            getData();
        }
    }, [navigate]);

    const contentRefresh = async () => {
        try {
            const response = await fetch(
                `https://hiring-test-task.vercel.app/api/refresh-token`,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error('Failed to refresh token');
            }
            const data = await response.json();
            localStorage.setItem("token", data.newToken);
            getData();
        } catch (err) {
            console.error("Failed to refresh token:", err);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <Navbar />
            {data && (
                <Appointments
                    contentRefresh={contentRefresh}
                    data={data}
                />
            )}
        </div>
    );
};

export default Dashboard;
