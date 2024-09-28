import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL;

const connectDB = async ()=> {
    const connectionState = mongoose.connection.readyState;

    if (connectionState === 1) {
        console.log("Already connected");
        return;
    }

    if (connectionState === 2) {
        console.log("Connecting....");
        return;
    }


    try {
        mongoose.connect(MONGODB_URI!, {
            dbName: 'split-bills',
            bufferCommands: true,
        })
    } catch(err: any) {
        console.log('Error: ', err);
        throw new Error(err);
    }
}

export default connectDB;