import axios from "axios";
import { useEffect, useState } from "react"
import "./register.css"

export default function Register() {
  const [username,setUsername]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState(false);


    const handleSubmit=async(e)=>{
      e.preventDefault();
      setError(false)
    try{
const res=await axios.post('http://localhost:5000/auth/register',{
  username,email,password
});
res.data && window.location.replace('/login');

 }
    
    catch(err){
setError(err)
    }
  }
  
    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="registerInput" type="text" onChange={e=>setUsername(e.target.value)} placeholder="Enter your username..." />
        <label>Email</label>
        <input className="registerInput" type="text" onChange={e=>setEmail(e.target.value)} placeholder="Enter your email..." />
        <label>Password</label>
        <input className="registerInput" type="password" onChange={e=>setPassword(e.target.value)} placeholder="Enter your password..." />
        <button className="registerButton" type="submit">Register</button>
      </form>
        <button className="registerLoginButton">Login</button>
        {error && 
        <span style={{color:'red',marginTop:'10rem'}}>Something went Wrong</span>
        }
    </div>
    )
}
