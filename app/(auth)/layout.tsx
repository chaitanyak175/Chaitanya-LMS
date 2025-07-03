import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import Logo from "@/public/logo.png";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center">
            <Link
                href="/"
                className={buttonVariants({
                    variant: "outline",
                    className: "absolute top-4 left-4",
                })}
            >
                <ArrowLeft className="size-4" />
                Back
            </Link>
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link
                    className="flex items-center gap-2 self-center font-medium font-sans text-2xl"
                    href="/"
                >
                    <Image
                        src={Logo}
                        alt="Logo"
                        className="size-8"
                        quality={100}
                    />
                    Chaitanya LMS
                </Link>
                {children}
                <div className="text-balance text-center text-xs text-muted-foreground">
                    By clicking continue you agree to our <br />
                    <span className="hover:text-primary hover:underline cursor-pointer">
                        Terms of service
                    </span>{" "}
                    and
                    <span className="hover:text-primary hover:underline cursor-pointer">
                        {" "}
                        Privacy Policy
                    </span>
                    .
                </div>
            </div>
        </div>
    );
}
