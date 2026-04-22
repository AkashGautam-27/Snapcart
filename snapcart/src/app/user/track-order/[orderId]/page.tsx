'use client'
import LiveMap from '@/src/components/LiveMap'
import { getSocket } from '@/src/lib/socket'
import { IUser } from '@/src/models/user.model'
import { RootState } from '@/src/redux/store'
import axios from 'axios'
import { ArrowLeft, ArrowRight, Send } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {motion} from 'motion/react'
import { IMessage } from '@/src/models/message.model'

interface IOrder{
    _id?:string
    user:string
    items:[
        {
            grocery:string,
            name:string,
            price:string,
            unit:string,
            image:string,
            quantity:number
        }
    ],
    ispaid:boolean,
    totalAmount:number,
    paymentMethod:"cod"|"online"
    address:{
        fullName:string,
        city:string,
        state:string,
        pincode:string,
        fullAddress:string,
        mobile:string,
        latitude:number,
        longitude:number
    }
    assignment?:string,
    assignedDeliveryBoy?:IUser
    status:"pending"|"Out of delivery" | "delivered",
    createdAt?:Date
    updatedAt?:Date
}
interface ILocation{
  latitude:number,
  longitude:number
}
function TrackOrder({params}:{params:{orderId:string}}) {
    const {orderId}=useParams()
    const [order,setOrder]=useState<IOrder>()
    const {userData}=useSelector((state:RootState)=>state.user)
    const [newMessage,setNewMessage]=useState("")
    const [messages,setMessages]=useState<IMessage[]>()
    const router=useRouter()
    const [userLocation, setUserLocation] = useState<ILocation>({
       latitude:0,
       longitude:0
     })
     const [deliveryBoyLocation, setDeliveryBoyLocation] = useState<ILocation>({
       latitude:0,
       longitude:0
     })



    useEffect(()=>{
const getOrder=async ()=>{
    try {
        const result=await axios.get(`/api/user/get-order/${orderId}`)
        setOrder(result.data)
        setUserLocation({
            latitude:result.data.address.latitude,
            longitude:result.data.address.longitude
        })
         setDeliveryBoyLocation({
            latitude:result.data.assignedDeliveryBoy.location.coordinates[1],
            longitude:result.data.assignedDeliveryBoy.location.coordinates[0]
        })
        
    } catch (error:any) {
        console.log(error?.response?.data)
    }
}
getOrder()
    },[userData?._id])


    useEffect(():any=>{
        const socket=getSocket()
        socket.on("update-deliveryBoy-location",({data})=>{
            // if(userId.toString()===order?.assignedDeliveryBoy?._id?.toString()){
                setDeliveryBoyLocation({
                     latitude:data.location.coordinates?.[1] ?? data.location.latitude,
                    longitude:data.location.coordinates?.[0] ?? data.location.longitude,
                })
            })
        return ()=>socket.off("update-deliveryBoy-location")
    },[order])

// const  cleanId=Array.isArray(orderId)? orderId[0].trim():orderId?.trim()
    
// useEffect(()=>{
// const socket=getSocket()
// socket.emit("join-room",orderId)
// },[])
// const sendMsg=()=>{
// const socket=getSocket()
// const message={
// roomId:orderId,
// text:newMessage,
// senderId:userData?._id,
// time:new Date().toLocaleTimeString([],{
//     hour:"2-digit",
//     minute:"2-digit",
//     second:"2-digit"
// })
// }
// socket.emit("send-message",message)
// socket.on("send-message",(message)=>{
//     if(message.roomId===orderId){
//     setMessages((prev)=>[...prev!,message])
//     }
// })
// setNewMessage("")
// }
// useEffect(()=>{
//     const getAllMessages=async ()=>{
//         try {
//             const result=await axios.post("/api/chat/messages",{roomId:orderId})
//             setMessages(result.data)
//         } catch (error:any) {
//             console.log(error?.response?.data)
//         }
//     }
// getAllMessages()
// },[])
  return (
    <div className='w-full min-h-screen bg-linear-to-b from-green-50 to-white'>
      <div className='max-w-2xl mx-auto pb-24'>
        <div className='sticky top-0 bg-white/80 backdrop-blur-xl p-4 border border-b shadow flex gap-3 items-center z-999'>
            <button className='p-2 bg-green-100 rounded-full' onClick={()=>router.back()}><ArrowLeft size={20} className='text-green-700'/></button>
            <div>
                <h2 className='text-xl font-bold'> Track Order </h2>
                <p className='text-sm text-gray-600'> Order #{order?._id?.toString().slice(-6)} <span className='text-green-700 font-semibold'> {order?.status} </span></p>
            </div>
        </div>
        <div className='px-4 mt-6 space-y-4'>
            <div className='rounded-3xl overflow-hidden border shadow'>
                <LiveMap userLocation={userLocation} deliveryBoyLocation={deliveryBoyLocation}/>
            </div>

  {/* <div className='bg-white rounded-3xl shadow-lg border p-4 h-107.5 flex flex-col'>

<div className='flex-1 overflow-y-auto chat-scroll p-2 space-y-3'>
    <AnimatePresence>
        {messages?.map((msg,index)=>(
            <motion.div
            key={msg._id?.toString()}
            initial={{opacity:0,y:15}}
            animate={{opacity:1,y:0}}
            exit={{opacity:0}}
            transition={{duration:0.4}}
            className={`flex ${msg.senderId==userData?._id?"justify-end":"justify-start"}`}
            >
                <div className={`px-4 py-2 max-w-[75%] rounded-2xl shadow ${
                    msg.senderId==userData?._id
                    ?"bg-green-600 text-white rounded-br-none":"bg-gray-100 text-gray-800 rounded-bl-none"
                }`}>
                <p >{msg.text}</p>
                <p className='text-[10px] opacity-70 mt-1 text-right'>{msg.time}</p>

                </div>

            </motion.div>
        ))}
    </AnimatePresence>
</div>

      <div className='flex gap-2 mt-3 border-t pt-3'>
        <input type="text" placeholder='Type a Message...' className='flex-1 bg-gray-100 px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-green-500' value={newMessage} onChange={(e)=>setNewMessage(e.target.value)}/>
        <button className='bg-green-600 hover:bg-green-700 p-3 rounded-xl text-white' onClick={sendMsg}><Send size={18}/></button>
      </div>
    </div> */}


        </div>
      </div>
    </div>
  )
}

export default TrackOrder
