import connectDb from "@/src/lib/db";
import Message from "@/src/models/message.model";
import Order from "@/src/models/order.model";
import  mongoose  from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        await connectDb()
        const {roomId}=await req.json()
         const cleanRoomId=roomId.trim() 
        if(!mongoose.isValidObjectId(cleanRoomId)){
            return NextResponse.json(
                {message:"invali order id"},
                {status:400}
            )
        }
        let room=await Order.findById(cleanRoomId)
        if(!room){
        return NextResponse.json(
        {message:"room not found"},
            {status:400}
        )
        }
        const messages=(await Message.find({roomId:cleanRoomId}))
        return NextResponse.json(
            messages,
            {status:200}
        )
    } catch (error) {
           return NextResponse.json(
        {message:`get messages error ${error}`},
            {status:500}
        )
    }
}