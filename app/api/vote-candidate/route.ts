import BallotSchema from "@/models/ballotSchema";
import UserToBallotSchema from "@/models/userToBallotSchema";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

type ApiRequestType = {
    ballot_id: string;
    userId: string;
    candidateId: string;
}

export const POST = async(req: NextRequest, res: NextResponse) => {
    try {
        const { ballot_id, userId, candidateId}: ApiRequestType = await req.json();
        
        const isConnected = await connectToDB();

        if (!isConnected) {
            throw new Error("System failed to connect to database!");
        }

        const result = await BallotSchema.findOneAndUpdate(
            {
                _id: ballot_id
            },
            {
                $inc: {
                    "type.candidate.$[nominee].voteCount": 1
                }
            },
            { arrayFilters: [{ "nominee.userId" : candidateId}] , returnNewDocument: true},
        );

        if (!result) {
            throw new Error("Failed to update vote count.");
        }

        const result_ = await UserToBallotSchema.updateOne(
            {userId: userId},
            {
                $push: { 
                    relation: {
                        ballot_id: ballot_id,
                        type: {
                            binary: false,
                            candidate: candidateId,
                            vote: "",
                        }
                    } 
                }
            },
            { upsert: true }
        );

        if (!result_.acknowledged) {
            throw new Error("Failed to update the user-ballot record");
        }


        return new NextResponse(JSON.stringify({ success: true }), { status: 201});
    } catch (error) {
        console.log("Error: ", error);
        return new NextResponse(JSON.stringify({ fail_message: `${error}`}), { status: 500});
    }
}