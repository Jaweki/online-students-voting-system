import UserToBallotSchema from "@/models/userToBallotSchema";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

type RequestType = {
    userId: string;
}

export const POST = async(req: NextRequest, res: NextResponse) => {
    try {
        const { userId }: RequestType = await req.json();

        const isConnected = await connectToDB();

        if (!isConnected) {
            throw new Error("Failed to connect to DB");
        }

        const result = await UserToBallotSchema.findOne({
            userId,
        });

        if (!result) {
            throw new Error("User to ballot relation requested not found in db.");
        }

        return new NextResponse(JSON.stringify({ success: result }), { status: 201 });

    } catch (error) {
        console.log("Error: ", error);
        return new NextResponse(JSON.stringify({ fail_message: `${error}` }), { status: 500 });
    }
}