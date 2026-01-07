import { useState } from "react"
import axios from "axios"

export default function Signup() {
const [email,setEmail]=useState("")
 const [password,setPassword]=useState("")   

 const handleSignup=async(e)=>{
        e.preventDefault()

        try {
            await axios.post("http://localhost:5000/api/auth/signup",{email,password})
            alert("Signup successful");
        } catch (error) {
            alert(err.response?.data?.message || "Error");
        }
    }
  return (
    
    <div>
      <form onSubmit={handleSignup}>
        <h2>Signup</h2>
        <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
         <button>Signup</button>
      </form>
    </div>
  )
}
