import React from "react";

export default function useBlobUrl(file: Blob | null | undefined) {
    const [blobUrl, setBlobUrl] = React.useState<string | undefined>();

    React.useEffect(() => {
        if (!file) return setBlobUrl(undefined);

        const url = URL.createObjectURL(file);
        setBlobUrl(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [file]);

    /**
     * Starts a  download
     * @param fileName
     */
    function download(fileName?: string) {
        if (!blobUrl) return;

        const a = document.createElement("a");

        a.href = blobUrl;
        a.download = typeof fileName === "string" ? fileName : "unnamed";

        a.click();
        // Clean up: remove the anchor
        document.body.removeChild(a);
    }

    return { url: blobUrl, download, blob: file || undefined };
}
