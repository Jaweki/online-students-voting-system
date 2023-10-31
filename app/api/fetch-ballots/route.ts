import BallotSchema from "@/models/ballotSchema";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";


export const GET = async(req: NextRequest, res: NextResponse) => {
    try {
        const isConnected = await connectToDB();
        
        if (!isConnected) {
            throw new Error("Failed to connect to DB.");
        }
        
        const ballots = await BallotSchema.find({});
        
        return new NextResponse(JSON.stringify({ success: ballots}), { status: 200 });
    } catch (error) {
        console.log("Error: ", error);
        return new NextResponse(JSON.stringify({ fail_message: "Internal server Error!"}), { status: 500 });
    }
}