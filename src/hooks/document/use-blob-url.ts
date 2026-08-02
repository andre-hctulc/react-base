"use client";

import { useCallback, useEffect, useState } from "react";

function triggerDownload(url: string, fileName?: string): void {
    const a = document.createElement("a");
    a.href = url;
    if (fileName) a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

interface UseBlobUrlResult {
    url: string | undefined;
    /**
     * @returns Url given and download started?
     */
    download: (fileName?: string) => boolean;
    /**
     * Original blob file. Only provided if `rememberOriginal` is set to true.
     */
    blob: Blob | undefined;
}

/**
 * @param rememberOriginal Whether to keep a reference to the original blob file.
 */
export function useBlobUrl(file: Blob | null | undefined, rememberOriginal = false): UseBlobUrlResult {
    const [blobUrl, setBlobUrl] = useState<string | undefined>();
    const download = useCallback(
        (fileName?: string) => {
            if (!blobUrl) return false;
            triggerDownload(blobUrl, fileName);
            return true;
        },
        [blobUrl]
    );

    useEffect(() => {
        if (!file) return setBlobUrl(undefined);

        const url = URL.createObjectURL(file);
        setBlobUrl(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [file]);

    return { url: blobUrl, download, blob: rememberOriginal ? file || undefined : undefined };
}
