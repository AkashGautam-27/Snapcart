'use client'
import React from 'react'
import { motion } from 'motion/react'
import { ArrowRight, CheckCircle, Package } from 'lucide-react'
import Link from 'next/link'
function OrderSuccess() {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen px-6 text-center bg-linear-to-b from-green-100 to-white'>
            <motion.div
                initial={{
                    scale: 0, rotate: -180
                }}
                animate={{
                    scale: 1, rotate: 0
                }}
                transition={{
                    damping: 10,
                    type: "spring",
                    stiffness: 100
                }}
                className='relative'
            >

                <CheckCircle className='text-green-600 w-25 h-25 md:w-29 md:h-29' />
                <motion.div
                    initial={{
                        scale: 0.6, opacity: 0
                    }}
                    animate={{
                        scale: [1, 0.6, 1], opacity: [0.3, 0, 0.3]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut"
                    }}
                    className='absolute inset-0'
                >
                    <div className='w-full h-full rounded-full bg-green-900 blur-2xl' />
                </motion.div>
            </motion.div>
            <motion.h1
                initial={{
                    opacity: 0, y: 30
                }}
                animate={{
                    opacity: 1, y: 0
                }}
                transition={{
                    duration: 0.4,
                    delay: 0.3
                }}
                className='text-3xl md:text-4xl font-bold text-green-700 mt-6'
            >
                Order Placed Successfully
            </motion.h1>
            <motion.p
                initial={{
                    opacity: 0, y: 30
                }}
                animate={{
                    opacity: 1, y: 0
                }}
                transition={{
                    duration: 0.4, delay: 0.6
                }}
                className='text-gray-600 mt-3 text-sm md:text-base max-w-md'>
                Thank you for shopping with us! Your order has been placed and is being processed. You can track its process in your <span className='font-semibold text-green-700'>   My Orders  </span>section.
            </motion.p>

            <motion.div

                initial={{
                    y: 40, opacity: 0
                }}
                animate={{
                    y: [0, -10, 0], opacity: 1
                }}
                transition={{
                    repeat: Infinity,
                    delay: 1,
                    duration: 2,
                    ease: "easeInOut"
                }}
                className='mt-10'>
                <Package className='w-16 h-16 md:w-20 md:h-20 text-green-500' />
            </motion.div>
            <motion.div

                initial={{
                    opacity: 0, scale: 0.9
                }}
                animate={{
                    opacity: 1, scale: 1
                }}
                transition={{
                    duration: 0.4, delay: 1.2
                }}
                className='mt-12'>
                <Link href={"/user/my-orders"}>
                    <motion.div
                        whileTap={{ scale: 0.80 }}
                        whileHover={{ scale: 1.10 }}
                        className='bg-green-600 text-white rounded-full hover:bg-green-700 transition-all font-semibold flex items-center gap-2 shadow-lg px-8 py-3 text-base' >
                        Go to My Order Page <ArrowRight />
                    </motion.div>
                </Link>
            </motion.div>


            <motion.div

                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: [0.2, 0.6, 0.2]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                }}
                className='absolute top-0 left-0 w-full h-full pointer-events-none'
            >
                <div className='absolute top-20 left-[10%] w-2 h-2 bg-green-400 rounded-full animate-bounce' />
                <div className='absolute top-32 left-[30%] w-2 h-2 bg-green-400 rounded-full animate-pulse' />
                <div className='absolute top-24 left-[50%] w-2 h-2 bg-green-400 rounded-full animate-bounce' />
                <div className='absolute top-16 left-[70%] w-2 h-2 bg-green-400 rounded-full animate-pulse' />

            </motion.div>
        </div>
    )
}

export default OrderSuccess
