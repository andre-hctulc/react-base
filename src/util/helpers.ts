export * from "./react";

export function resolvePropertyPath(obj: object, path: string): any {
    const val = path.split(".").reduce((acc: any, key) => {
        return acc && acc[key] !== undefined ? acc[key] : undefined;
    }, obj);
    return val;
}

export function setPropertyByPath(obj: object, path: string, value: any): void {
    const keys = path.split(".");
    keys.reduce((acc: any, key: string, index: number) => {
        // If we're at the last key, set the value
        if (index === keys.length - 1) {
            acc[key] = value;
        }
        // Otherwise, create the next object if it doesn't exist
        else {
            if (!acc[key]) {
                acc[key] = {};
            }
        }
        return acc[key];
    }, obj);
}
