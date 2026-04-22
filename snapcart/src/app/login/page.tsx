'use client'
import { ArrowLeft, EyeIcon, EyeOff, Leaf, Loader2, Lock, LogIn, Mail,  Router,  User } from 'lucide-react'
import React, { FormEvent, useState } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import googleImage from "@/src/assets/google.png"
import axios from 'axios'

import { signIn, useSession } from 'next-auth/react'
import { set } from 'mongoose'
import { useRouter } from 'next/navigation'


function Login() {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [showPassword,setShowPassword]=useState(false)
    const [loading,setLoading]=useState(false)
    const router=useRouter()
    const session=useSession()
    console.log(session)
    const handleLogin=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoading(true) 
        try {
            const result=await signIn("credentials",{
                email,
                password,
                redirect:false
            })
            router.push("/")
            
            console.log(result)
            setLoading(false)
        } catch (error) {
            console.error("Error during login:", error)
            setLoading(false)
        }   
    }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative'>
  
        <motion.h1 
        initial={{
            opacity:0,y:-10
        }}
        animate={{
            opacity:1,y:0
        }}
        transition={{
            duration:0.7
        }}
        className='cursor-pointer text-4xl font-extrabold text-green-700 mb-2'>Welcome Back</motion.h1>
        <motion.p 
        className='cursor-pointer text-gray-600 mb-8 flex items-center'
        initial={{
            opacity:0,y:10
        }}
        animate={{
            opacity:1,y:0
        }}
        transition={{
            duration:0.7,
            delay:0.2
        }}
        >Login to Snapcart <Leaf className='cursor-pointer w-5 h-5 text-green-400'/></motion.p>
        <motion.form
       
         initial={{
            opacity:0,y:20
        }}
        animate={{
            opacity:1,y:0
        }}
        transition={{
            duration:0.7,
            delay:0.4
        }}
        className='flex flex-col gap-5 w-full max-w-sm'
        onSubmit={handleLogin}
        >
        
             <div className='relative'>
            <Mail className='absolute left-3 top-3.5 text-gray-400 w-5 h-5'/>
            <input type="email" placeholder='Your Email' className='w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 '
             onChange={(e)=>
                setEmail(e.target.value)}
                value={email}
             />
           </div>
             <div className='relative'>
            <Lock className='absolute left-3 top-3.5 text-gray-400 w-5 h-5'/>
             <input type={showPassword ? "text" : "password"} placeholder='EnterPassword' className='w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500'
             onChange={(e)=>
                setPassword(e.target.value)}
                value={password}
             />
             {showPassword ? <EyeOff className='cursor-pointer right-3 top-3.5 absolute text-gray-500 w-5 h-5' onClick={()=>setShowPassword(false)}/> : <EyeIcon className='cursor-pointer right-3 top-3.5 absolute text-gray-500 w-5 h-5' onClick={()=>setShowPassword(true)}/>}
           </div>
         


{
    (()=>{
        const formValidation=email!=="" && password!==""
       return <button disabled={!formValidation} className={`w-full py-3 rounded-xl transition-all duration-200 shadow-md inline-flex items-center justify-center gap-2 ${formValidation ? "bg-green-500 hover:bg-green-700 text-white cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
        {loading?<Loader2 className='w-5 h-5 animate-spin'/>:"Login"}
         </button>
    })()
}


<div className='flex items-center gap-2 text-gray-600 text-sm mt-2 w-full'>
    <span className='flex-1 h-px bg-gray-300'></span>
    OR
    <span className='flex-1 h-px bg-gray-300'></span>
</div>

<div className='cursor-pointer w-full py-3 flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 rounded-xl text-gray-700 font-medium transition-all duration-200' onClick={()=>signIn("google",{callbackUrl:"/"})}>
    <Image src={googleImage} alt="Google" width={20} height={20} />
    Continue with Google
</div>


        </motion.form>

<p className='cursor-pointer text-gray-600 text-sm mt-6 flex items-center gap-1' onClick={()=>router.push("/register")}>Want to create an Account? <LogIn className='w-4 h-4'/><span className='text-green-600'> Sign Up</span></p>

    </div>
  )
}

export default Login




 
           
