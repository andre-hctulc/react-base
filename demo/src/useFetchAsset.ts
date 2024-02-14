import React from "react";
import { fetchAsset } from "./helpers";

export default function useFetchAsset(path: string, transformContent?: (content: string) => string): string | undefined | null {
    const [text, setText] = React.useState<string | null>();
    React.useEffect(() => {
        let interrupted = false;
        fetchAsset(path).then(t => {
            if (transformContent) t = transformContent(t || "");
            if (!interrupted) {
                setText(t);
            }
        });
        return () => {
            interrupted = true;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path]);
    return text;
}
