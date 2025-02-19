import React from "react";
export function useSvgUrl(svg) {
    const [svgUrl, setSvgUrl] = React.useState();
    React.useEffect(() => {
        if (!svg)
            return setSvgUrl(undefined);
        const serializer = new XMLSerializer();
        const xml = serializer.serializeToString(svg);
        const blob = new Blob([xml], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        setSvgUrl(url);
        return () => {
            URL.revokeObjectURL(url);
        };
    }, [svg]);
    return { url: svgUrl, svg: svg || undefined };
}
