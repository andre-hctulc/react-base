export function randomId(length = 12) {
    return [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join("");
}

export function joinPaths(...parts: (string | undefined | null)[]) {
    const delimiter = "/";
    let joinedPath = parts.filter((p) => !!p).join(delimiter);
    joinedPath = joinedPath.replace(/\/{2,}/g, delimiter);
    return joinedPath;
}

export function randomNumber(min: number, max: number) {
    return min + Math.round(Math.random() * (max - min));
}
export const PRE = "RB_";

export function withPrefix(suffix: string) {
    return PRE + suffix;
}
