type FilterPartType = "s" | "j" | "n" | "b";

export function defaultFilterStringifier(filter: any): string {
    if (!filter || typeof filter !== "object") return "";

    const subParams = new URLSearchParams();

    for (const paramName in filter) {
        const paramValue = filter[paramName];

        if (paramValue == null) continue;

        let typeAnnotation: `${FilterPartType}_`;
        let v: string;

        switch (typeof paramValue) {
            case "number":
                typeAnnotation = "n_";
                v = paramValue + "";
                break;
            case "string":
                typeAnnotation = "s_";
                v = paramValue + "";
                break;
            case "boolean":
                typeAnnotation = "b_";
                v = paramValue + "";
                break;
            case "object":
                typeAnnotation = "j_";
                v = JSON.stringify(paramValue);
                break;
            default:
                continue;
        }

        subParams.set(paramName, typeAnnotation + v);
    }

    if (!subParams.size) return "";
    else return encodeURIComponent(subParams.toString());
}

export function defaultFilterParser(filter: string | undefined | null): any {
    if (!filter || typeof filter !== "string") return {};

    const subParams = new URLSearchParams(decodeURIComponent(filter));
    const result: any = {};

    if (!subParams.size) return {};

    for (const paramName of Array.from(subParams.keys())) {
        let paramValue = subParams.get(paramName);

        if (paramValue === null) continue;

        const type: FilterPartType = paramValue[0] as any;

        if (!type) continue;

        // type annotation überspringen
        paramValue = paramValue.substring(2);

        let v: any;

        switch (type) {
            case "n":
                v = parseInt(paramValue);
                break;
            case "s":
                v = paramValue;
                break;
            case "b":
                v = paramValue === "true";
                break;
            case "j":
                v = JSON.parse(paramValue);
                break;
            default:
                continue;
        }

        result[paramName] = v;
    }

    return result;
}
