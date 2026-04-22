'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import axios from 'axios'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import AdminOrderCard from '@/src/components/AdminOrderCard'
import { getSocket } from '@/src/lib/socket'
import { IUser } from '@/src/models/user.model'

interface IOrder {
  _id?: string
  user: string
  items: [
    {
      grocery: string,
      name: string,
      price: string,
      unit: string,
      image: string,
      quantity: number
    }
  ],
  ispaid: boolean,
  totalAmount: number,
  paymentMethod: "cod" | "online"
  address: {
    fullName: string,
    city: string,
    state: string,
    pincode: string,
    fullAddress: string,
    mobile: string,
    latitude: number,
    longitude: number
  }
  assignment?: string,
  assignedDeliveryBoy?: IUser
  status: "pending" | "Out of delivery" | "delivered",
  createdAt?: Date
  updatedAt?: Date
}
function ManageOrders() {

  const router = useRouter()
  const [orders, setOrders] = useState<IOrder[]>()
  useEffect(() => {
    const getOrders = async () => {
      try {
        const result = await axios.get("/api/admin/get-orders")
        setOrders(result.data)
      } catch (error) {
        console.log(error)
      }
    }
    getOrders()
  }, [])



  useEffect(() => {
    const socket = getSocket()
    socket.on("new-order", (newOrder) => {
      setOrders((prev) => [newOrder, ...prev!])
    })

    socket.on("order-assigned", ({ orderId, assignedDeliveryBoy }) => {
      setOrders((prev) => prev?.map((o) => (
        o._id?.toString() == orderId?.toString() ? { ...o, assignedDeliveryBoy } : o
      )))
    })
    socket.on("order-status-update", ({ orderId, status }) => {
      setOrders((prev) => prev?.map((o) => (
        String(o._id) === String(orderId)
          ? { ...o, status }
          : o
      )))
    })

    return () => {
      socket.off("new-Order")
      socket.off("order-assigned")
      socket.off("order-status-update")


    }
  }, [])

  return (
    <div className='min-h-screen bg-gray-50 w-full'>
      <div className='fixed top-0 left-0 w-full backdrop-blur-lg bg-white/70 shadow-sm border-b z-50'>
        <div className='max-w-3xl mx-auto flex items-center gap-4 px-4 py-3'>
          <button className='p-2 bg-gray-100 rounded-full hover:bg-gray-200 active:scale-95 transition' onClick={() => { router.push("/") }}>
            <ArrowLeft className='text-green-700' size={24} />
          </button>
          <h1 className='text-xl font-bold text-gray-800'>Manage Orders</h1>
        </div>
      </div>
      <div className='max-w-6xl mx-auto px-4 pt-24 pb-16 space-y-8'>
        <div className='space-y-6'>
          {orders?.map((order, index) => (
            <AdminOrderCard key={order._id?.toString()} order={order} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ManageOrders
