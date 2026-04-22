import connectDb from "@/src/lib/db"
import Order from "@/src/models/order.model"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req:NextRequest,context: { params: Promise<{ orderId: string; }>; }) {
    try {
        await connectDb()
        const {orderId}=await context.params
        console.log("orderid",orderId)
        const order=await Order.findById(orderId.trim()).populate("assignedDeliveryBoy")
        if(!order){
            return NextResponse.json(
                {message:"order not found"},
                {status:400}
            )
        }
           return NextResponse.json(
                order,
                {status:200}
            )
           
    } catch (error) {
           return NextResponse.json(
                {message:`get order by error ${error}`},
                {status:500}
            )
        
    }
}