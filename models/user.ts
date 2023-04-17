import mongoose from 'mongoose';
import {CustomUser} from "../types/next-auth";

const postSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// let User: Model<CustomUser>;
//
// if (mongoose.models.User) {
//     User = mongoose.model<CustomUser>('User');
// } else {
//     User = mongoose.model<CustomUser>('User', postSchema);
// }

const User = mongoose.models.User ?? mongoose.model<CustomUser>('User', postSchema);

export default User;