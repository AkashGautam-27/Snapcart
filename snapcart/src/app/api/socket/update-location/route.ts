import connectDb from "@/src/lib/db";
import User from "@/src/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDb()
        const { userId, location } = await req.json()
        if (!userId || !location) {
            return NextResponse.json(
                { message: "missing userid or location" },
                { status: 400 }
            )
        }
         if (
            location.type !== "Point" ||
            !Array.isArray(location.coordinates) ||
            location.coordinates.length !== 2
        ) {
            return NextResponse.json(
                { message: "Invalid location format" },
                { status: 400 }
            )
        }
        const user = await User.findByIdAndUpdate(userId, { location },{new:true,runValidators:true})
        if (!user) {
            return NextResponse.json(
                { message: "user not found" },
                { status: 400 }
            )
        }
         return NextResponse.json(
                { message: "location Updated",user },
                { status: 200 }
            )

    } catch (error) {
        return NextResponse.json(
            { message: `update locaton erroe ${error}` },
            { status: 500 }
        )
    }
}