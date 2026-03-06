import mongoose, { Schema, Document, Model } from "mongoose";

export interface IClass extends Document {
    name: string;
    teacherId: mongoose.Types.ObjectId;
    students: mongoose.Types.ObjectId[];
    subject: string; // e.g. "Math Form 1"
    academicYear: string;
}

const ClassSchema = new Schema<IClass>(
    {
        name: { type: String, required: true },
        teacherId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        students: [{ type: Schema.Types.ObjectId, ref: "User" }],
        subject: { type: String, required: true },
        academicYear: { type: String, required: true },
    },
    { timestamps: true }
);

export const Class: Model<IClass> = mongoose.models.Class || mongoose.model<IClass>("Class", ClassSchema);
