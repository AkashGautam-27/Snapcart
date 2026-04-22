import { auth } from "@/src/app/auth";
import connectDb from "@/src/lib/db";
import DeliveryAssignment from "@/src/models/deliveryAssignment.model";
import { NextResponse } from "next/server";
import "@/src/models/order.model"
import "@/src/models/user.model"
import "@/src/models/deliveryAssignment.model"

export async function GET() {
    try {
        await connectDb()
        const session=await auth()
        const assignments=await DeliveryAssignment.find({
            brodcastedTo:session?.user?.id,
            status:"brodcasted"
        }).populate("order")
        return NextResponse.json(
           assignments,
           {status:200}
        )
    } catch (error) {
          return NextResponse.json(
            {message:` get assignments error${error}`},{status:200}
        )
    }
    
}