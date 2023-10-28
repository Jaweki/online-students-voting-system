import mongoose from "mongoose";
let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected.');
        return true;
    }

    const uri = process.env.MONGODB_VOTE_SYSTEM_URI as string;
    try {
        await mongoose.connect(uri, {
            dbName: "voting-system",
        });

        isConnected = true;
        console.log("MongoDB connected");

        return true;
    } catch (error) {
        console.log(error);
        return false
    }
}