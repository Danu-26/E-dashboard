import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        let result = await fetch("http://localhost:3001/login", {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        result = await result.json();
        console.warn(result);

        if (result.auth) {
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate('/');
        } else {
            setErrorMessage("Incorrect details. Please check your email and password.");
        }
    }

    return (
        <div className='login'>
            <h1>Login</h1>
            <input className="inputBox" type="text" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
            <input className="inputBox" type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
            
            {errorMessage && <div className="invalid-input">{errorMessage}</div>}

            <button className="appButton" type="button" onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login;
