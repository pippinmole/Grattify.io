import mongoose from 'mongoose';
import {CustomUser} from "../types/next-auth";

const userPreferencesSchema = new mongoose.Schema({
    emailWhenPostAvailable: {
        type: Boolean,
        default: true
    }
});

const userSchema = new mongoose.Schema({
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
    },
    preferences: {
        type: userPreferencesSchema,
        required: true
    }
});

const User = mongoose.models.User ?? mongoose.model<CustomUser>('User', userSchema);

export default User;