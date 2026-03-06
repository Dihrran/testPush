import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Shapes, BrainCircuit } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-6 lg:px-8 h-16 flex items-center border-b max-w-7xl mx-auto w-full">
        <Link className="flex items-center justify-center font-bold text-2xl tracking-tight" href="#">
          <Shapes className="h-6 w-6 mr-2 text-primary" />
          <span>VARGA</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            For Schools
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 px-4 md:px-6">
          <div className="container max-w-6xl mx-auto flex flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Master Math Your Way
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                VARGA is an adaptive, gamified math platform that personalizes learning to your specific style—Visual, Auditory, Reading, or Kinesthetic.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/onboarding">
                <Button size="lg" className="h-12 px-8">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="h-12 px-8">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-slate-900 px-4 md:px-6">
          <div className="container max-w-6xl mx-auto">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">VARK Adaptive</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Content intelligently morphs to fit your precise learning modality.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <BrainCircuit className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">AI Feedback</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Step-by-step hints and intelligent error diagnostics right when you need it.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Shapes className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Immersive 3D</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Explore geometry and spatial relationships in our metaverse-inspired WebGL labs.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t max-w-7xl mx-auto">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2026 VARGA Math. All rights reserved. PDPA Compliant.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
