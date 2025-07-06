export const PRE = "RB_";

export function withPrefix(suffix: string) {
    return PRE + suffix;
}

export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
