import { auth } from "@/src/app/auth";
import connectDb from "@/src/lib/db";
import Grocery from "@/src/models/grocery.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        await connectDb()
        const session= await auth()
        if(session?.user?.role!=="admin"){
            return NextResponse.json(
                {message:"you are not admin"},
                {status:400}
            )
        }
      const {groceryId}=await req.json()
        const grocery=await Grocery.findByIdAndDelete(groceryId)
        return NextResponse.json(
                grocery,
                {status:200}
            )
    } catch (error:any) {
                console.log(error?.message)

        return NextResponse.json(
                {message:`delete grocery error ${error}`},
                {status:500}
            )
    }
}

