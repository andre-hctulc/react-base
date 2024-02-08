export async function fetchAsset(path: string): Promise<string | null> {
    if (!path.startsWith("/")) path = "/" + path;
    try {
        const response = await fetch(path, { method: "GET" });
        return await response.text();
    } catch (err) {
        return null;
    }
}

export function dirname(path: string) {
    if (!path.includes("/")) return ".";
    return path.replace(/\\/g, "/").replace(/\/[^/]*$/, "");
}
