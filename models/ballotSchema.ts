import { Schema, model, models } from "mongoose";

const ballotSchema = new Schema({
    title: {
        type: "string",
        required: [true, "Ballot title is required to save in db!"]
    },
    desc: {
        type: "string",
        required: [true, "Ballot desc is required to save in db!"]
    },
    tags: {
        type: Array<"string">,
        required: [true, "Ballot tags are required to save in db!"]
    },
    time_span: {
        from: {
            type: "string",
            required: [true, "Ballot FROM time is required to save in db!"]
        },
        to: {
            type: "string",
            required: [true, "Ballot TO time is required to save in db!"]
        },
    },
    admin: {
        type: "string",
        required: [true, "Active Admins Id is required for saving ballot to db!"],
    },
    votes: {
        up: {
            type: "number",
            required: [true, "Votes Up is required to save to db"],
        },
        down: {
            type: "number",
            required: [true, "Votes Down is required to save to db"],
        },
    },
    type: {
        binary: {
            type: "boolean",
            required: [true, "Ballot binary determinant boolean value required!"]
        },
        candidate: Array<{ 
            userId: {
                type: "string",
                required: [true, "candidates userId is required to save in db!"]
            },
            slogan: {
                type: "string",
                required: [true, "candidates slogan is required to save in db!"]
            }, 
            desc: {
                type: "string",
                required: [true, "candidates description is required to save in db!"]
            },
            voteCount: {
                type: "number",
                required: [true, "vote-count is required to save in db!"]
            }
        }>,
    },
});

const BallotSchema = models.BallotSchema || model("BallotSchema", ballotSchema, 'ballots');

export default BallotSchema;