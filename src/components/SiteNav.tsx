import Link from "next/link";
import { Shapes } from "lucide-react";

export function SiteNav() {
    return (
        <div className="border-b bg-white">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <Shapes className="w-6 h-6 text-primary" />
                    VARGA
                </Link>
                <nav className="flex gap-6 text-sm font-medium">
                    <Link href="/dashboard/student" className="text-slate-600 hover:text-primary transition-colors">Student</Link>
                    <Link href="/dashboard/teacher" className="text-slate-600 hover:text-primary transition-colors">Teacher</Link>
                    <Link href="/labs/geometry" className="text-slate-600 hover:text-primary transition-colors">3D Lab</Link>
                </nav>
            </div>
        </div>
    );
}
