// * SSR

import LinkContainer from "@react-client/components/navigation/links/LinkContainer/LinkContainer";
import clsx from "clsx";
import Styled from "@react-client/components/others/Styled";
import Chip from "@react-client/components/data-display/chip/chip";
import { useSearchParams } from "next/navigation";
import useMutableSearchParams from "@react-client/hooks/navigation/useMutableSearchParams";

interface TabProps {
    icon?: React.ReactElement;
    children: string;
    style?: React.CSSProperties;
    className?: string;
    /** @default "default" */
    variant?: "chips" | "default";
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLElement>;
    /** Aktiv */
    href?: string;
    id?: string | number;
    active?: boolean;
}

export default function Tab(props: TabProps) {
    const active = !!props.active;
    const variant = props.variant || "default";
    let main: React.ReactNode;

    if (variant === "chips") {
        // chips text color hover effect ist in css class Tab_chip
        main = (
            <Chip startIcon={props.icon} variant="pale" className={clsx("Tab_chip", active && "outline-divider outline !bg-bg-paper/40")}>
                {props.children}
            </Chip>
        );
    } else
        main = (
            <div
                className={clsx(
                    "flex flex-row px-2.5 py-1.5 items-center text-text-secondary text-sm transition",
                    !props.disabled && "cursor-pointer hover:bg-action-hover",
                    active ? "border-b-2 border-primary rounded-t" : "rounded border-b-2 border-transparent"
                )}
                style={{ transition: "background-color 0.3s ease, border-color 0.1s ease" }}
            >
                {props.icon && <Styled className="mr-1.5">{props.icon}</Styled>}
                {props.children}
            </div>
        );

    return (
        <LinkContainer onClick={props.onClick} href={props.href} style={props.style} className={props.className}>
            {main}
        </LinkContainer>
    );
}
