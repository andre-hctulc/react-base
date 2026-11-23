"use client";

import * as React from "react";
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { useDirection } from "@base-ui/react/direction-provider";
import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar";
import { ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils.js";

const itemClasses =
    "group/menu-item relative flex w-full cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-left text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:hover:bg-destructive/10 data-[variant=destructive]:hover:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:hover:bg-destructive/20 dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

function Menu({ className, ...props }: Omit<ToolbarPrimitive.Root.Props, "disabled" | "orientation">) {
    return (
        <ToolbarPrimitive.Root
            data-slot="menu"
            role="menu"
            orientation="vertical"
            className={(state) =>
                cn(
                    "flex min-w-32 flex-col rounded-lg p-1 text-foreground",
                    typeof className === "function" ? className(state) : className,
                )
            }
            {...props}
        />
    );
}

function MenuGroup({ className, ...props }: Omit<ToolbarPrimitive.Group.Props, "disabled">) {
    return (
        <ToolbarPrimitive.Group
            data-slot="menu-group"
            role="group"
            className={cn("not-first:mt-2", className)}
            {...props}
        />
    );
}

function MenuLabel({ className, inset, ...props }: React.ComponentProps<"div"> & { inset?: boolean }) {
    return (
        <div
            data-slot="menu-label"
            data-inset={inset}
            className={cn("px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7", className)}
            {...props}
        />
    );
}

function MenuItem({
    className,
    inset,
    variant = "default",
    ...props
}: ToolbarPrimitive.Button.Props & {
    inset?: boolean;
    variant?: "default" | "destructive";
}) {
    return (
        <ToolbarPrimitive.Button
            data-slot="menu-item"
            data-inset={inset}
            data-variant={variant}
            role="menuitem"
            className={(state) =>
                cn(itemClasses, typeof className === "function" ? className(state) : className)
            }
            {...props}
        />
    );
}

function MenuLink({
    className,
    inset,
    variant = "default",
    ...props
}: ToolbarPrimitive.Link.Props & {
    inset?: boolean;
    variant?: "default" | "destructive";
}) {
    return (
        <ToolbarPrimitive.Link
            data-slot="menu-link"
            data-inset={inset}
            data-variant={variant}
            role="menuitem"
            className={(state) =>
                cn(itemClasses, typeof className === "function" ? className(state) : className)
            }
            {...props}
        />
    );
}

function MenuSeparator({ className, ...props }: ToolbarPrimitive.Separator.Props) {
    return (
        <ToolbarPrimitive.Separator
            data-slot="menu-separator"
            className={(state) =>
                cn(
                    "-mx-1 my-1 h-px bg-border",
                    typeof className === "function" ? className(state) : className,
                )
            }
            {...props}
        />
    );
}

const SubmenuContext = React.createContext<React.RefObject<HTMLButtonElement | null> | null>(null);

function SubmenuRoot({ children, ...props }: CollapsiblePrimitive.Root.Props) {
    const triggerRef = React.useRef<HTMLButtonElement>(null);

    return (
        <SubmenuContext.Provider value={triggerRef}>
            <CollapsiblePrimitive.Root data-slot="menu-submenu" role="none" {...props}>
                {children}
            </CollapsiblePrimitive.Root>
        </SubmenuContext.Provider>
    );
}

function SubmenuTrigger({
    className,
    children,
    onKeyDown,
    ...props
}: Omit<CollapsiblePrimitive.Trigger.Props, "render">) {
    const triggerRef = React.useContext(SubmenuContext);
    const direction = useDirection();

    return (
        <CollapsiblePrimitive.Trigger
            data-slot="menu-submenu-trigger"
            role="menuitem"
            render={<ToolbarPrimitive.Button ref={triggerRef} />}
            className={(state) =>
                cn(itemClasses, typeof className === "function" ? className(state) : className)
            }
            onKeyDown={(event) => {
                onKeyDown?.(event);
                if (event.defaultPrevented || event.currentTarget.getAttribute("aria-disabled") === "true")
                    return;
                const expanded = event.currentTarget.getAttribute("aria-expanded") === "true";
                const openKey = direction === "rtl" ? "ArrowLeft" : "ArrowRight";
                const closeKey = direction === "rtl" ? "ArrowRight" : "ArrowLeft";
                if ((event.key === openKey && !expanded) || (event.key === closeKey && expanded)) {
                    event.preventDefault();
                    event.stopPropagation();
                    event.currentTarget.click();
                }
            }}
            {...props}
        >
            {children}
            <ChevronRightIcon
                aria-hidden="true"
                className="ms-auto transition-transform rtl:-scale-x-100 group-aria-expanded/menu-item:rotate-90"
            />
        </CollapsiblePrimitive.Trigger>
    );
}

function SubmenuContent({
    className,
    onKeyDown,
    ...props
}: Omit<CollapsiblePrimitive.Panel.Props, "keepMounted" | "hiddenUntilFound">) {
    const triggerRef = React.useContext(SubmenuContext);
    const direction = useDirection();

    return (
        <CollapsiblePrimitive.Panel
            data-slot="menu-submenu-content"
            role="group"
            className={(state) =>
                cn(
                    "ms-3 border-s border-border ps-2",
                    typeof className === "function" ? className(state) : className,
                )
            }
            onKeyDown={(event) => {
                onKeyDown?.(event);
                const trigger = triggerRef?.current;
                if (
                    !event.defaultPrevented &&
                    event.key === (direction === "rtl" ? "ArrowRight" : "ArrowLeft") &&
                    trigger?.getAttribute("aria-expanded") === "true" &&
                    trigger.getAttribute("aria-disabled") !== "true"
                ) {
                    event.preventDefault();
                    event.stopPropagation();
                    trigger.focus();
                    trigger.click();
                }
            }}
            {...props}
        />
    );
}

function MenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
    return (
        <span
            data-slot="menu-shortcut"
            className={cn(
                "ml-auto text-xs tracking-widest text-muted-foreground group-hover/menu-item:text-accent-foreground group-focus/menu-item:text-accent-foreground group-data-[variant=destructive]/menu-item:text-destructive",
                className,
            )}
            {...props}
        />
    );
}

export {
    Menu,
    MenuGroup,
    MenuLabel,
    MenuItem,
    MenuLink,
    MenuSeparator,
    SubmenuRoot,
    SubmenuTrigger,
    SubmenuContent,
    MenuShortcut,
};
