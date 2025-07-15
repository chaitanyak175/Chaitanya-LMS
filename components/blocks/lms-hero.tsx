"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function LMSHero() {
    const { data: session } = authClient.useSession();

    return (
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 dark:from-black dark:via-purple-950 dark:to-indigo-950 pb-20 pt-32 font-light text-white antialiased md:pb-24 md:pt-20">
            {/* Background Effects */}
            <div
                className="absolute right-0 top-0 h-1/2 w-1/2"
                style={{
                    background:
                        "radial-gradient(circle at 70% 30%, rgba(155, 135, 245, 0.2) 0%, rgba(13, 10, 25, 0) 60%)",
                }}
            />
            <div
                className="absolute left-0 top-0 h-1/2 w-1/2 -scale-x-100"
                style={{
                    background:
                        "radial-gradient(circle at 70% 30%, rgba(155, 135, 245, 0.2) 0%, rgba(13, 10, 25, 0) 60%)",
                }}
            />

            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-gradient-x"></div>

            {/* Floating Elements */}
            <motion.div
                className="absolute top-20 left-10 text-4xl opacity-20"
                animate={{
                    y: [-10, 10, -10],
                    rotate: [0, 5, -5, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                🚀
            </motion.div>
            <motion.div
                className="absolute top-40 right-20 text-3xl opacity-20"
                animate={{
                    y: [-10, 10, -10],
                    rotate: [0, 5, -5, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
            >
                💡
            </motion.div>
            <motion.div
                className="absolute bottom-32 left-20 text-3xl opacity-20"
                animate={{
                    y: [-10, 10, -10],
                    rotate: [0, 5, -5, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            >
                🎯
            </motion.div>

            <div className="container relative z-10 mx-auto max-w-2xl px-4 text-center md:max-w-4xl md:px-6 lg:max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <Badge
                            variant="outline"
                            className="mb-6 inline-block border-white/20 bg-white/10 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 backdrop-blur-sm px-6 py-2"
                        >
                            <motion.span
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatDelay: 2,
                                }}
                                className="mr-2"
                            >
                                ✨
                            </motion.span>
                            THE FUTURE OF LEARNING IS HERE
                        </Badge>
                    </motion.div>

                    <motion.h1
                        className="mx-auto mb-6 max-w-5xl text-4xl font-light md:text-6xl lg:text-8xl leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Elevate Your Learning with{" "}
                        <motion.span
                            className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent"
                            animate={{
                                backgroundPosition: ["0%", "100%", "0%"],
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            AI-Powered
                        </motion.span>{" "}
                        Education
                    </motion.h1>

                    <motion.p
                        className="mx-auto mb-10 max-w-3xl text-lg text-white/70 md:text-xl leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Discover a revolutionary learning experience with our
                        modern, interactive LMS. Access high-quality courses,
                        earn certificates, and advance your career with expert
                        guidance and cutting-edge technology.
                    </motion.p>

                    <motion.div
                        className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative group w-full sm:w-auto"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full opacity-75 group-hover:opacity-100 transition-all duration-500 blur-sm group-hover:blur-none"></div>
                            <Link
                                href="/courses"
                                className="relative w-full overflow-hidden rounded-full border border-white/10 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 px-8 py-4 text-white shadow-lg transition-all duration-300 hover:border-[#9b87f5]/30 sm:w-auto inline-flex items-center justify-center gap-2 font-semibold"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                                <span className="relative flex items-center gap-2">
                                    <motion.span
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            repeatDelay: 3,
                                        }}
                                    >
                                        🚀
                                    </motion.span>
                                    Explore Courses
                                </span>
                            </Link>
                        </motion.div>

                        {!session && (
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto"
                            >
                                <Link
                                    href="/login"
                                    className="flex w-full items-center justify-center gap-2 text-white/70 transition-colors hover:text-white sm:w-auto px-6 py-4 border border-white/20 rounded-full backdrop-blur-sm hover:bg-white/10"
                                >
                                    <motion.span
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            repeatDelay: 4,
                                        }}
                                    >
                                        👋
                                    </motion.span>
                                    <span>Sign in to get started</span>
                                </Link>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>

                <motion.div
                    className="relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
                >
                    {/* Background glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-3xl"></div>

                    <div className="relative z-10 mx-auto max-w-5xl overflow-hidden rounded-2xl shadow-[0_0_50px_rgba(155,135,245,0.3)] border border-white/10">
                        {/* Placeholder for LMS Dashboard Image */}
                        <div className="aspect-video w-full bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-800 rounded-2xl flex items-center justify-center relative overflow-hidden">
                            {/* Animated background pattern */}
                            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

                            {/* Dashboard Preview Content */}
                            <div className="relative z-10 text-center p-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <motion.div
                                        className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            delay: 0,
                                        }}
                                    >
                                        <div className="text-3xl mb-2">📚</div>
                                        <div className="text-white font-semibold">
                                            1,200+ Courses
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            delay: 1,
                                        }}
                                    >
                                        <div className="text-3xl mb-2">👨‍🎓</div>
                                        <div className="text-white font-semibold">
                                            10,000+ Students
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            delay: 2,
                                        }}
                                    >
                                        <div className="text-3xl mb-2">🏆</div>
                                        <div className="text-white font-semibold">
                                            95% Success Rate
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="text-white/70 text-lg">
                                    Interactive Learning Dashboard
                                </div>
                            </div>

                            {/* Floating particles */}
                            <motion.div
                                className="absolute top-10 left-10 w-2 h-2 bg-cyan-400 rounded-full"
                                animate={{
                                    y: [0, -20, 0],
                                    opacity: [0.3, 1, 0.3],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                            <motion.div
                                className="absolute bottom-10 right-10 w-3 h-3 bg-purple-400 rounded-full"
                                animate={{
                                    y: [0, -30, 0],
                                    opacity: [0.3, 1, 0.3],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 1,
                                }}
                            />
                            <motion.div
                                className="absolute top-1/2 left-1/4 w-1 h-1 bg-pink-400 rounded-full"
                                animate={{
                                    scale: [1, 2, 1],
                                    opacity: [0.3, 1, 0.3],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 2,
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
