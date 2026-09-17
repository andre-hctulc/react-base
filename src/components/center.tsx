import { cn } from "@/lib/utils.js";
import { type ComponentProps, type FC } from "react";

export interface CenterProps extends ComponentProps<"div"> {}

/**
 * Flex layout
 * - direction: row
 * - align: center
 * - justify: center
 */
export const Center: FC<CenterProps> = ({ className, ref, ...props }) => (
    <div ref={ref} className={cn("flex items-center justify-center", className)} {...props} />
);

/**
 * Flex layout
 * - direction: row
 * - justify: center
 */
export const CenterH: FC<CenterProps> = ({ className, ref, ...props }) => (
    <div ref={ref} className={cn("flex justify-center", className)} {...props} />
);

/**
 * Flex layout
 * - direction: row
 * - align: center
 */
export const CenterV: FC<CenterProps> = ({ className, ref, ...props }) => (
    <div ref={ref} className={cn("flex items-center", className)} {...props} />
);
