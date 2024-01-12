export type ThemeColor = "mode" | "primary" | "secondary" | "error" | "warning" | "info" | "success" | "accent" | "new" | "chat" | "fs" | "note" | "task" | "active";

export type Size = "small" | "medium" | "large";
export type XSize = "xsmall" | "small" | "medium" | "large" | "xlarge";
export type DynamicSize = "small" | "medium" | "large" | number;
export type XDynamicSize = "xsmall" | "small" | "medium" | "large" | "xlarge" | number;

export type SizeMap<T = number> = { [K in DynamicSize]: T };
export type XSizeMap<T = number> = { [K in XDynamicSize]: T };
