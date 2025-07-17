"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Lenis from "lenis";

// Custom hook for animating number counters
const useCountAnimation = (
    end: number,
    duration: number = 2,
    delay: number = 0
) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setHasStarted(true);
        }, delay * 1000);

        return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
        if (!hasStarted) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min(
                (currentTime - startTime) / (duration * 1000),
                1
            );

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(easeOutQuart * end);

            setCount(currentCount);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [end, duration, hasStarted]);

    return count;
};

interface featureProps {
    title: string;
    description: string;
    icon: string;
}

const features: featureProps[] = [
    {
        title: "Comprehensive Courses",
        description:
            "Access a wide range of carefully curated courses designed by industry experts across multiple domains.",
        icon: "📚",
    },
    {
        title: "Interactive Learning",
        description:
            "Engage with interactive content, quizzes, and hands-on assignments to enhance your learning experience.",
        icon: "🎮",
    },
    {
        title: "Progress Tracking",
        description:
            "Monitor your progress with detailed analytics, certificates, and personalized learning dashboards.",
        icon: "📊",
    },
    {
        title: "Community Support",
        description:
            "Join a vibrant community of learners and instructors to collaborate, share knowledge, and grow together.",
        icon: "👥",
    },
    {
        title: "AI-Powered Learning",
        description:
            "Experience personalized learning paths powered by AI that adapts to your learning style and pace.",
        icon: "🤖",
    },
    {
        title: "Mobile Learning",
        description:
            "Learn on-the-go with our mobile-optimized platform. Download courses and study offline anytime.",
        icon: "📱",
    },
];

// Animated counter component for stats
const AnimatedStatNumber = ({
    stat,
    delay,
}: {
    stat: (typeof stats)[0];
    delay: number;
}) => {
    const count = useCountAnimation(stat.numericValue, 2.5, delay);

    const formatNumber = (num: number) => {
        if (stat.suffix === "%" || num < 1000) return num;
        if (num >= 10000)
            return `${Math.floor(num / 1000)},${(num % 1000).toString().padStart(3, "0")}`;
        return num.toString();
    };

    return (
        <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                delay: delay + 0.2,
                type: "spring",
                stiffness: 200,
                damping: 15,
            }}
        >
            {formatNumber(count)}
            {stat.suffix}
        </motion.span>
    );
};

const stats = [
    {
        number: "10,000+",
        numericValue: 10000,
        suffix: "+",
        label: "Active Students",
        icon: "👨‍🎓",
    },
    {
        number: "500+",
        numericValue: 500,
        suffix: "+",
        label: "Expert Instructors",
        icon: "👨‍🏫",
    },
    {
        number: "1,200+",
        numericValue: 1200,
        suffix: "+",
        label: "Courses Available",
        icon: "📖",
    },
    {
        number: "95%",
        numericValue: 95,
        suffix: "%",
        label: "Success Rate",
        icon: "🏆",
    },
];

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Software Developer",
        content:
            "This platform transformed my career! The courses are practical and the community support is amazing.",
        avatar: "👩‍💻",
        rating: 5,
    },
    {
        name: "Mike Chen",
        role: "Data Scientist",
        content:
            "The AI-powered learning paths helped me master complex topics faster than I ever imagined.",
        avatar: "👨‍🔬",
        rating: 5,
    },
    {
        name: "Emily Rodriguez",
        role: "UX Designer",
        content:
            "Interactive assignments and real-world projects made learning engaging and practical.",
        avatar: "👩‍🎨",
        rating: 5,
    },
    {
        name: "David Park",
        role: "Product Manager",
        content:
            "The comprehensive curriculum and flexible schedule helped me transition into tech seamlessly.",
        avatar: "👨‍💼",
        rating: 5,
    },
    {
        name: "Lisa Wang",
        role: "Frontend Developer",
        content:
            "Outstanding instructors and real-world projects. I landed my dream job within 3 months!",
        avatar: "👩‍💻",
        rating: 5,
    },
    {
        name: "Alex Thompson",
        role: "DevOps Engineer",
        content:
            "The hands-on approach and industry-relevant content made all the difference in my learning journey.",
        avatar: "👨‍🔧",
        rating: 5,
    },
];

