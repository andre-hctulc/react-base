/** Generates Tailwind size variants for a given prefix (xs→0.5 … 7xl→50, none→"") */
export function sz(prefix: string) {
    return {
        xs: `${prefix}-0.5`,
        sm: `${prefix}-1`,
        md: `${prefix}-2`,
        lg: `${prefix}-4`,
        xl: `${prefix}-8`,
        "2xl": `${prefix}-12`,
        "3xl": `${prefix}-16`,
        "4xl": `${prefix}-24`,
        "5xl": `${prefix}-32`,
        "6xl": `${prefix}-40`,
        "7xl": `${prefix}-50`,
        none: "",
    };
}

/** sz + an auto variant (e.g. "m-auto") */
export function msz(prefix: string) {
    return { ...sz(prefix), auto: `${prefix}-auto` };
}
