import connectDb from "@/src/lib/db";
import emitEventHandler from "@/src/lib/emitEventHandler";
import Order from "@/src/models/order.model";
import User from "@/src/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import DeliveryAssignment  from "@/src/models/deliveryAssignment.model"

export async function POST(req:NextRequest){
    try {
        await connectDb()
        const {userId,items,paymentMethod,totalAmount,address}=await req.json()
        if(!items || !userId || !paymentMethod || !totalAmount || !address){
             return NextResponse.json(
                {message:"please send all credentials"},
                {status:400}
            )
        }
        const user=await User.findById(userId)
        console.log(userId)
        console.log(user)
        if(!user){
            return NextResponse.json(
                {message:"user not found"},
                {status:400}
            )
        }
        const newOrder=await Order.create({
            user:userId,
            items,
            paymentMethod,
            totalAmount,
            address
        })
        await emitEventHandler("new-order",newOrder)
         return NextResponse.json(
                newOrder,
                {status:201}
            )
        
    } catch (error) {
          return NextResponse.json(
                {message:`place order error ${error}`},
                {status:500}
            )
    }
}