// Split testimonials for marquee rows
const firstRow = testimonials.slice(0, testimonials.length / 2);
const secondRow = testimonials.slice(testimonials.length / 2);

const TestimonialCard = ({
    testimonial,
}: {
    testimonial: (typeof testimonials)[0];
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Card
            className="w-80 mx-4 hover:shadow-xl transition-all duration-300 border border-blue-200/20 bg-gradient-to-br from-white via-blue-50/30 to-slate-50/30 dark:from-gray-900 dark:to-gray-800/50 backdrop-blur-sm overflow-hidden hover:scale-105"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CardContent className="p-6">
                <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">{testimonial.avatar}</div>
                    <div>
                        <h4
                            className={`font-semibold transition-colors ${
                                isHovered
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-gray-900 dark:text-white"
                            }`}
                        >
                            {testimonial.name}
                        </h4>
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                            {testimonial.role}
                        </p>
                    </div>
                </div>
                <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-amber-400 text-lg">
                            ⭐
                        </span>
                    ))}
                </div>
                <p
                    className={`leading-relaxed transition-colors ${
                        isHovered
                            ? "text-gray-800 dark:text-gray-100"
                            : "text-gray-600 dark:text-gray-300"
                    }`}
                >
                    "{testimonial.content}"
                </p>
            </CardContent>
        </Card>
    );
};

