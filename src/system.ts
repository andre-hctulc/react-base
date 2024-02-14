export function randomId() {
    const timestamp = Date.now().toString(36);
    const randomChars = Math.random().toString(36).substring(2, 10);
    return `${timestamp}-${randomChars}`;
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
