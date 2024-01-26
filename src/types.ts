// TODO fs, chat etc entfernen (Diese kann man mit interface merging erweitern? (Declaration Merging))
export type ThemeColor = "mode" | "primary" | "secondary" | "error" | "warning" | "info" | "success" | "accent" | "new" | "chat" | "fs" | "note" | "task" | "active";

export type Size = "small" | "medium" | "large";
export type XSize = "xsmall" | "small" | "medium" | "large" | "xlarge";
export type DynamicSize = "small" | "medium" | "large" | number;
export type XDynamicSize = "xsmall" | "small" | "medium" | "large" | "xlarge" | number;

export type SizeMap<T = number> = { [K in DynamicSize]: T };
export type XSizeMap<T = number> = { [K in XDynamicSize]: T };

// * Props

export type PropsOf<T> = T extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[T] : T extends React.ComponentType<infer P> ? P : never;

export interface StyledComponentProps {
    className?: string;
    style?: React.CSSProperties;
}
export interface ParentComponentProps<T extends React.ReactNode = React.ReactNode> {
    children?: T;
}

export interface CommomComponentProps extends StyledComponentProps, ParentComponentProps {}

export interface EventProps<T = Element> {
    // Mouse
    onClick?: React.MouseEvent<T>;
    onDblClick?: React.MouseEvent<T>;
    onMouseOver?: React.MouseEvent<T>;
    onMouseLeave?: React.MouseEvent<T>;
    // Change
    onChange?: React.ChangeEvent<T>;
    // Focus
    onFocus?: React.FocusEvent<T>;
    onBlur?: React.FocusEvent<T>;
}

export namespace NextProps {
    export type LayoutProps<P extends string = never> = {
        children?: React.ReactNode;
        searchParams: Record<string, string>;
    } & Record<P, React.ReactNode>;

    export interface PageProps {
        children?: React.ReactNode;
        searchParams: Record<string, string>;
    }
}

export type SlotProps<C extends Record<string, any>> = { slotProps?: { [K in keyof C]?: Partial<PropsOf<C[K]>> } };