export default function Home() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Initialize Lenis smooth scroll
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    const cardVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
        hover: {
            y: -5,
        },
    };

    const statsVariants = {
        hidden: { scale: 0.95, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
        },
    };

    return (
        <>
            {/* Modern Hero Section */}
            <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-gray-900 md:pb-0 pb-10 md:pt-0 pt-4">
                {/* Background Elements */}
                <div className="absolute inset-0 w-full h-full">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.1),transparent_70%)]"></div>
                    <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_75%_75%,rgba(16,185,129,0.1),transparent_70%)]"></div>
                    <div className="absolute top-1/2 left-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_70%)]"></div>
                </div>

                {/* Simple floating elements */}
                <motion.div
                    className="absolute top-20 left-20 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"
                    animate={{
                        y: [0, -20, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute top-40 right-32 w-32 h-32 bg-emerald-500/20 rounded-lg rotate-45 blur-lg"
                    animate={{
                        rotate: [45, 135, 45],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <div className="relative z-10 w-full mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        <Badge
                            variant="outline"
                            className="mb-6 bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-300 px-4 py-2 text-sm font-medium"
                        >
                            <motion.span
                                className="mr-2"
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                🎓
                            </motion.span>
                            #1 Learning Platform
                        </Badge>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
                    >
                        <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-slate-700 dark:from-white dark:via-blue-200 dark:to-gray-200 bg-clip-text text-transparent">
                            Master New Skills
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-blue-600 via-emerald-600 to-indigo-600 dark:from-blue-400 dark:via-emerald-400 dark:to-indigo-400 bg-clip-text text-transparent">
                            Build Your Future
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed px-4"
                    >
                        Join over 10,000 students learning from industry
                        experts. Get hands-on experience with real projects and
                        advance your career with our comprehensive courses.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
                    >
                        <motion.div
                            whileHover={{
                                scale: 1.02,
                                y: -2,
                                transition: {
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 25,
                                },
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="relative group"
                        >
                            <Link
                                href="/courses"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-xl hover:shadow-blue-500/25 transition-all duration-300 group relative overflow-hidden"
                            >
                                {/* Simple gradient overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Subtle shimmer effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

                                <span className="relative z-10 flex items-center">
                                    Start Learning Today
                                    <motion.span
                                        className="ml-2"
                                        animate={{ x: [0, 4, 0] }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        →
                                    </motion.span>
                                </span>
                            </Link>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="/login"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Explore Courses
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 dark:text-gray-400"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-emerald-500">✓</span>
                            <span>Free Trial Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-emerald-500">✓</span>
                            <span>Certificate of Completion</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-emerald-500">✓</span>
                            <span>Expert Instructors</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <motion.section
                className="py-20 w-full"
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            delay: 0.3,
                            delayChildren: 0.5,
                            staggerChildren: 0.15,
                        },
                    },
                }}
            >
                <motion.div
                    className="text-center mb-16 px-4"
                    variants={itemVariants}
                >
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.2,
                            type: "spring",
                            stiffness: 200,
                            damping: 12,
                        }}
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        className="inline-block mb-4"
                    >
                        <Badge
                            variant="outline"
                            className="bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-300 px-4 py-2"
                        >
                            <motion.span
                                className="mr-2"
                                animate={{
                                    rotate: [0, 10, -10, 0],
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                🎯
                            </motion.span>
                            Why Choose Us
                        </Badge>
                    </motion.div>

                    <motion.h2
                        className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-blue-800 to-slate-700 dark:from-white dark:via-blue-200 dark:to-gray-200 bg-clip-text text-transparent"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <motion.span
                            className="inline-block"
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            Everything You Need
                        </motion.span>
                        <br />
                        <motion.span
                            className="inline-block bg-gradient-to-r from-blue-600 via-emerald-600 to-indigo-600 dark:from-blue-400 dark:via-emerald-400 dark:to-indigo-400 bg-clip-text text-transparent"
                            initial={{ x: 30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            to Succeed
                        </motion.span>
                    </motion.h2>

                    <motion.div
                        className="w-24 h-1 mb-6 bg-gradient-to-r from-blue-500 to-emerald-500 rounded mx-auto"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 96, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.9 }}
                    />

                    <motion.p
                        className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.1 }}
                    >
                        Discover the features that make our platform the perfect
                        choice for your learning journey
                    </motion.p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-6"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                delay: 1.3,
                                staggerChildren: 0.2,
                            },
                        },
                    }}
                    initial="hidden"
                    animate="visible"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: {
                                    y: 60,
                                    opacity: 0,
                                    scale: 0.8,
                                    rotateY: -45,
                                },
                                visible: {
                                    y: 0,
                                    opacity: 1,
                                    scale: 1,
                                    rotateY: 0,
                                    transition: {
                                        type: "spring",
                                        damping: 20,
                                        stiffness: 300,
                                        delay: index * 0.1,
                                    },
                                },
                            }}
                            whileHover={{
                                y: -8,
                                scale: 1.02,
                                rotateY: 5,
                                boxShadow:
                                    "0 25px 50px rgba(59, 130, 246, 0.15)",
                                transition: { duration: 0.3 },
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="group cursor-pointer"
                        >
                            <Card className="h-full hover:shadow-2xl transition-all duration-300 border border-slate-200/30 bg-gradient-to-br from-white via-blue-50/20 to-slate-50/20 dark:from-gray-900 dark:to-gray-800/50 backdrop-blur-sm group-hover:bg-gradient-to-br group-hover:from-blue-50/40 group-hover:to-slate-50/40 dark:group-hover:from-slate-800/20 dark:group-hover:to-blue-950/20 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

                                {/* Animated background overlay on hover */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    initial={false}
                                />

                                <CardHeader className="text-center relative z-10">
                                    <motion.div
                                        className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300"
                                        whileHover={{
                                            rotate: [0, -10, 10, -5, 0],
                                            scale: 1.2,
                                        }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {feature.icon}
                                    </motion.div>
                                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                        {feature.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="relative z-10">
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300">
                                        {feature.description}
                                    </p>
                                </CardContent>

                                {/* Decorative corner elements */}
                                <motion.div
                                    className="absolute top-3 right-3 w-2 h-2 bg-blue-400/40 rounded-full opacity-0 group-hover:opacity-100"
                                    initial={false}
                                    animate={{
                                        scale: [1, 1.5, 1],
                                        opacity: [0.4, 0.8, 0.4],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.section>

            {/* Stats Section - Empowering Learners Worldwide */}
            <motion.section
                className="relative py-20 w-full overflow-hidden bg-gradient-to-br from-slate-800 to-blue-900 text-white"
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={containerVariants}
            >
                {/* Enhanced Animated Decorative Background Shapes */}
                <motion.div
                    className="absolute -top-16 left-1/2 w-[60rem] h-[60rem] bg-blue-500/20 rounded-full blur-3xl transform -translate-x-1/2"
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.2, 0.35, 0.2],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-0 right-1/3 w-[40rem] h-[40rem] bg-emerald-400/20 rounded-full blur-2xl"
                    animate={{
                        scale: [1, 1.25, 1],
                        x: [0, 30, 0],
                        y: [0, -20, 0],
                        opacity: [0.2, 0.45, 0.2],
                    }}
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-slate-400/15 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        y: [0, -40, 0],
                        x: [0, 25, 0],
                        opacity: [0.1, 0.25, 0.1],
                    }}
                    transition={{
                        duration: 16,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                {/* Floating geometric shapes */}
                <motion.div
                    className="absolute top-20 right-20 w-4 h-4 bg-emerald-300/40 rounded"
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 180, 360],
                        opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-32 left-16 w-6 h-6 bg-blue-300/30 rounded-full"
                    animate={{
                        x: [0, 30, 0],
                        y: [0, -30, 0],
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <motion.div
                    className="relative z-10 flex flex-col items-center px-6"
                    variants={itemVariants}
                >
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.2,
                            type: "spring",
                            stiffness: 200,
                            damping: 12,
                        }}
                        whileHover={{ scale: 1.05, rotate: 5 }}
                    >
                        <Badge className="mb-4 bg-emerald-200/20 text-emerald-200 border-emerald-300/40 px-3 py-1 rounded-full font-medium text-sm">
                            <motion.span
                                animate={{
                                    rotate: [0, 10, -10, 0],
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="mr-1"
                            >
                                📊
                            </motion.span>
                            Our Impact
                        </Badge>
                    </motion.div>

                    <motion.h2
                        className="text-4xl md:text-6xl font-extrabold mb-4 text-center leading-tight"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <motion.span
                            className="text-white inline-block"
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            Empowering Learners
                        </motion.span>
                        <br />
                        <motion.span
                            className="text-emerald-300 inline-block"
                            initial={{ x: 30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            Worldwide
                        </motion.span>
                    </motion.h2>

                    <motion.div
                        className="w-24 h-1 mb-6 bg-gradient-to-r from-white to-emerald-300 rounded"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 96, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.9 }}
                    />

                    <motion.p
                        className="text-lg text-white/80 mb-12 max-w-2xl text-center"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.1 }}
                    >
                        Join thousands of students who have transformed their
                        careers with our platform
                    </motion.p>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-5xl"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    delay: 1.3,
                                    staggerChildren: 0.2,
                                },
                            },
                        }}
                        initial="hidden"
                        animate="visible"
                    >
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                                variants={{
                                    hidden: {
                                        y: 60,
                                        opacity: 0,
                                        scale: 0.8,
                                        rotateY: -90,
                                    },
                                    visible: {
                                        y: 0,
                                        opacity: 1,
                                        scale: 1,
                                        rotateY: 0,
                                        transition: {
                                            type: "spring",
                                            damping: 20,
                                            stiffness: 300,
                                            delay: idx * 0.1,
                                        },
                                    },
                                }}
                                whileHover={{
                                    scale: 1.08,
                                    y: -8,
                                    rotateY: 5,
                                    boxShadow:
                                        "0 25px 50px rgba(59, 130, 246, 0.4)",
                                    transition: { duration: 0.3 },
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {/* Animated background overlay on hover */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    initial={false}
                                />

                                <motion.div
                                    className="flex items-center justify-center w-16 h-16 mb-4 bg-white/20 text-blue-200 rounded-full text-3xl group-hover:bg-emerald-400/40 group-hover:text-emerald-200 transition-all duration-300 relative z-10"
                                    whileHover={{
                                        rotate: [0, -15, 15, 0],
                                        scale: 1.15,
                                        transition: { duration: 0.6 },
                                    }}
                                >
                                    {stat.icon}
                                </motion.div>

                                <motion.div
                                    className="text-3xl md:text-4xl font-bold mb-1 relative z-10"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{
                                        delay: 1.5 + idx * 0.15,
                                        type: "spring",
                                        damping: 15,
                                        stiffness: 200,
                                    }}
                                >
                                    <AnimatedStatNumber
                                        stat={stat}
                                        delay={1.8 + idx * 0.15}
                                    />
                                </motion.div>

                                <motion.div
                                    className="uppercase text-sm text-white/70 tracking-wide group-hover:text-white/90 transition-colors duration-300 relative z-10"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.8 + idx * 0.15 }}
                                >
                                    {stat.label}
                                </motion.div>

                                {/* Decorative corner elements */}
                                <motion.div
                                    className="absolute top-2 right-2 w-2 h-2 bg-emerald-400/40 rounded-full opacity-0 group-hover:opacity-100"
                                    initial={false}
                                    animate={{
                                        scale: [1, 1.5, 1],
                                        opacity: [0.4, 0.8, 0.4],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        className="mt-12"
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 2.8 }}
                    >
                        <motion.div
                            whileHover={{
                                scale: 1.05,
                                y: -3,
                                transition: { duration: 0.2 },
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="relative group"
                        >
                            {/* Enhanced glowing border effect */}
                            <motion.div
                                className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-blue-400 to-emerald-400 rounded-lg opacity-60 group-hover:opacity-100 blur-sm transition-all duration-500"
                                animate={{
                                    backgroundPosition: [
                                        "0% 50%",
                                        "100% 50%",
                                        "0% 50%",
                                    ],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                style={{
                                    backgroundSize: "200% 200%",
                                }}
                            />

                            <Link
                                href="/courses"
                                className="relative inline-flex items-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg overflow-hidden"
                            >
                                {/* Shimmer effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 -translate-x-full"
                                    animate={{
                                        x: ["-100%", "200%"],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatDelay: 3,
                                        ease: "easeInOut",
                                    }}
                                />

                                {/* Pulsing background */}
                                <motion.div
                                    className="absolute inset-0 bg-emerald-400/30"
                                    animate={{
                                        opacity: [0, 0.3, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />

                                <span className="relative z-10">
                                    Get Started Today
                                </span>
                                <motion.span
                                    className="ml-2 text-xl relative z-10"
                                    animate={{
                                        x: [0, 8, 0],
                                        scale: [1, 1.1, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    →
                                </motion.span>
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* Enhanced Testimonials Section with Marquee */}
            <motion.section
                className="py-20 w-full mb-20 overflow-hidden bg-gradient-to-br from-blue-50/50 via-slate-50/30 to-emerald-50/50 dark:from-blue-950/20 dark:via-slate-950/10 dark:to-emerald-950/20"
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            delay: 1.2,
                            delayChildren: 1.4,
                            staggerChildren: 0.2,
                        },
                    },
                }}
            >
                <motion.div
                    className="text-center mb-16 w-full mx-auto px-4"
                    variants={itemVariants}
                >
                    <motion.div
                        className="inline-block mb-4"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Badge
                            variant="outline"
                            className="bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-300 px-4 py-1"
                        >
                            <span className="mr-2">💬</span>
                            Student Success Stories
                        </Badge>
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-blue-700 to-emerald-600 dark:from-slate-200 dark:via-blue-300 dark:to-emerald-400 bg-clip-text text-transparent">
                        What Our Students Say
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                        Real stories from learners who transformed their careers
                        and achieved their goals with our platform
                    </p>
                </motion.div>

                <motion.div className="relative" variants={itemVariants}>
                    <Marquee pauseOnHover className="[--duration:60s] pb-6">
                        {firstRow.map((testimonial, index) => (
                            <TestimonialCard
                                key={index}
                                testimonial={testimonial}
                            />
                        ))}
                    </Marquee>
                    <Marquee
                        reverse
                        pauseOnHover
                        className="[--duration:60s] pb-6"
                    >
                        {secondRow.map((testimonial, index) => (
                            <TestimonialCard
                                key={index}
                                testimonial={testimonial}
                            />
                        ))}
                    </Marquee>
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
                </motion.div>
            </motion.section>

            {/* Enhanced CTA Section */}
            <motion.section
                className="py-24 text-center bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 dark:from-black dark:via-blue-950 dark:to-emerald-950 relative overflow-hidden"
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            delay: 1.6,
                            delayChildren: 1.8,
                            staggerChildren: 0.1,
                        },
                    },
                }}
            >
                {/* Enhanced Background Effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.4),transparent_70%)]"></div>
                    <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_75%_75%,rgba(16,185,129,0.4),transparent_70%)]"></div>
                    <div className="absolute top-1/2 left-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(71,85,105,0.3),transparent_70%)]"></div>
                </div>

                <div className="w-full mx-auto relative z-10 px-4">
                    <motion.div variants={itemVariants}>
                        <motion.div
                            className="inline-block mb-8"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Badge
                                variant="outline"
                                className="bg-white/10 backdrop-blur-sm border-white/20 text-white px-6 py-3 text-base font-medium"
                            >
                                <motion.span
                                    className="mr-2 text-xl"
                                    animate={{
                                        rotate: [0, 15, -15, 0],
                                        scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    🚀
                                </motion.span>
                                Start Your Journey Today
                            </Badge>
                        </motion.div>
                        <motion.h2
                            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8"
                            variants={itemVariants}
                        >
                            <span className="bg-gradient-to-r from-white via-blue-200 to-emerald-200 bg-clip-text text-transparent">
                                Ready to Transform
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-emerald-300 via-blue-300 to-slate-300 bg-clip-text text-transparent">
                                Your Future?
                            </span>
                        </motion.h2>
                    </motion.div>
                    <motion.p
                        className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
                        variants={itemVariants}
                    >
                        Join thousands of learners who are already advancing
                        their careers and transforming their lives with our
                        cutting-edge platform
                    </motion.p>
                    <motion.div
                        className="flex flex-col sm:flex-row gap-6 justify-center"
                        variants={itemVariants}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative group"
                        >
                            {/* <div className="absolute -inset-px bg-gradient-to-r from-blue-500 via-emerald-500 to-slate-500 rounded-2xl opacity-75 group-hover:opacity-100 transition-all duration-500 blur-sm group-hover:blur-none"></div> */}
                            <Link
                                href="/courses"
                                className="relative inline-flex items-center justify-center px-5 md:px-10 py-5 md:py-5 text-xl font-bold text-white bg-gradient-to-r from-blue-600 via-emerald-600 to-slate-600 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                                <span className="relative flex items-center gap-3">
                                    <motion.span
                                        animate={{ rotate: [0, 360] }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                    >
                                        ⭐
                                    </motion.span>
                                    Start Learning Today
                                    <motion.span
                                        animate={{ x: [0, 8, 0] }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                        }}
                                    >
                                        →
                                    </motion.span>
                                </span>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Trust indicators */}
                    <motion.div
                        className="mt-16 flex flex-wrap justify-center items-center gap-8 text-white/60"
                        variants={itemVariants}
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            <span>No Credit Card Required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            <span>14-Day Money Back Guarantee</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            <span>Start Immediately</span>
                        </div>
                    </motion.div>
                </div>
            </motion.section>
        </>
    );
}
