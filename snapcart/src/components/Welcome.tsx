'use client'
import { motion } from 'motion/react'
import React from 'react'
import { ShoppingBasket,Bike,ArrowRight } from 'lucide-react'
type propType={
    nextStep:(n:number)=>void
}
function Welcome({ nextStep }:propType) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center p-6  bg-linear-to-b from-green-200 to-white'>
      <motion.div
        initial={{
            opacity:0,y:-10
        }}
        animate={{
            opacity:1,y:0
        }}
        transition={{
            duration:0.7
        }}
       className='flex items-center gap-3'
      >
         <ShoppingBasket className='w-10 h-15 text-green-600'/>
        <h1 className='text-4xl md:text-5xl font-extrabold text-green-700'>Snapcart</h1>
      </motion.div>
       <motion.p
        initial={{
            opacity:0,y:10
        }}
        animate={{
            opacity:1,y:0
        }}
        transition={{
            duration:0.7,
            delay:0.5
        }} 
       className='text-lg text-gray-700 md:text-xl max-w-lg mt-4'>Your one-stop destination for fresh groceries, organic produce, and daily essentials delivered right to your doorstep.</motion.p>
       <motion.div
        initial={{
         opacity:0,y:10,scale:0.9
        }}
        animate={{
            opacity:1,y:0,scale:1
        }}
        transition={{
            duration:0.7,
            delay:0.5
        }}
       className='mt-10 flex items-center gap-10 justify-center'>
         <ShoppingBasket className='w-24 h-24 md:w-32 md:h-32 text-green-600 drop-shadow-md'/>
         <Bike className='w-24 h-24 md:w-32 md:h-32 text-orange-600 drop-shadow-md'/>
       </motion.div>
       <motion.button 
        initial={{
            opacity:0,y:20
        }}
        animate={{
            opacity:1,y:0
        }}
        transition={{
            duration:0.7,
            delay:0.8
        }} 
        className='bg-green-500 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-2xl inline-flex items-center gap-2 shadow-md transition-all duration-200 mt-10'
        onClick={()=>nextStep(2)}
       >
        Next
        <ArrowRight/>
       </motion.button>
    </div>
  )
}

export default Welcome
