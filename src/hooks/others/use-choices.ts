import { useCallback, useEffect, useMemo, useState } from "react";
import type { Choice } from "../../types/index.js";
import { useRefOf } from "./use-ref-of.js";

type ChoiceValue<C extends Choice> = C extends Choice<infer V, any> ? V : never;
type ChoiceData<C extends Choice> = C extends Choice<any, infer D> ? D : never;

interface UseChoicesResult<C extends Choice> {
    choices: C[];
    activeChoices: C[];
    activateChoice: (values: ChoiceValue<C>) => void;
    toggleChoice: (value: ChoiceValue<C>) => void;
    activateChoices: (values: ChoiceValue<C>[]) => void;
    deactivateChoice: (value: ChoiceValue<C>) => void;
    deactivateChoices: (value: ChoiceValue<C>[]) => void;
    isActiveChoice: (value: ChoiceValue<C>) => boolean;
    areActiveChoices: (value: ChoiceValue<C>[]) => boolean;
    controlled: boolean;
    rawValues: string[];
    activeValues: ChoiceValue<C>[];
}

interface UseChoicesOptions<C extends Choice> {
    multiple: boolean;
    defaultValue: ChoiceValue<C>[];
    value: ChoiceValue<C>[];
    onChange: (value: ChoiceValue<C>[], choices: C[]) => void;
}

export function useChoices<C extends Choice<any, any>>(
    choices: C[],
    { multiple, defaultValue, value: controlledValue, onChange }: Partial<UseChoicesOptions<C>>
): UseChoicesResult<C> {
    const findChoices = (value: string[]) => {
        const valuesSet = new Set(value);
        return choices.filter((o) => valuesSet.has(o.value));
    };
    const onChangeRef = useRefOf(onChange);
    const controlled = controlledValue !== undefined;
    const [value, setValue] = useState<ChoiceValue<C>[]>(() => {
        let def: ChoiceValue<C>[] = [];

        if (controlledValue) {
            def = controlledValue;
        } else if (defaultValue) {
            def = defaultValue;
        }

        if (multiple) {
            return def;
        }

        return def.length ? [def[0]] : [];
    });
    const currentValuesSet = useMemo(() => new Set(value), [value]);
    const activeChoices = useMemo(() => {
        return choices.filter((o) => currentValuesSet.has(o.value));
    }, [currentValuesSet, choices]);
    const activateChoices = useCallback(
        (values: ChoiceValue<C>[]) => {
            let newValues: ChoiceValue<C>[];

            if (multiple) {
                const valuesSet = new Set(values);
                newValues = [...Array.from(valuesSet), ...value.filter((o) => !valuesSet.has(o))];
            }
            if (values.length) {
                newValues = [values[0]];
            } else {
                newValues = [];
            }

            if (!controlled) {
                setValue(newValues);
            }

            onChangeRef.current?.(newValues, findChoices(newValues));
        },
        [value, multiple, controlled]
    );
    const activateChoice = useCallback(
        (value: ChoiceValue<C>) => {
            activateChoices([value]);
        },
        [activateChoices]
    );
    const deactivateChoices = useCallback(
        (values: ChoiceValue<C>[]) => {
            const valuesSet = new Set(values);
            const newValue = value.filter((o) => !valuesSet.has(o));
            if (!controlled) {
                setValue(newValue);
            }
            onChangeRef.current?.(newValue, findChoices(newValue));
        },
        [value, controlled]
    );
    const deactivateChoice = useCallback(
        (value: ChoiceValue<C>) => {
            deactivateChoices([value]);
        },
        [deactivateChoices]
    );
    const areActiveChoices = useCallback(
        (values: ChoiceValue<C>[]) => {
            return values.every((v) => currentValuesSet.has(v));
        },
        [currentValuesSet]
    );
    const isActiveChoice = useCallback(
        (value: ChoiceValue<C>) => {
            return currentValuesSet.has(value);
        },
        [currentValuesSet]
    );
    const toggleChoice = useCallback(
        (toggleValue: ChoiceValue<C>) => {
            let newValue: ChoiceValue<C>[];
            if (value.includes(toggleValue)) {
                newValue = value.filter((v) => v !== toggleValue);
            } else {
                newValue = [toggleValue, ...value];
            }
            if (!multiple) {
                newValue = newValue.slice(0, 1);
            }
            if (!controlled) {
                setValue(newValue);
            }
            onChangeRef.current?.(newValue, findChoices(newValue));
        },
        [value, controlled, multiple]
    );
    const rawValues = useMemo(() => {
        return value.map((v) => String(v));
    }, [value]);

    useEffect(() => {
        if (controlled) {
            setValue(controlledValue);
        }
        // Use items as deps, so one can provide values without memoizing them
    }, [...(controlledValue || [])]);

    useEffect(() => {
        if (!multiple && value.length > 1) {
            setValue([value[0]]);
        }
    }, [multiple]);

    return {
        choices,
        activeChoices,
        activateChoices,
        activateChoice,
        deactivateChoices,
        deactivateChoice,
        isActiveChoice,
        areActiveChoices,
        toggleChoice,
        controlled,
        rawValues,
        activeValues: value,
    };
}
