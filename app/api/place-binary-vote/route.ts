import BallotSchema from "@/models/ballotSchema";
import UserToBallotSchema from "@/models/userToBallotSchema";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

type RequestBodyType = {
    userId: string;
    ballot_id: string;
    vote: string;
}
export const POST = async(req: NextRequest, res: NextResponse) => {
    try {
        const {userId, ballot_id, vote}: RequestBodyType = await req.json();

        const isConnected = await connectToDB();

        if (!isConnected) {
            throw new Error("System Failed to connect to db.");
        }

        const update = {} as any;
        update[`votes.${vote}`] = 1

        const result = await BallotSchema.findByIdAndUpdate(
            {
                _id: ballot_id
            },
            {
                $inc: update
            },
            { new: true}
        );

        if (!result) {
            throw new Error("Failed to update binary vote count in db.");
        }

        const result_ = await UserToBallotSchema.updateOne(
            { userId: userId},
            {
                $push: {
                    relation: {
                        ballot_id: ballot_id,
                        type: {
                            binary: true,
                            candidate: "",
                            vote: vote
                        }
                    }
                }
            },
            { upsert: true}
        );

        if(!result_.acknowledged) {
            throw new Error("Failed to update the relation of user to db, after binary vote.");
        }

        return new NextResponse(JSON.stringify({ success: true }), { status: 201 });
    } catch (error) {
        console.log("Error: ", error);
        return new NextResponse(JSON.stringify({ fail_message: `${error}`}), { status: 500 });
    }
}