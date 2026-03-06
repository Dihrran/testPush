import mongoose, { Schema, Document, Model } from "mongoose";

// VARK Profile subdocument
export interface IVarkProfile {
    visual: number;
    auditory: number;
    reading: number;
    kinesthetic: number;
}

const VarkProfileSchema = new Schema<IVarkProfile>({
    visual: { type: Number, default: 0.25, min: 0, max: 1 },
    auditory: { type: Number, default: 0.25, min: 0, max: 1 },
    reading: { type: Number, default: 0.25, min: 0, max: 1 },
    kinesthetic: { type: Number, default: 0.25, min: 0, max: 1 },
});

// User Document
export interface IUser extends Document {
    email: string;
    name: string;
    role: "STUDENT" | "TEACHER" | "ADMIN" | "PARENT";
    varkProfile: IVarkProfile;
    totalXp: number;
    currentLevel: number;
    currentStreak: number;
    lastLogin: Date;
    schoolId?: mongoose.Types.ObjectId;
}

const UserSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        role: {
            type: String,
            enum: ["STUDENT", "TEACHER", "ADMIN", "PARENT"],
            default: "STUDENT"
        },
        varkProfile: { type: VarkProfileSchema, default: () => ({}) },
        totalXp: { type: Number, default: 0 },
        currentLevel: { type: Number, default: 1 },
        currentStreak: { type: Number, default: 0 },
        lastLogin: { type: Date, default: Date.now },
        schoolId: { type: Schema.Types.ObjectId, ref: "School" },
    },
    { timestamps: true }
);

// Prevent mongoose from recompiling the model if it already exists
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
