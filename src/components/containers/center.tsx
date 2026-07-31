import { cn } from "@/util/cn.js";
import { type ComponentProps, type FC } from "react";

export interface CenterProps extends ComponentProps<"div"> {}

/** Centers children both horizontally and vertically. */
export const Center: FC<CenterProps> = ({ className, ref, ...props }) => (
    <div ref={ref} className={cn("flex items-center justify-center", className)} {...props} />
);

/** Centers children horizontally. */
export const CenterH: FC<CenterProps> = ({ className, ref, ...props }) => (
    <div ref={ref} className={cn("flex justify-center", className)} {...props} />
);

/** Centers children vertically. */
export const CenterV: FC<CenterProps> = ({ className, ref, ...props }) => (
    <div ref={ref} className={cn("flex items-center", className)} {...props} />
);
