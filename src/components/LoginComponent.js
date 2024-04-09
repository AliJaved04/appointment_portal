import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';

const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submitHandler = async () => {
        if (username === "" || password === "") {
            if (username === "" && password === "") {
                toast.error("Username and Password Cannot be empty!")
            }
            else if (username === "") {
                toast.error("Username Cannot be empty!")
            }
            else {
                toast.error("Password Cannot be empty!")
            }
        }
        else {
            try {
                const response = await fetch('https://hiring-test-task.vercel.app/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username,
                        password
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    navigate('/dashboard');
                } else {
                    toast.error("Username or Password is incorrect");
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error("An error occurred while processing your request. Please try again later.");
            }
        }
    };

    return (
        <div className="main_login">
            <Toaster richColors closeButton={true} position='top-right' />
            <div className="logo">
                CCript
            </div>
            <div >
                <div style={{ marginBottom: "20px" }}>
                    <label style={{ fontWeight: "bold" }}>Username</label>
                    <div className="sub-container">
                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(event) => { setUsername(event.target.value) }}
                            className="input-field"
                        />
                    </div>
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <label style={{ fontWeight: "bold" }}>Password</label>
                    <div className="sub-container">
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }}
                            className="input-field"
                        />
                    </div>
                </div>
                <button onClick={submitHandler} className='submitBtn'>
                    Sign In
                </button>
            </div>
        </div>
    );
}

export default LoginComponent;
