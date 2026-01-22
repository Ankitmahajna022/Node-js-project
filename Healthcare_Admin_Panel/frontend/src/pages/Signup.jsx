import React from 'react'
import {api} from "../services/authApi"
import { useState } from 'react'
import {useNavigate} from "react-router-dom"

function Signup() {
 const [email,setEmail]=useState("")
 const [password,setPassword]=useState("")
 const navigate = useNavigate()

 // navigate to signin page, handl signup api and state 
 const handlSignup=async(e)=>{
   e.preventDefault();

   if (!email || !password) {
      alert("All fields are required");
      return;
    }
  

  try {
   await api.post("/auth/signup", { email, password });

    alert("Signup successful..!")
      navigate("/signin")


  } catch (error) {
    alert(error.response?.data?.message || "Signup failed");
  }
 }


  return (
    <div className='signup-page'>

      <form  onSubmit={handlSignup}>
        <h2>Signup</h2>
        <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder='Password' value={password}  maxLength={6} onChange={(e)=>setPassword(e.target.value)}/>
         <button type="submit">Signup</button>
      </form>

    </div>

  )
}

export default Signup