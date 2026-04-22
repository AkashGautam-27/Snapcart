'use client'
import { Leaf, ShoppingBasket, Smartphone, Truck } from 'lucide-react'
import { AnimatePresence,motion } from 'motion/react'
import { button } from 'motion/react-client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { getSocket } from '../lib/socket'



function HeroSection() {
   
   
   




    const slides=[
        {
            id:1,
            icon:<Leaf className='w-20 h-20 sm:w-28 sm:h-28 text-green-400 drop-shadow-lg' />,
            title:"Fresh Organic Groceries",
            subtitle:"Fram-fresh fruits, vegetables, and daily essentials delivered to you.",
            btnText:"Shop Now",
            bg:"https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3JnYW5pYyUyMGZvb2R8ZW58MHx8MHx8fDA%3D"
        },
          {
            id:2,
            icon:<Truck className='w-20 h-20 sm:w-28 sm:h-28 text-yellow-400 drop-shadow-lg' />,
            title:"Fast and Reliable delivery",
            subtitle:"We ensure your groceries reach your doorstep in no time.",
            btnText:"Order Now",
            bg:"https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVsaXZlcnl8ZW58MHx8MHx8fDA%3D"

        },
          {
            id:3,
            icon:<Smartphone className='w-20 h-20 sm:w-28 sm:h-28 text-blue-400 drop-shadow-lg' />,
            title:"Shop Anytime , Anywhere",
            subtitle:"Easy and seamless online grocery shopping experience.",
            btnText:"Got Started",
            bg:"https://media.istockphoto.com/id/1425139113/photo/purchasing-goods-with-smartphone-at-grocery-store.webp?a=1&b=1&s=612x612&w=0&k=20&c=kQHbQJ-PmXBgxDv8o9aihr8qAPqnDc3IvVYrex2aX5o="

        },
    ]
    const [current,setCurrent]=useState(0)
    useEffect(()=>{
        const timer = setInterval(()=>{
        setCurrent((prev)=>(prev+1)%(slides.length))
        },4000)
        return ()=>clearInterval(timer)
    },[])
  return (
    <div className='relative w-[95%] mx-auto mt-32 h-[80vh]  rounded-3xl overflow-hidden shadow-2xl'>
      <AnimatePresence mode='wait'>
        <motion.div
        key={current}
           initial={{
            opacity:0
        }}
        animate={{
            opacity:1
        }}
        transition={{
            duration:0.6
        }}
        exit={{
            opacity:0
        }}
        className='absolute inset-0'
        >

        <Image src={slides[current]?.bg }
                alt="slide"
                fill 
                priority
                className='object-cover'
        />
        <div className='absolute bg-black/50 backdrop:blur-[1px]'/>
        </motion.div>

      </AnimatePresence>
      <div className='absolute inset-0 flex text-center items-center justify-center text-white px-6'>
        <motion.div
           initial={{
            opacity:0,
            y:30
        }}
        animate={{
            opacity:1,
            y:0
        }}
        transition={{
            duration:0.4
        }}
       className='flex flex-col items-center justify-center gap-6 max-w-3xl'
        >
            <div className='bg-white/10 backdrop:blur-md p-6 rounded-full shadow-lg'>{slides[current].icon}
            </div>
            <h1 className='text-3xl sm:text-5xl m:text-6xl font-extrabold tracking-tight drop-shadow-lg'>{slides[current].title}</h1>
            <p className='text-lg sm:text-xl text-gray-200 max-w-2xl'>{slides[current].subtitle}</p>
            <motion.button 
            whileHover={{scale:1.4}}
            whileTap={{scale:0.8}}
             transition={{
            duration:0.1
        }}
            className='mt-4 bg-white text-green-700 hover:bg-green-200 px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 flex items-center gap-2'>
                <ShoppingBasket className='w-5 h-5'/>
                {slides[current].btnText}
            </motion.button>
        </motion.div>


<div className='absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3'>
{slides.map((_,index)=>(
    <button
    key={index}
    className={`w-3 h-3 rounded-full transition-all ${
        index === current ? "bg-white w-6 ":"bg-white/50"
    }`}>

    </button>
))}
</div>


      </div>
    </div>
  )
}

export default HeroSection
