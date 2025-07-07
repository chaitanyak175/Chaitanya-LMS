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
                            className="w-36 p-1 md:hidden"
                        >
                            <NavigationMenu className="max-w-none *:w-full">
                                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                                    {navigationItems.map((link, index) => (
                                        <NavigationMenuItem
                                            key={index}
                                            className={`py-1.5 font-medium ${
                                                isActiveRoute(link.href)
                                                    ? "text-primary"
                                                    : "text-muted-foreground hover:text-primary"
                                            }`}
                                        >
                                            <NavigationMenuLink
                                                href={link.href}
                                                active={isActiveRoute(
                                                    link.href
                                                )}
                                                className="py-1.5 font-medium text-muted-foreground hover:text-primary data-[active=true]:text-foreground data-[active=true]:bg-muted rounded-md px-2"
                                            >
                                                {link.name}
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
                        <NavigationMenuList className="gap-4">
                            {navigationItems.map((link, index) => (
                                <NavigationMenuItem key={index}>
                                    <NavigationMenuLink
                                        active={isActiveRoute(link.href)}
                                        href={link.href}
                                        className={`py-1.5 font-medium ${
                                            isActiveRoute(link.href)
                                                ? "bg-muted shadow-xl text-green-700"
                                                : "text-muted-foreground hover:text-primary"
                                        }`}
                                    >
                                        {link.name}
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
