import { Spinner, type SpinnerProps } from "flowbite-react";
import type { FC, SVGProps } from "react";

export type SpinnerIconProps = Pick<SpinnerProps, "size" | "color" | "className"> & SVGProps<SVGSVGElement>;

const iconProps: () => (keyof SpinnerIconProps)[] = () => [
    "width",
    "height",
    "viewBox",
    "accentHeight",
    "fill",
    "stroke",
    "strokeWidth",
    "strokeLinecap",
    "strokeLinejoin",
];

/**
 * Spinner that can be used as an icon without type issues.
 */
export const SpinnerIcon: FC<SpinnerIconProps> = (props) => {
    const p = { ...props };
    for (const key in iconProps()) {
        delete (p as any)[key];
    }
    return <Spinner {...(p as any)} />;
};
