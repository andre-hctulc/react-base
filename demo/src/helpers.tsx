import { ThemeColor } from "@react-base/src/types";

export async function fetchAsset(path: string): Promise<string | null> {
    if (path.startsWith("./")) path = path.substring(2);

    // use github api to fetch the content of the file
    const repoOwner = "andre-hctulc";
    const repoName = "react-base";
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`;

    try {
        const response = await fetch(url, { method: "GET", credentials: "omit", headers: { Accept: "application/vnd.github.raw+json" } });
        return await response.text();
    } catch (err) {
        return null;
    }
}

export function dirname(path: string) {
    if (!path.includes("/")) return ".";
    return path.replace(/\\/g, "/").replace(/\/[^/]*$/, "");
}

export const themeColors: ThemeColor[] = ["accent", "error", "info", "primary", "secondary", "success", "warning"];
