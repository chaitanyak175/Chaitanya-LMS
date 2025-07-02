"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Particle {
    id: string;
    symbol: string;
    size: number;
    blur: number;
    speed: number;
    delay: number;
    top: number;
    left: number;
    animType: number;
}

export default function Custom404() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleGoBack = () => {
        router.push("/");
    };

    // Generate particles with random properties
    const generateParticles = (count: number, symbol: string): Particle[] => {
        return Array.from({ length: count }, (_, i) => {
            const size = Math.floor(Math.random() * 20) + 10;
            const blur = (i + 1) * 0.02;
            const speed = Math.floor(Math.random() * 20) + 20;
            const delay = Math.random() * 1;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const animType = Math.floor(Math.random() * 4);

            return {
                id: `${symbol}-${i}`,
                symbol,
                size,
                blur,
                speed,
                delay,
                top,
                left,
                animType,
            };
        });
    };

    const particles = [
        ...generateParticles(40, "4"),
        ...generateParticles(40, "0"),
    ];

    const getAnimationClass = (animType: number): string => {
        switch (animType) {
            case 0:
                return "animate-float";
            case 1:
                return "animate-floatReverse";
            case 2:
                return "animate-float2";
            case 3:
                return "animate-floatReverse2";
            default:
                return "animate-float";
        }
    };

    if (!mounted) return null;

    return (
        <>
            <style jsx>{`
                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(180px);
                    }
                }

                @keyframes floatReverse {
                    0%,
                    100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-180px);
                    }
                }

                @keyframes float2 {
                    0%,
                    100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(28px);
                    }
                }

                @keyframes floatReverse2 {
                    0%,
                    100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-28px);
                    }
                }

                @keyframes apparition {
                    from {
                        opacity: 0;
                        transform: translateY(100px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-float {
                    animation: float infinite;
                }

                .animate-floatReverse {
                    animation: floatReverse infinite;
                }

                .animate-float2 {
                    animation: float2 infinite;
                }

                .animate-floatReverse2 {
                    animation: floatReverse2 infinite;
                }

                .animate-apparition {
                    animation: apparition 0.8s 1.2s
                        cubic-bezier(0.39, 0.575, 0.28, 0.995) forwards;
                }

                .particle {
                    pointer-events: none;
                    user-select: none;
                    font-family: arial, sans-serif;
                    font-weight: bold;
                    color: #595959;
                }

                .content-card {
                    opacity: 0;
                    animation: apparition 0.8s 1.2s
                        cubic-bezier(0.39, 0.575, 0.28, 0.995) forwards;
                }
            `}</style>

            <div className="relative flex items-center justify-center min-h-screen bg-white text-black font-sans overflow-hidden">
                {/* Floating Particles */}
                {particles.map((particle) => (
                    <span
                        key={particle.id}
                        className={`absolute particle ${getAnimationClass(particle.animType)}`}
                        style={
                            {
                                top: `${particle.top}%`,
                                left: `${particle.left}%`,
                                fontSize: `${particle.size}px`,
                                filter: `blur(${particle.blur}px)`,
                                animationDuration: `${particle.speed}s`,
                                animationDelay: `${particle.delay}s`,
                            } as React.CSSProperties
                        }
                    >
                        {particle.symbol}
                    </span>
                ))}

                {/* Main Content */}
                <article className="content-card relative w-full max-w-2xl mx-5 bg-white p-16 text-center shadow-2xl">
                    <p className="text-2xl mb-3 tracking-wider text-gray-600 font-light">
                        Damnit stranger,
                    </p>
                    <p className="text-2xl mb-3 tracking-wider text-gray-600 font-light">
                        You got lost in the{" "}
                        <strong className="font-bold">404</strong> galaxy.
                    </p>
                    <p className="text-2xl mb-0 tracking-wider text-gray-600 font-light">
                        <button
                            onClick={handleGoBack}
                            className="inline-block mt-8 px-4 py-2 border-4 border-gray-600 bg-transparent text-base text-gray-600 font-bold cursor-pointer hover:bg-gray-600 hover:text-white transition-colors duration-300"
                        >
                            Go back to earth.
                        </button>
                    </p>
                </article>
            </div>
        </>
    );
}
