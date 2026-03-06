import mongoose, { Schema, Document, Model } from "mongoose";

export interface IQuest extends Document {
    title: string;
    description: string;
    domain: "Numbers" | "Algebra" | "Geometry" | "Data";
    targetGrade: number; // e.g. 1 (Form 1)
    requiredXp: number; // XP rewarded on completion
    missions: IMission[];
}

export interface IMission extends Document {
    title: string;
    conceptTag: string; // e.g. "linear_equation_basics"
    modalityVariants: {
        visual: string; // URL or ID to visual content
        auditory: string;
        reading: string;
        kinesthetic: string;
    };
    durationMins: number;
}

const MissionSchema = new Schema<IMission>({
    title: { type: String, required: true },
    conceptTag: { type: String, required: true },
    modalityVariants: {
        visual: { type: String },
        auditory: { type: String },
        reading: { type: String },
        kinesthetic: { type: String }
    },
    durationMins: { type: Number, default: 5 }
});

const QuestSchema = new Schema<IQuest>(
    {
        title: { type: String, required: true },
        description: { type: String },
        domain: {
            type: String,
            enum: ["Numbers", "Algebra", "Geometry", "Data"],
            required: true
        },
        targetGrade: { type: Number, required: true },
        requiredXp: { type: Number, default: 100 },
        missions: [MissionSchema]
    },
    { timestamps: true }
);

export const Quest: Model<IQuest> = mongoose.models.Quest || mongoose.model<IQuest>("Quest", QuestSchema);
