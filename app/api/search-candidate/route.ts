import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import userSchema from "@/models/userSchema";

export const POST = async(req: NextRequest, res: NextResponse) => {
    try {
        const payloadData = await req.formData();
        const userId = payloadData.get('userId');
        const conn = await connectToDB();

        if (conn) {
            const userFound = await userSchema.findOne({
                userId
            }, { _id: 0, password: 0, email: 0 })

            if (!userFound) {
                return new NextResponse(JSON.stringify({ fail_message: "403.Requested candidate not a user registered in the system"}), { status: 403});
            }
            return new NextResponse(JSON.stringify({ success: userFound }), { status: 200 })
        } else {
            throw new Error("500.Internal server error. system failed to connect to DB.");
        }

    } catch (error) {
        console.log("Error: ", error);
        return new NextResponse(JSON.stringify({ fail_message: "500.Internal server error. system failed to connect to DB."}), { status: 500});
    }
    
}