import { type ComponentProps, type FC } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn.util.js";

const dotVariants = cva("rounded-full shrink-0", {
    variants: {
        color: {
            blue: "bg-blue-500",
            green: "bg-green-500",
            gray: "bg-gray-500",
            red: "bg-red-500",
            yellow: "bg-yellow-500",
            purple: "bg-purple-500",
            pink: "bg-pink-500",
            primary: "bg-primary",
            secondary: "bg-secondary",
            success: "bg-success-500",
            warning: "bg-warning-500",
            info: "bg-info-500",
            destructive: "bg-destructive",
        },
        size: {
            xs: "size-1",
            sm: "size-2",
            md: "size-4",
            lg: "size-6",
            xl: "size-8",
            "2xl": "size-10",
            "3xl": "size-12",
            "4xl": "size-16",
        },
    },
    defaultVariants: { color: "gray", size: "md" },
});

export type DotColor = NonNullable<VariantProps<typeof dotVariants>["color"]>;
export type DotSize = NonNullable<VariantProps<typeof dotVariants>["size"]>;

export interface DotProps
    extends Omit<ComponentProps<"span">, "color" | "size">, VariantProps<typeof dotVariants> {}

export { dotVariants };

export const Dot: FC<DotProps> = ({ color, size, className, ...props }) => (
    <span className={cn(dotVariants({ color, size }), className)} {...props} />
);
