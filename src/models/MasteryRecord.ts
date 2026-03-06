import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMasteryRecord extends Document {
    studentId: mongoose.Types.ObjectId;
    conceptTag: string; // e.g. "linear_equation_basics"
    masteryLevel: number; // 0.0 to 1.0 (estimated probability of knowing the skill, ala BKT)
    attempts: number;
    lastAttemptAt: Date;
}

const MasteryRecordSchema = new Schema<IMasteryRecord>(
    {
        studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        conceptTag: { type: String, required: true },
        masteryLevel: { type: Number, default: 0.1, min: 0, max: 1 },
        attempts: { type: Number, default: 0 },
        lastAttemptAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

// Compound index to quickly look up a student's mastery for a specific concept
MasteryRecordSchema.index({ studentId: 1, conceptTag: 1 }, { unique: true });

export const MasteryRecord: Model<IMasteryRecord> = mongoose.models.MasteryRecord || mongoose.model<IMasteryRecord>("MasteryRecord", MasteryRecordSchema);
