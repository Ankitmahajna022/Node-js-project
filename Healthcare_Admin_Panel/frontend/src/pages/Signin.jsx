import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/authApi'


export default function Signin() {
const[email,setEmail]=useState("")
const [password,setPassword]=useState("")
const navigate=useNavigate()

const handlSignin=async(e)=>{
   e.preventDefault();

   if (!email || !password) {
      alert("All fields are required");
      return;
    }


  try {
   await api.post("/auth/signin", { email, password });

    alert("Signin successful..!")
    navigate("/verifyotp",{state:{email}})


  } catch (error) {
    alert(error.response?.data?.message || "Signin failed");
  }
 }

  return (
    <div className='signin-main'>
      <form  onSubmit={handlSignin}>
        <h2>Signin</h2>
        <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
         <button type="submit">Signin</button>
      </form>
    </div>
  )
}
