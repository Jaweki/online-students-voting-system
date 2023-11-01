import { Schema, model, models } from "mongoose";

const userToBallotSchema = new Schema({
    userId: {
        type: "string",
        required: [true, "User Id required to save relation to db."]
    },
    relation: Array<{
        ballot_id: {
            type: "string",
            required: [true, "Ballot Id is required to save relation in db."]
        },
        type: {
            binary: {
                type: boolean,
                required: [true, "Binary boolean value required to save relation in db."]
            },
            candidate: {
                type: "string",
                required: [true, "candidate userId is required to save relation in db."]
            },
            vote: {
                type: "string",
                required: [true, "vote selection is required to save relation in db."]
            },
        },
    }>
});

const UserToBallotSchema = models.UserToBallotSchema || model('UserToBallotSchema', userToBallotSchema, 'user-ballot');
export default UserToBallotSchema;