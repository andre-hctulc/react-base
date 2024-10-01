import clsx from "clsx";
import type React from "react";

interface PageMainProps {
    children: React.ReactNode;
    className?: string;
}

export const PageMain: React.FC<PageMainProps> = ({ children, className }) => {
    return (
        <main className={clsx("w-full max-w-7xl py-5 px-5 md:px-10 self-center", className)}>{children}</main>
    );
};
