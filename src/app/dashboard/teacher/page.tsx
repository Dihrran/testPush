"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, GraduationCap, AlertCircle, TrendingUp } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";

export default function TeacherDashboard() {
    const stats = [
        { name: "Total Students", value: "32", icon: Users },
        { name: "Class Mastery", value: "68%", icon: GraduationCap },
        { name: "Struggling Students", value: "4", icon: AlertCircle },
        { name: "Completion Rate", value: "92%", icon: TrendingUp },
    ];

    const studentMastery = [
        { name: "Ahmad", fractions: 85, equations: 40, geometry: 60 },
        { name: "Siti", fractions: 92, equations: 75, geometry: 80 },
        { name: "Lim", fractions: 45, equations: 30, geometry: 50 },
        { name: "Raj", fractions: 78, equations: 88, geometry: 82 },
    ];

    const getColor = (val: number) => {
        if (val > 80) return "bg-green-500";
        if (val > 60) return "bg-yellow-500";
        return "bg-red-500";
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <SiteNav />
            <div className="max-w-6xl mx-auto w-full space-y-8 p-4 md:p-8">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Teacher Dashboard</h1>
                        <p className="text-gray-500">Analytics overview for Form 1 - Al-Khwarizmi</p>
                    </div>
                    <Badge className="bg-primary px-4 py-2">Math - Form 1</Badge>
                </header>

                {/* Stats Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat) => (
                        <Card key={stat.name} className="border-0 shadow-sm ring-1 ring-gray-200">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between space-y-0 pb-2">
                                    <p className="text-sm font-medium text-slate-500">{stat.name}</p>
                                    <stat.icon className="h-4 w-4 text-primary" />
                                </div>
                                <div className="text-2xl font-bold">{stat.value}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Heatmap Section */}
                <Card className="border-0 shadow-md ring-1 ring-gray-200">
                    <CardHeader>
                        <CardTitle className="text-xl">Student Mastery Heatmap</CardTitle>
                        <CardDescription>Probability estimate of concept mastery per student (AI-driven).</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead>
                                    <tr className="border-b">
                                        <th className="pb-4 font-bold">Student Name</th>
                                        <th className="pb-4 font-bold text-center">Fractions</th>
                                        <th className="pb-4 font-bold text-center">Linear Eq.</th>
                                        <th className="pb-4 font-bold text-center">Geometry</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {studentMastery.map((student) => (
                                        <tr key={student.name}>
                                            <td className="py-4 font-medium">{student.name}</td>
                                            <td className="py-4 text-center">
                                                <div className={`mx-auto w-10 h-10 rounded ${getColor(student.fractions)} text-white flex items-center justify-center font-bold`}>
                                                    {student.fractions}%
                                                </div>
                                            </td>
                                            <td className="py-4 text-center">
                                                <div className={`mx-auto w-10 h-10 rounded ${getColor(student.equations)} text-white flex items-center justify-center font-bold`}>
                                                    {student.equations}%
                                                </div>
                                            </td>
                                            <td className="py-4 text-center">
                                                <div className={`mx-auto w-10 h-10 rounded ${getColor(student.geometry)} text-white flex items-center justify-center font-bold`}>
                                                    {student.geometry}%
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
