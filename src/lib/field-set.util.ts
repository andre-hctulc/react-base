export interface FieldSetParams<F extends object = Record<string, any>> {
    include?: Iterable<keyof F>;
    exclude?: Iterable<keyof F>;
    namePrefix?: string;
}

export interface FieldSetUtil<F extends object = Record<string, any>> {
    shouldRender: (key: keyof F) => boolean;
    getName: (key: keyof F) => string;
}

export function createFieldSetUtil<F extends object = Record<string, any>>(
    params: FieldSetParams<F> = {},
): FieldSetUtil<F> {
    const { include, exclude, namePrefix } = params;

    const includeSet = include ? new Set(include) : null;
    const excludeSet = exclude ? new Set(exclude) : null;

    const shouldRender = (key: keyof F) => {
        if (includeSet && !includeSet.has(key)) {
            return false;
        }
        if (excludeSet && excludeSet.has(key)) {
            return false;
        }
        return true;
    };

    const getName = (key: keyof F) => `${namePrefix ?? ""}${String(key)}`;

    return { shouldRender, getName };
}
