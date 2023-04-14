import mongoose, { Mongoose } from "mongoose";

interface Connection {
    isConnected?: number;
}

const connection: Connection = {};

async function dbConnect(): Promise<void> {
    // Check if we have a connection to the database or if it's currently connecting or disconnecting
    if (connection.isConnected || mongoose.connection.readyState) {
        return;
    }

    // Create a new connection
    const db: Mongoose = await mongoose.connect(process.env.MONGODB_URI!, {});

    connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;