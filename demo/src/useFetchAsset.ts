import React from "react";
import { fetchAsset } from "./helpers";

export default function useFetchAsset(path: string): string | undefined | null {
    const [text, setText] = React.useState<string | null>();
    React.useEffect(() => {
        let interrupted = false;
        fetchAsset(path).then(t => {
            if (!interrupted) setText(t);
        });
        return () => {
            interrupted = true;
        };
    }, [path]);
    return text;
}
