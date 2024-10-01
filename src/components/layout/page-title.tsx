import type React from "react";

interface PageTitleProps {
    title?: string;
    actions?: React.ReactNode;
    badges?: React.ReactNode;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title, actions, badges }) => {
    return (
        <div className="flex flex-col w-full max-w-7xl pt-6 px-5 md:px-10 self-center">
            <div className="flex items-center gap-3 py-2">
                <h2 className="text-lg font-medium">{title}</h2>
                {badges && <div className="flex gap-3">{badges}</div>}
                {actions && <div className="flex items-center gap-3 ml-auto">{actions}</div>}
            </div>
            <hr className="my-5" />
        </div>
    );
};
