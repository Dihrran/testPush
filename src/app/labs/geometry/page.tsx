"use client";

import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Box, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import * as THREE from "three";

// A simple interactive 3D Cube component
function InteractiveCube({ position, color, hoveredColor, onClick }: any) {
    const mesh = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);

    useFrame((state, delta) => {
        if (mesh.current) {
            mesh.current.rotation.x += delta * 0.2;
            mesh.current.rotation.y += delta * 0.5;
        }
    });

    return (
        <Box
            ref={mesh}
            args={[1.5, 1.5, 1.5]}
            position={position}
            scale={hovered ? 1.1 : 1}
            onClick={onClick}
            onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
            onPointerOut={() => setHover(false)}
        >
            <meshStandardMaterial color={hovered ? hoveredColor : color} roughness={0.3} metalness={0.2} />
            <Text position={[0, 0, 0.76]} fontSize={0.3} color="black">
                Faces: 6
            </Text>
        </Box>
    );
}

// A simple interactive 3D Sphere component
function InteractiveSphere({ position, color }: any) {
    const mesh = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (mesh.current) {
            mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2;
        }
    });

    return (
        <Sphere ref={mesh} position={position} args={[1, 32, 32]}>
            <MeshDistortMaterial color={color} envMapIntensity={0.4} clearcoat={0.8} clearcoatRoughness={0} roughness={0.2} metalness={0.8} />
        </Sphere>
    );
}

export default function GeometryLabScene() {
    const [points, setPoints] = useState(0);
    const [completed, setCompleted] = useState(false);

    const handleInteract = () => {
        if (!completed) {
            const newPoints = points + 10;
            setPoints(newPoints);
            if (newPoints >= 30) {
                setCompleted(true);
            }
        }
    };

    return (
        <div className="flex flex-col h-screen bg-slate-900 text-slate-100">
            <header className="flex items-center p-4 border-b border-white/10 shrink-0">
                <Link href="/dashboard/student">
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to Dashboard
                    </Button>
                </Link>
                <div className="ml-auto flex items-center gap-4">
                    {completed && <Badge className="bg-green-500 text-white">Lab Completed</Badge>}
                    <div className="text-sm font-semibold p-2 bg-white/10 rounded-lg">XP Earned: {points}/30</div>
                </div>
            </header>

            <main className="flex-1 flex flex-col lg:flex-row relative">
                {/* 3D Canvas Area */}
                <div className="flex-1 relative cursor-crosshair h-[60vh] lg:h-auto">
                    {/* Fallback for low-spec devices would typically replace the Canvas component based on WebGL support detection */}
                    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={1} />
                        <directionalLight position={[-10, -10, -10]} intensity={0.5} color="purple" />

                        <InteractiveCube position={[-2, 0, 0]} color="#3b82f6" hoveredColor="#60a5fa" onClick={handleInteract} />
                        <InteractiveSphere position={[2, 0, 0]} color="#ec4899" />

                        <OrbitControls enableZoom={true} enablePan={false} maxDistance={10} minDistance={3} />
                    </Canvas>

                    {/* Contextual overlay */}
                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md p-3 rounded-lg border border-white/10 pointer-events-none">
                        <p className="text-xs text-slate-300 flex items-center">
                            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                            Drag to rotate camera. Scroll to zoom.
                        </p>
                    </div>
                </div>

                {/* Instructional Sidebar */}
                <div className="w-full lg:w-96 bg-slate-800 border-l border-white/10 p-6 flex flex-col gap-6 shrink-0 z-10">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Introduction to Polyhedra</h2>
                        <p className="text-slate-400 text-sm">
                            Explore the relationship between faces, edges, and vertices in 3D space.
                        </p>
                    </div>

                    <Card className="bg-white/5 border-white/10 text-white border-0">
                        <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-sm font-semibold">Your Mission</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <ul className="text-sm space-y-3 text-slate-300">
                                <li className="flex items-start">
                                    <CheckCircle2 className={`w-4 h-4 mr-2 mt-0.5 ${points >= 10 ? "text-green-500" : "text-slate-500"}`} />
                                    <span>Click the blue cube to inspect its properties (Earn 10 XP).</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className={`w-4 h-4 mr-2 mt-0.5 ${points >= 20 ? "text-green-500" : "text-slate-500"}`} />
                                    <span>Rotate the camera to view the cube from behind (Earn 10 XP).</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className={`w-4 h-4 mr-2 mt-0.5 ${points >= 30 ? "text-green-500" : "text-slate-500"}`} />
                                    <span>Zoom in closely on the magenta sphere (Earn 10 XP).</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {completed && (
                        <div className="mt-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-green-500/20 border border-green-500/50 p-4 rounded-xl text-center space-y-3">
                                <h3 className="font-bold text-green-400">Mission Accomplished!</h3>
                                <p className="text-xs text-green-200">You've unlocked the <strong>Spatial Virtuoso</strong> badge.</p>
                                <Link href="/dashboard/student" className="block">
                                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                                        Return to Dashboard
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
