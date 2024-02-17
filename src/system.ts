export function randomId(length = 12) {
    return [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join("");
}

export function joinPaths(...parts: (string | undefined | null)[]) {
    const delimiter = "/";
    let joinedPath = parts.filter(p => !!p).join(delimiter);
    joinedPath = joinedPath.replace(/\/{2,}/g, delimiter);
    return joinedPath;
}

export function randomNumber(min: number, max: number) {
    return min + Math.round(Math.random() * (max - min));
}

// export function compareDates(d1: Date | null | undefined, d2: Date | null | undefined) {
//     if (!d1 && !d2) return true;
//     else if (d1 && d2) return isEqualDate(d1, d2);
//     else return false;
// }
