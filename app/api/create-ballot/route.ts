import BallotSchema from "@/models/ballotSchema";
import { InputState } from "@/types/types";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import _ from 'lodash';

export const POST = async(req: NextRequest, res: NextResponse) => {
    try {
        const data: InputState = await req.json();
        let tags;
        if (data.tags.includes(',')) {
            if (data.tags.includes(" ")) {
                tags = data.tags.split(', ');
            } else {
                tags = data.tags.split(',');
            }
        } else if (data.tags.includes(" ")) {
            tags = data.tags.split(" ");
        }
        
        const votes = {
            up: 0,
            down: 0
        }

        const candidateWithVoteCount = data.type.candidate.map(obj => ({...obj, voteCount: 0}));

        const ballotDeepCopy = _.cloneDeep(data)
        const payload = { ...ballotDeepCopy, tags: tags, votes: votes, type: {
            ...ballotDeepCopy.type,
            candidate: candidateWithVoteCount
        }}
        console.log("Incoming Ballot: ", payload
        );

        const isConnected = await connectToDB();

        if (!isConnected) {
            throw new Error("Failed to connect to DB!");
        }

        const newBallot = await BallotSchema.create(payload);
        
        if (!newBallot) {
            throw new Error("Failed to Upload the new a new Ballot");
        }

        console.log("New Ballot created: ", newBallot);

        return new NextResponse(JSON.stringify({ success: "Ballot Upload success."}), {status: 201});

    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ fail_message: "internal system error!"}), {status: 500});
    }
}