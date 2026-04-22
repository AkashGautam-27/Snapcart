import React from 'react'
import DeliveryBoyDashboard from './DeliveryBoyDashboard'
import { auth } from '../app/auth'
import connectDb from '../lib/db'
import Order from '../models/order.model'

async function DeliveryBoy() {
  await connectDb()
  const session=await auth()
  const deliveryBoyId=session?.user?.id
  const orders=await Order.find({
    assignedDeliveryBoy:deliveryBoyId,
    deliveryOtpVerification:true
  })
  const today=new Date().toDateString()
  const todayOrders=orders.filter((o)=>new Date(o.deliveredAt).toDateString()===today).length
  const todayEarning=todayOrders * 40
  orders.forEach((o) => {
  console.log("DeliveredAt:", o.deliveredAt)
})
  return (
    <>
      <DeliveryBoyDashboard earning={todayEarning}/>
    </>
  )
}

export default DeliveryBoy
