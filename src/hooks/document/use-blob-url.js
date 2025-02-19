import React from "react";
export function useBlobUrl(file) {
    const [blobUrl, setBlobUrl] = React.useState();
    React.useEffect(() => {
        if (!file)
            return setBlobUrl(undefined);
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
    function download(fileName) {
        if (!blobUrl)
            return;
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = typeof fileName === "string" ? fileName : "unnamed";
        a.click();
        // Clean up: remove the anchor
        document.body.removeChild(a);
    }
    return { url: blobUrl, download, blob: file || undefined };
}
