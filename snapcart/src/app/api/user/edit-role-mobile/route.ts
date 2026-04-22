import { auth } from "@/src/app/auth";
import connectDb from "@/src/lib/db";
import User from "@/src/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
try {
    await connectDb()
    const {role,mobile}=await request.json()
    const session=await auth()
    const user=await User.findOneAndUpdate({email:session?.user?.email},{role,mobile},{new:true,upsert:true},)
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
        
} catch (error) {
     return NextResponse.json(
            {message:`edit role and mobile error ${error} `},
            {status:500}
        )
}
}