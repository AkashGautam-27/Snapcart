import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../auth";
import User from "@/src/models/user.model";
import connectDb from "@/src/lib/db";

export async function GET(req:NextRequest){
    try {
        await connectDb()
        const session=await auth()
        console.log(session)
        if(!session || !session.user){
            return NextResponse.json(
                {message:"user is not authenticated"},
                {status:400}
            )
        }
        if(!session.user.email){
            return NextResponse.json(
                {message:"email missing in session"},
                {status:400}
            )
        }
        const user=await User.findOne({email:session.user.email}).select
        ("-password")
        if(!user){
            return NextResponse.json(
                {message:"user not found"},
                {status:400}
            )
        }
         return NextResponse.json(
                user,
                {status:200}
         )
    } catch (error:any) {
         return NextResponse.json(
        {message:error.message},
        {status:500}
         )
        
    }
}