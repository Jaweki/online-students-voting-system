import userSchema from "@/models/userSchema";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";


export const POST = async(req: NextRequest, res: NextResponse) => {
    try {
        const req_data: { userIds: string[] } = await req.json();

        const isConnected = await connectToDB();

        if (!isConnected) {
            throw new Error("500. Internal server error. Possible database connect fail!");
        }

        const userPromise = req_data.userIds.map(async user => {
            const userFound = await userSchema.findOne(
                { userId: user},
                {_id: 0, password: 0, email: 0}
            );
            return userFound;
        })
        
        const result = await Promise.all(userPromise);
        if (!result) {
            throw new Error("403.Users not found!");
        }

        return new NextResponse(JSON.stringify({ success: result}), { status: 201});

    } catch (error) {
        console.log("Error: ", error);
        return new NextResponse(JSON.stringify({ fail_message: `${error}`}), { status: 500 });
    }
}