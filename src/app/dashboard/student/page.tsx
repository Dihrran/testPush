import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, Presentation, PlaySquare, Book, Grip, Shapes, Flame } from "lucide-react";

export default function StudentDashboard() {
    // Mock Data
    const student = {
        name: "Ahmad",
        level: 4,
        xpTotal: 2450,
        xpNextLevel: 3000,
        streak: 12,
    };

    const recommendedQuest = {
        title: "Linear Equations Mastery",
        domain: "Algebra",
        progress: 40,
        modalityRec: "Visual & Interactive",
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col p-4 md:p-8 font-sans">
            <div className="max-w-6xl mx-auto w-full space-y-8">
                {/* Header & Gamification Bar */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome back, {student.name}!</h1>
                        <p className="text-gray-500">Let's continue your math journey.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Badge variant="secondary" className="px-4 py-1.5 text-sm bg-orange-100 text-orange-700 hover:bg-orange-200">
                            <Flame className="w-4 h-4 mr-1 text-orange-500" />
                            {student.streak} Day Streak
                        </Badge>
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-semibold">Level {student.level}</span>
                            <span className="text-xs text-gray-500">{student.xpTotal} / {student.xpNextLevel} XP</span>
                        </div>
                    </div>
                </header>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Main Content Area (2/3 width) */}
                    <div className="md:col-span-2 space-y-6">
                        <Card className="border-0 shadow-md ring-1 ring-gray-200">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Target className="w-5 h-5 mr-2 text-primary" />
                                    Continue Quest
                                </CardTitle>
                                <CardDescription>
                                    Your current active assignment, optimized for your learning style.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-lg">{recommendedQuest.title}</h3>
                                        <p className="text-sm text-gray-600 flex items-center">
                                            <Presentation className="w-4 h-4 mr-1" />
                                            Adapted Modality: {recommendedQuest.modalityRec}
                                        </p>
                                    </div>
                                    <div className="w-full md:w-1/3 mt-4 md:mt-0 items-end flex flex-col gap-2">
                                        <div className="flex justify-between w-full text-sm font-medium">
                                            <span>Progress</span>
                                            <span>{recommendedQuest.progress}%</span>
                                        </div>
                                        <Progress value={recommendedQuest.progress} className="h-2 w-full" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <h2 className="text-xl font-bold px-1 mt-8">Explore By Topic</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {/* Topic Tiles */}
                            {[
                                { title: "Numbers", icon: Grip, color: "text-blue-500", bg: "bg-blue-100" },
                                { title: "Algebra", icon: Book, color: "text-indigo-500", bg: "bg-indigo-100" },
                                { title: "Geometry", icon: Shapes, color: "text-purple-500", bg: "bg-purple-100", route: "/labs/geometry" },
                                { title: "Data Handling", icon: TrendingUp, color: "text-green-500", bg: "bg-green-100" }
                            ].map((topic) => (
                                <a href={topic.route || "#"} key={topic.title} className="group block p-6 border rounded-xl bg-white shadow-sm hover:shadow-md transition-all hover:border-primary/50">
                                    <div className={`w-10 h-10 ${topic.bg} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                        <topic.icon className={`w-5 h-5 ${topic.color}`} />
                                    </div>
                                    <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{topic.title}</h3>
                                    <p className="text-xs text-gray-500 mt-1">View Missions</p>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Sidebar (1/3 width) */}
                    <div className="space-y-6">
                        <Card className="border-0 shadow-sm ring-1 ring-gray-200">
                            <CardHeader>
                                <CardTitle className="text-lg">Recent Badges</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col items-center p-3 text-center border rounded-lg bg-yellow-50/50">
                                    <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center mb-2 shadow-inner">
                                        <PlaySquare className="w-6 h-6 text-yellow-600" />
                                    </div>
                                    <span className="text-xs font-bold">Fast Learner</span>
                                </div>
                                <div className="flex flex-col items-center p-3 text-center border rounded-lg bg-blue-50/50">
                                    <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mb-2 shadow-inner">
                                        <Shapes className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <span className="text-xs font-bold">Spatial Virtuoso</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-sm ring-1 ring-gray-200">
                            <CardHeader>
                                <CardTitle className="text-lg">Mastery Profile</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span>Fractions</span><span className="text-green-600">85%</span>
                                    </div>
                                    <Progress value={85} className="h-1.5 indicator-green-500 bg-gray-100" />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span>Linear Equations</span><span className="text-orange-600">40%</span>
                                    </div>
                                    <Progress value={40} className="h-1.5 indicator-orange-500 bg-gray-100" />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span>Angles</span><span className="text-primary">60%</span>
                                    </div>
                                    <Progress value={60} className="h-1.5 bg-gray-100" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
