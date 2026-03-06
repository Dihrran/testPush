"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

// Simplified VARK Questionnaire
const QUESTIONS = [
    {
        text: "When learning a new math concept (e.g., fractions), I prefer:",
        options: [
            { id: "v", text: "Seeing a pie chart or diagram of the fraction." },
            { id: "a", text: "Having someone explain how it works aloud." },
            { id: "r", text: "Reading the textbook definition and step-by-step written examples." },
            { id: "k", text: "Using physical blocks or interactive sliders to cut pieces myself." },
        ],
    },
    {
        text: "I remember my math homework best when I:",
        options: [
            { id: "r", text: "Write out lists and structured notes." },
            { id: "k", text: "Do practice problems over and over until it clicks." },
            { id: "v", text: "Color-code the different variables in the equation." },
            { id: "a", text: "Repeat the formula to myself out loud." },
        ],
    },
    {
        text: "If I am stuck on a geometry problem, the first thing I do is:",
        options: [
            { id: "k", text: "Try to build the shape mentally or with real objects." },
            { id: "r", text: "Look for a written rule or theorem in my notes." },
            { id: "a", text: "Ask a friend or the teacher to talk me through it." },
            { id: "v", text: "Draw out the shape and label all the angles and sides." },
        ],
    }
];

export default function OnboardingPage() {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({ v: 0, a: 0, r: 0, k: 0 });
    const [isFinished, setIsFinished] = useState(false);

    const handleSelectOption = (modalityId: string) => {
        setAnswers((prev) => ({ ...prev, [modalityId]: prev[modalityId] + 1 }));

        if (currentQuestion < QUESTIONS.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setIsFinished(true);
            // In a real app, we would POST the normalized weights to the backend here
        }
    };

    const progress = ((currentQuestion + (isFinished ? 1 : 0)) / QUESTIONS.length) * 100;

    if (isFinished) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
                <Card className="w-full max-w-lg shadow-lg border-primary/20">
                    <CardHeader className="text-center">
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle2 className="h-8 w-8 text-green-600" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Profile Configured!</CardTitle>
                        <CardDescription>We've tailored your learning pathway.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-center text-gray-600">
                            Based on your answers, we will adapt your math lessons focusing closely on what works best for you.
                        </p>
                        {/* Visual breakdown of their profile */}
                        <div className="space-y-2 pt-4">
                            <div className="flex justify-between text-sm"><span>Visual</span><span>{answers.v}</span></div>
                            <Progress value={(answers.v / QUESTIONS.length) * 100} className="h-2" />
                            <div className="flex justify-between text-sm"><span>Auditory</span><span>{answers.a}</span></div>
                            <Progress value={(answers.a / QUESTIONS.length) * 100} className="h-2 bg-blue-100 indicator-blue-500" />
                            <div className="flex justify-between text-sm"><span>Reading</span><span>{answers.r}</span></div>
                            <Progress value={(answers.r / QUESTIONS.length) * 100} className="h-2 bg-orange-100 indicator-orange-500" />
                            <div className="flex justify-between text-sm"><span>Kinesthetic</span><span>{answers.k}</span></div>
                            <Progress value={(answers.k / QUESTIONS.length) * 100} className="h-2 bg-purple-100 indicator-purple-500" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={() => router.push("/dashboard/student")}>
                            Go to Dashboard
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    const question = QUESTIONS[currentQuestion];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-2xl space-y-8">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-500 font-medium tracking-wide">
                        <span>VARGA Profiling</span>
                        <span>Question {currentQuestion + 1} of {QUESTIONS.length}</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>

                <Card className="shadow-lg border-0 ring-1 ring-gray-200">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center pt-4">
                            {question.text}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 py-6">
                        {question.options.map((opt, idx) => (
                            <Button
                                key={idx}
                                variant="outline"
                                className="h-auto py-4 px-6 justify-start text-left text-base font-normal whitespace-normal hover:border-primary hover:bg-primary/5 transition-all"
                                onClick={() => handleSelectOption(opt.id)}
                            >
                                {opt.text}
                            </Button>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
