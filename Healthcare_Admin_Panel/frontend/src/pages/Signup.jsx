import React from 'react'
import {api} from "../services/authApi"
import { useState } from 'react'

function Signup() {
 const [email,setEmail]=useState("")
 const [password,setPassword]=useState("")

 const handlSignup=async(e)=>{
   e.preventDefault();

   if (!email || !password) {
      alert("All fields are required");
      return;
    }

    console.log(api)

  try {
   await api.post("/auth/signup", { email, password });

    alert("Signup successful..!")
  } catch (error) {
    alert(error.response?.data?.message || "Signup failed");
  }
 }


  return (
    <div className='signup-page'>

      <form  onSubmit={handlSignup}>
        <h2>Signup</h2>
        <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
         <button type="submit">Signup</button>
      </form>

    </div>

  )
}

export default Signup