import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import SystemUser from "@/models/userSchema";
import bcrypt from 'bcrypt';
import { InputsObject } from "@/types/types";


export const POST = async(req: NextRequest, res: NextResponse) => {
    try {
        const userData: FormData = await req.formData();
        const keys = userData.keys() as IterableIterator<keyof InputsObject>;

        let userObj = {} as InputsObject;

        for (const key of keys) {
            const value = userData.get(key);
            if (typeof value === "string") {
                userObj[key] = value;
            }
        }

        // await connectToDB();

        // const userExists = await SystemUser.findOne({
        //     $or: [
        //         { regNo: userObj.regNo },
        //         { email: userObj.email }
        //     ]
        // })

        // if (userExists) { 
        //     console.log("User Exists, Registration failed.");
        //     return new NextResponse(JSON.stringify({ fail_message: "Invalid Request. Already registered as a User. try to login instead." }), { status: 400 });
        // }

        // const hashedPassword = await bcrypt.hash(userObj.password, 10);

        // const newUser = await SystemUser.create({ ...userObj, password: hashedPassword });

        // await newUser.save();

        // console.log("New user successfully added.: ", newUser);

        return new NextResponse(JSON.stringify({ success_message: "New user created..."}), {status: 201});
    } catch (error) {
        console.log("Failed to register user: ", error);
        return new NextResponse(JSON.stringify({ fail_message: "Internal server Error!" }), { status: 500 });
    }
}