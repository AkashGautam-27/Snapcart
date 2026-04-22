'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { UserCog, User2, Bike, ArrowRight } from 'lucide-react'
import axios from 'axios'
import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/navigation'
import { NextResponse } from 'next/server'
import { useSession } from 'next-auth/react'


export default function EditRoleMobile() {
    const [roles,setRoles] =useState([
    {id:"admin",label:"Admin",icon:UserCog},
    {id:"user",label:"User",icon:User2},
    {id:"deliveryBoy",label:"Delivery Boy",icon:Bike}
    ])
    const [selectedRole,setSelectedRole] =useState("")
    const [mobile,setMobile] =useState("")
    const{update}=useSession()
    const router=useRouter()
    const handleEdit=async()=>{
        try {
            const result=await axios.post("/api/user/edit-role-mobile",
                {
                    role:selectedRole,
                    mobile
                }
            )
            await update({role:selectedRole})
            router.push("/")
        } catch (error) {
            console.error("Error editing role:", error)
        }
    }


  
    useEffect(()=>{
          const checkForAdmin=async()=>{
        try {
            const result=await axios.get("/api/check-for-admin")
            if(result.data.adminExist){
                setRoles(prev=>prev.filter(r=>r.id!=="admin"))
            }
        } catch (error) {
            console.log(error)
        }
    }
    checkForAdmin()
    },[])
  return (
    <div className='flex flex-col items-center min-h-screen p-6 w-full bg-white'>
      <motion.h1
       initial={{
            opacity:0,y:-25
        }}
        animate={{
            opacity:1,y:0
        }}
        transition={{
            duration:0.7
        }}
      className='text-3xl font-bold text-green-700 mt-8 text-center'
      >
        Select Your Role</motion.h1>
     <div className='flex flex-col md:flex-row justify-center items-center gap-6 mt-10'>
        {roles?.map((role)=>{
            const Icon=role.icon
            const isSelected=selectedRole===role.id
            return(
                <motion.div
                key={role.id}
                whileTap={{scale:0.4}}
                onClick={()=>setSelectedRole(role.id)}
                 initial={{
            opacity:0,y:20
        }}
        animate={{
            opacity:1,y:0
        }}
        transition={{
            duration:0.5
        }}
                className={`cursor-pointer flex flex-col items-center justify-center gap-3 w-48 h-44 rounded-2xl border-2 transition-all ${isSelected?"border-green-600 bg-green-200 shadow-lg":"border-gray-300 bg-white hover:border-green-400"}`}
                >
                    <Icon/>
                    <span>{role.label}</span>
                </motion.div>
            )
        })}
     </div>
     <motion.div
       initial={{
            opacity:0
        }}
        animate={{
            opacity:1
        }}
        transition={{
            delay:0.5,
            duration:0.8
        }}
        className='flex items-center flex-col mt-10'
     > 
     <label htmlFor="mobile" className='text-gray-700 font-medium mb-2'>Enter Your Mobile Number</label>
     <input type="tel" id="mobile" placeholder="123-456-7890" className="w-64 md:w-80 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-800 text-center"
     onChange={(e)=>setMobile(e.target.value)}
     />
     </motion.div>
     <motion.button
         initial={{
            opacity:0,y:20
        }}
        animate={{
            opacity:1,y:0
        }}
        transition={{
            delay:0.7
        }}
        disabled={!selectedRole || mobile.length!==10}
        className={`inline-flex items-center gap-2 font-semibold py-3 px-8 rounded-2xl shadow transition duration-200 mt-10 ${selectedRole && mobile.length===10 ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
        onClick={handleEdit}
     >Go To Home <ArrowRight/>
     </motion.button>
    </div>
  )
}


