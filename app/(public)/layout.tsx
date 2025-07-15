import { ReactNode } from "react";
import { Navbar } from "./_components/Navbar";

export default function LayoutPublic({ children }: { children: ReactNode }) {
    return (
        <div>
            <Navbar />
            <main className="mx-auto px-0 md:px-0 lg:px-0">{children}</main>
        </div>
    );
}
