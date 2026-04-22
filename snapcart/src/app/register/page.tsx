'use client'
import RegisterFrom from '@/src/components/RegisterFrom'
import Welcome from '@/src/components/Welcome'
import React, { useState } from 'react'
function Register() {
    const [step,setStep] =useState(1)
  return (
    <div>
        {step==1 ?<Welcome nextStep={setStep}/>:<RegisterFrom previousStep={setStep}/>}
    </div>
  )
}

export default Register
