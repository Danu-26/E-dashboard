import React,{useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
const Signup=()=>{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState(false);
    const navigate=useNavigate();

    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    })
    const collectData=async()=>{
        if(!name ||  !email || !password ){
            setError(true);
           return false;
       }
        console.warn(name,email,password);
        let result=await fetch("http://localhost:3001/register",{
            method:'POST',
            body:JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        result=await result.json();
        console.warn(result);
        localStorage.setItem("user",JSON.stringify(result.result))
        localStorage.setItem("token",JSON.stringify(result.auth))
        navigate('/');
    }
    return(
        <div className="register">
            <h1>Register</h1>
            <input className="inputBox"  type="text" placeholder="Enter your name " value={name} onChange={(e)=>setName(e.target.value)}/>
            {error && !name && <span className='invalid-input'>Enter valid name</span>} 
            <input className="inputBox"  type="text" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            {error && !email && <span className='invalid-input'>Enter valid email</span>} 
            <input className="inputBox"  type="password" placeholder="Enter password " value={password} onChange={(e)=>setPassword(e.target.value)}/>
            {error && !password && <span className='invalid-input'>Enter valid password</span>} 
            <button onClick={collectData} className="appButton" type="button">Sign Up</button>
        </div>
    );
};



export default Signup;