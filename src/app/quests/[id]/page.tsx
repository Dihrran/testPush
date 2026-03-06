"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Volume2, Video, FileText, MousePointer2, CheckCircle } from "lucide-react";
import Link from "next/link";
import { getRecommendedModality, Modality } from "@/lib/adaptiveEngine";
import { calculateXp } from "@/lib/gamification";

export default function QuestPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const [modality, setModality] = useState<Modality>("visual");
    const [loading, setLoading] = useState(true);
    const [completed, setCompleted] = useState(false);
    const [xpEarned, setXpEarned] = useState(0);

    // Mock Quest Data (In a real app, this would come from /api/quests/[id])
    const quest = {
        title: "Linear Equations Basics",
        description: "Learn to solve for x in simple algebraic expressions.",
        difficulty: 2,
        content: {
            visual: {
                type: "video",
                url: "https://example.com/visual-explanation",
                text: "Watch this diagram-heavy breakdown of linear balance."
            },
            auditory: {
                type: "audio",
                url: "https://example.com/audio-explanation",
                text: "Listen to the step-by-step logic of isolation."
            },
            reading: {
                type: "text",
                text: "Read the formal definition: ax + b = c. To solve, isolate x by performing inverse operations..."
            },
            kinesthetic: {
                type: "interactive",
                text: "Drag the numbers to the other side of the equation to balance the scale."
            }
        }
    };

    useEffect(() => {
        async function loadProfile() {
            if (session) {
                try {
                    const res = await fetch("/api/user/profile");
                    const data = await res.json();
                    if (data.varkProfile) {
                        const recommended = getRecommendedModality(data.varkProfile);
                        setModality(recommended);
                    }
                } catch (e) {
                    console.error("Failed to load adaptive profile", e);
                } finally {
                    setLoading(false);
                }
            }
        }
        loadProfile();
    }, [session]);

    const handleComplete = () => {
        const xp = calculateXp(1, quest.difficulty, 45); // Mocked performance
        setXpEarned(xp);
        setCompleted(true);
        // In a real app, POST to /api/user/progress
    };

    if (loading) return <div className="p-10 text-center">Identifying optimal modality...</div>;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col p-4 md:p-8">
            <div className="max-w-4xl mx-auto w-full space-y-6">
                <header className="flex items-center justify-between">
                    <Link href="/dashboard/student">
                        <Button variant="ghost" className="pl-0">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Dashboard
                        </Button>
                    </Link>
                    <Badge variant="outline" className="capitalize">
                        Modality: {modality}
                    </Badge>
                </header>

                <Card className="border-0 shadow-lg ring-1 ring-gray-200">
                    <CardHeader className="border-b bg-white">
                        <div className="flex justify-between items-center">
                            <div className="space-y-1">
                                <CardTitle className="text-2xl">{quest.title}</CardTitle>
                                <div className="text-sm text-gray-500">{quest.description}</div>
                            </div>
                            <div className="p-3 bg-primary/10 rounded-full">
                                {modality === "visual" && <Video className="w-6 h-6 text-primary" />}
                                {modality === "auditory" && <Volume2 className="w-6 h-6 text-primary" />}
                                {modality === "reading" && <FileText className="w-6 h-6 text-primary" />}
                                {modality === "kinesthetic" && <MousePointer2 className="w-6 h-6 text-primary" />}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="bg-slate-100 rounded-xl min-h-[300px] flex items-center justify-center p-8 text-center border-2 border-dashed border-gray-300">
                            <div className="max-w-md space-y-4">
                                <h3 className="text-xl font-bold capitalize">{modality} Lesson Content</h3>
                                <p className="text-gray-600">
                                    {(quest.content as any)[modality].text}
                                </p>
                                <div className="pt-4 italic text-sm text-primary">
                                    [Adaptive Layer: This {modality} variant was chosen because it matches your VARK learning preference.]
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-center">
                            {!completed ? (
                                <Button size="lg" className="h-12 px-12" onClick={handleComplete}>
                                    Complete Mission
                                </Button>
                            ) : (
                                <div className="flex flex-col items-center space-y-4 animate-in fade-in zoom-in duration-300">
                                    <div className="bg-green-100 p-4 rounded-full">
                                        <CheckCircle className="w-10 h-10 text-green-600" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-xl font-bold">Well Done!</h3>
                                        <p className="text-green-700 font-medium">+{xpEarned} XP Earned</p>
                                    </div>
                                    <Button variant="outline" onClick={() => router.push("/dashboard/student")}>
                                        Return to Dashboard
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
