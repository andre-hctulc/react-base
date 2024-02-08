import React from "react";
import { StyledComponentProps } from "@/src/types";
import useFetchAsset from "./useFetchAsset";
import Skeleton from "@/src/components/data-display/feedback/Skeleton";
import Alert from "@/src/components/data-display/alerts/Alert";
import { highlight, languages } from "prismjs";
import clsx from "clsx";

interface CodeProps extends StyledComponentProps {
    path: string;
}

export default function Code(props: CodeProps) {
    const code = useFetchAsset(props.path);
    const lang = React.useMemo(() => (props.path.endsWith(".tsx") ? "tsx" : "ts"), [props.path]);
    const highlightedCode = React.useMemo(() => {
        if (typeof code === "string") {
            if (lang === "ts") return highlight(code, languages.javascript, "typescript");
            else return highlight(code, languages.javascript, "tsx");
        } else return "";
    }, [code, lang]);

    return (
        <div className={clsx("overflow-auto", props.className)} style={props.style}>
            {code === null && <Alert severity="error">Failed to load asset</Alert>}
            {code === undefined && <Skeleton height={200} />}
            {typeof code === "string" && (
                <pre>
                    <code className={`language-${lang}`} dangerouslySetInnerHTML={{ __html: highlightedCode }} />
                </pre>
            )}
        </div>
    );
}
