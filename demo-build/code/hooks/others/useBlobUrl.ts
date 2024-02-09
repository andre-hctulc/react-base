import React from "react";
import useId from "./useId";

export default function useBlobUrl(file: Blob | null | undefined) {
    const [blobUrl, setBlobUrl] = React.useState<string | undefined>();
    const id = useId();

    React.useEffect(() => {
        if (!file) return setBlobUrl(undefined);

        const url = URL.createObjectURL(file);
        setBlobUrl(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [file]);

    /**
     * Startet Download
     * @param fileName Name des Downloads. Standardmäßig zufällige Id
     */
    function download(fileName?: string) {
        if (!blobUrl) return;

        const a = document.createElement("a");

        a.href = blobUrl;
        a.download = typeof fileName === "string" ? fileName : id;

        a.click();
        // Clean up: remove the anchor
        document.body.removeChild(a);
    }

    return { url: blobUrl, download, blob: file || undefined };
}
