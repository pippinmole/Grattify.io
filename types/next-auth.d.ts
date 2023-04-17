import { User as DefaultUser } from "next-auth";

// Define your custom user type
export interface CustomUser extends DefaultUser, Document {
    // Add any other custom fields you might have, e.g., username, etc.
    createdAt: Date
}

// Extend the default session type to include your custom user type
declare module "next-auth" {
    interface Session {
        user: CustomUser;
    }
}
