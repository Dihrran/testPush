import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { varkProfile } = await req.json();

        await connectToDatabase();

        // Update the user's VARK profile
        // In a real app, we'd find by session.user.email
        const user = await User.findOneAndUpdate(
            { email: session.user.email },
            { varkProfile },
            { new: true, upsert: true }
        );

        return NextResponse.json({ success: true, profile: user.varkProfile });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();
        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ varkProfile: user.varkProfile });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
