"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/auth-client";
import { Button, buttonVariants } from "@/components/ui/button";
import UserDropdown from "./UserDropdown";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";

const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Dashboard", href: "/admin" },
];

export function Navbar() {
    const { data: session, isPending } = authClient.useSession();
    const pathname = usePathname();

    const isActiveRoute = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(href);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-[backdrop-filter]:bg-background/60">
            <div className="container flex min-h-16 items-center mx-auto px-4 md:px-6 lg:px-8 md:justify-between justify-between">
                <div className="flex items-center gap-2">
                    {/* Mobile menu trigger */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                className="group size-8 md:hidden"
                                variant="ghost"
                                size="icon"
                            >
                                <svg
                                    className="pointer-events-none"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 12L20 12"
                                        className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                                    />
                                </svg>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            align="start"
                            className="w-48 p-2 md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border border-blue-200/20 dark:border-slate-700/50 shadow-xl"
                        >
                            <NavigationMenu className="max-w-none *:w-full">
                                <NavigationMenuList className="flex-col items-start gap-1 md:gap-2">
                                    {navigationItems.map((link, index) => (
                                        <NavigationMenuItem
                                            key={index}
                                            className="w-full"
                                        >
                                            <NavigationMenuLink
                                                href={link.href}
                                                active={isActiveRoute(
                                                    link.href
                                                )}
                                                className={`w-full px-3 py-2 rounded-lg font-medium transition-all duration-300 relative overflow-hidden block ${
                                                    isActiveRoute(link.href)
                                                        ? "bg-gradient-to-r from-blue-500/10 to-emerald-500/10 text-blue-600 dark:text-blue-400 border border-blue-200/30 dark:border-blue-800/30"
                                                        : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-slate-50/50 dark:hover:from-blue-950/20 dark:hover:to-slate-950/20 hover:shadow-md"
                                                }`}
                                            >
                                                <span className="relative z-10">
                                                    {link.name}
                                                </span>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </PopoverContent>
                    </Popover>
                    {/* Main nav */}
                    <div className="flex items-center gap-6">
                        <a
                            href="#"
                            className="text-primary hover:text-primary/90"
                        >
                            <Image src={Logo} alt="Logo" className="size-7" />
                        </a>
                    </div>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 max-md:hidden">
                    {/* Navigation menu */}
                    <NavigationMenu>
                        <NavigationMenuList className="gap-2">
                            {navigationItems.map((link, index) => (
                                <NavigationMenuItem key={index}>
                                    <NavigationMenuLink
                                        active={isActiveRoute(link.href)}
                                        href={link.href}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 relative overflow-hidden ${
                                            isActiveRoute(link.href)
                                                ? "bg-gradient-to-r from-blue-500/10 to-emerald-500/10 text-blue-600 dark:text-blue-400 shadow-lg border border-blue-200/30 dark:border-blue-800/30 py-[6.5px]"
                                                : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-slate-50/50 dark:hover:from-blue-950/20 dark:hover:to-slate-950/20 hover:shadow-md"
                                        }`}
                                    >
                                        {/* Shimmer effect for active link */}
                                        {isActiveRoute(link.href) && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent -translate-x-full animate-pulse rounded-lg" />
                                        )}

                                        <span className="relative z-10">
                                            {link.name}
                                        </span>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="flex items-center space-x-4">
                    <ThemeToggle />
                    {isPending ? null : session ? (
                        <UserDropdown
                            email={session.user.email}
                            image={
                                session?.user.image ??
                                `https://avatar.vercel.sh/${session?.user.email}`
                            }
                            name={
                                session?.user.name &&
                                session.user.name.length > 0
                                    ? session.user.name
                                    : session?.user.email.split("@")[0]
                            }
                        />
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className={buttonVariants({
                                    variant: "secondary",
                                })}
                            >
                                Login
                            </Link>
                            <Link href="/login" className={buttonVariants()}>
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
