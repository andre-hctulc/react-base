import { tv } from "tailwind-variants";
import type { TVCProps } from "../../types/index.js";
import { type FC } from "react";

const dialogBody = tv({
    // grow and scroll when content is too long
    base: ["grow min-h-0 overflow-y-auto", "box-border "],
    variants: {
        flex: {
            col: "flex flex-col",
            row: "flex flex-row",
        },
        size: {
            none: "",
            xs: "px-2 py-2",
            sm: "px-4 py-3",
            md: "px-6 py-5",
            lg: "px-8 py-6",
            xl: "px-10 py-8",
        },
        embedded: {
            true: "!py-0",
            footer: "!pb-0",
            header: "!pt-0",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

export interface DialogBodyProps extends TVCProps<typeof dialogBody, "div"> {}

/**
 * The body of a dialog.
 *
 * Use it with `Dialog` or `Popover`.
 *
 * ### Props
 * - `embedded` - Controls vertical padding. Use it in combination with dialog header and footer
 */
export const DialogBody: FC<DialogBodyProps> = ({ children, className, flex, size, embedded, ...props }) => {
    return (
        <div className={dialogBody({ className, flex, size, embedded })} {...props}>
            {children}
        </div>
    );
};
