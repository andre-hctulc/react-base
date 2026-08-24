"use client";

import {
    Children,
    cloneElement,
    createContext,
    isValidElement,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ComponentProps,
    type FC,
    type FormEvent,
    type SubmitEvent,
    type ReactElement,
    type ReactNode,
    type ChangeEvent,
} from "react";
import { Button } from "@/components/ui/button.js";
import { Progress } from "@/components/ui/progress.js";
import { ProgressDecorator } from "./progress-decorator.js";
import { cn } from "@/lib/utils.js";
import { usePersistentState } from "@/hooks/use-persistent-state.js";
import { Spinner } from "@/components/ui/spinner.js";
import { useRefOf } from "@/hooks/use-ref-of.js";

type MultiStepFormData = Record<string, unknown>;

interface MultiStepFormContextValue {
    stepIndex: number;
    totalSteps: number;
    isFirst: boolean;
    isLast: boolean;
    goNext: () => void;
    goBack: () => void;
    goTo: (index: number) => void;
    reset: () => void;
    /**
     * Registers the active step's form submit trigger (set by {@link MultiStepFormSub}).
     * Pass `null` to unregister.
     */
    registerStepSubmit: (trigger: (() => void) | null) => void;
    /**
     * Advances to the next step, deferring to a registered step submit trigger if present.
     */
    requestAdvance: () => void;
    /**
     * The active step's title, set by {@link MultiStepFormTitle} when rendered within it.
     */
    stepTitle: ReactNode | null;
    registerStepTitle: (title: ReactNode | null) => void;
    data: MultiStepFormData[];
    updateData: (newData: MultiStepFormData) => void;
}

const MultiStepFormContext = createContext<MultiStepFormContextValue | null>(null);

function useMultiStepForm(): MultiStepFormContextValue {
    const ctx = useContext(MultiStepFormContext);
    if (!ctx) {
        throw new Error("MultiStepForm compound components must be used within a MultiStepForm");
    }
    return ctx;
}

export interface MultiStepFormProps extends ComponentProps<"div"> {
    /**
     * Key used to persist the current step index (survives page reloads).
     */
    persistKey: string;
    storage?: Storage;
    defaultStep?: number;
    onStepChange?: (stepIndex: number, data: MultiStepFormData[]) => void;
    /**
     * Called when {@link MultiStepFormNextButton} is triggered on the last step.
     */
    onComplete?: (data: MultiStepFormData[], mergedData: MultiStepFormData) => void;
    children: ReactNode;
}

/**
 * Multi step form root. Manages the active step, persists it across reloads and
 * exposes navigation via context to {@link MultiStepFormStep} and the nav buttons.
 */
export const MultiStepForm: FC<MultiStepFormProps> = ({
    persistKey,
    storage,
    defaultStep = 0,
    onStepChange,
    onComplete,
    className,
    children,
    ...props
}) => {
    const [stepIndex, setStepIndex] = usePersistentState<number>(
        `${persistKey}-step-index`,
        defaultStep,
        storage,
    );
    const [data, setData] = usePersistentState<MultiStepFormData[]>(`${persistKey}-data`, [], storage);

    const updateData = useCallback(
        (newData: MultiStepFormData) => {
            setData((prev) => {
                const next = [...prev];
                next[stepIndex] = newData;
                return next;
            });
        },
        [stepIndex, setData],
    );
    const stepSubmitRef = useRef<(() => void) | null>(null);

    const totalSteps = useMemo(() => {
        let count = 0;
        Children.forEach(children, (child) => {
            if (isValidElement(child) && child.type === MultiStepFormStep) {
                count++;
            }
        });
        return count;
    }, [children]);

    const onStepChangeRef = useRefOf(onStepChange);

    const goTo = useCallback(
        (index: number) => {
            const clamped = Math.min(Math.max(index, 0), Math.max(totalSteps - 1, 0));
            setStepIndex(clamped);
            onStepChangeRef.current?.(clamped, data);
        },
        [setStepIndex, totalSteps, data],
    );

    const onCompleteRef = useRefOf(onComplete);

    useEffect(() => {
        stepSubmitRef.current = null;
    }, [stepIndex]);

    const goNext = useCallback(() => {
        if (stepIndex >= totalSteps - 1) {
            onCompleteRef.current?.(data, Object.assign({}, ...data));
            return;
        }
        goTo(stepIndex + 1);
    }, [goTo, stepIndex, totalSteps, data]);

    const goBack = useCallback(() => {
        goTo(stepIndex - 1);
    }, [goTo, stepIndex]);

    const reset = useCallback(() => {
        goTo(defaultStep);
    }, [defaultStep, goTo]);

    const registerStepSubmit = useCallback((trigger: (() => void) | null) => {
        stepSubmitRef.current = trigger;
    }, []);

    const [stepTitle, setStepTitle] = useState<ReactNode | null>(null);
    const registerStepTitle = useCallback((title: ReactNode | null) => {
        setStepTitle(title);
    }, []);

    const requestAdvance = useCallback(() => {
        const isLast = stepIndex >= totalSteps - 1;

        if (isLast || !stepSubmitRef.current) {
            goNext();
            return;
        }

        if (stepSubmitRef.current) {
            stepSubmitRef.current();
        }
    }, [goNext, stepIndex, totalSteps]);

    const renderedChildren = useMemo(() => {
        let index = -1;
        return Children.map(children, (child) => {
            if (isValidElement(child) && child.type === MultiStepFormStep) {
                index++;
                return index === stepIndex ? child : null;
            }
            return child;
        });
    }, [children, stepIndex]);

    const contextValue = useMemo<MultiStepFormContextValue>(
        () => ({
            stepIndex,
            totalSteps,
            isFirst: stepIndex <= 0,
            isLast: stepIndex >= totalSteps - 1,
            goNext,
            goBack,
            goTo,
            reset,
            registerStepSubmit,
            requestAdvance,
            stepTitle,
            registerStepTitle,
            data,
            updateData,
        }),
        [
            goBack,
            goNext,
            goTo,
            registerStepSubmit,
            requestAdvance,
            reset,
            stepIndex,
            totalSteps,
            stepTitle,
            registerStepTitle,
            data,
            updateData,
        ],
    );

    return (
        <MultiStepFormContext.Provider value={contextValue}>
            <div data-slot="multi-step-form" className={cn("flex flex-col gap-6", className)} {...props}>
                {renderedChildren}
            </div>
        </MultiStepFormContext.Provider>
    );
};

export interface MultiStepFormStepProps extends ComponentProps<"div"> {
    children?: ReactNode;
}

/**
 * Renders its children only while it is the active step.
 */
export const MultiStepFormStep: FC<MultiStepFormStepProps> = ({ className, children, ...props }) => {
    return (
        <div data-slot="multi-step-form-step" className={cn("flex flex-col gap-6", className)} {...props}>
            {children}
        </div>
    );
};

export interface MultiStepFormTitleProps extends ComponentProps<"h2"> {
    /**
     * Prevent rendering the title in the DOM. Still registers it as the step title for {@link MultiStepFormProgress}.
     */
    hidden?: boolean;
}

/**
 * Renders the step's title and registers it as {@link MultiStepFormContextValue.stepTitle},
 * used as the default label by {@link MultiStepFormProgress}.
 */
export const MultiStepFormTitle: FC<MultiStepFormTitleProps> = ({
    className,
    children,
    hidden,
    ...props
}) => {
    const { registerStepTitle } = useMultiStepForm();

    useEffect(() => {
        registerStepTitle(children);
        return () => registerStepTitle(null);
    }, [children, registerStepTitle]);

    return (
        <h2
            data-slot="multi-step-form-title"
            className={cn("text-lg font-semibold", hidden && "hidden", className)}
            {...props}
        >
            {children}
        </h2>
    );
};

export interface MultiStepFormDescriptionProps extends ComponentProps<"p"> {}

/**
 * Renders the step's description.
 */
export const MultiStepFormDescription: FC<MultiStepFormDescriptionProps> = ({
    className,
    children,
    ...props
}) => {
    return (
        <p
            data-slot="multi-step-form-description"
            className={cn("text-sm text-muted-foreground", className)}
            {...props}
        >
            {children}
        </p>
    );
};

export interface MultiStepFormProgressProps extends ComponentProps<typeof Progress> {
    /**
     * Overrides the default "Step X of Y" label. Pass `null` to hide it.
     */
    valueLabel?: ReactNode;
    /**
     * Overrides the default step label. Pass `null` to hide it.
     */
    valueText?: ReactNode;
    description?: ReactNode;
    decoratorProps?: Omit<
        ComponentProps<typeof ProgressDecorator>,
        "children" | "valueLabel" | "value" | "description"
    >;
}

/**
 * Progress bar reflecting the current step out of the total step count, labeled via
 * {@link ProgressDecorator}.
 */
export const MultiStepFormProgress: FC<MultiStepFormProgressProps> = ({
    className,
    valueLabel,
    valueText,
    description,
    decoratorProps,
    ...props
}) => {
    const { stepIndex, totalSteps, stepTitle } = useMultiStepForm();
    const progress = totalSteps > 0 ? ((stepIndex + 1) / totalSteps) * 100 : 0;
    const vl = valueLabel === null ? undefined : (valueLabel ?? `Step ${stepIndex + 1} of ${totalSteps}`);
    const vt =
        valueText === null ? undefined : (valueText ?? (stepTitle || `${stepIndex + 1} / ${totalSteps}`));

    return (
        <ProgressDecorator
            data-slot="multi-step-form-progress"
            valueLabel={vl}
            value={vt}
            description={description}
            {...decoratorProps}
        >
            <Progress value={progress} className={className} {...props} />
        </ProgressDecorator>
    );
};

export interface MultiStepFormFooterProps extends ComponentProps<"div"> {
    children?: ReactNode;
    divider?: boolean;
    sticky?: boolean;
}

export const MultiStepFormFooter: FC<MultiStepFormFooterProps> = ({
    className,
    children,
    divider,
    sticky,
    ...props
}) => {
    return (
        <div
            data-slot="multi-step-form-footer"
            className={cn(
                "flex items-center justify-between gap-3 py-5",
                sticky && "sticky bottom-0 z-1 bg-background",
                divider && "border-t mt-2",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export interface MultiStepFormBackButtonProps extends ComponentProps<typeof Button> {}

export const MultiStepFormBackButton: FC<MultiStepFormBackButtonProps> = ({
    children,
    variant = "outline",
    onClick,
    disabled,
    ...props
}) => {
    const { isFirst, goBack } = useMultiStepForm();

    return (
        <Button
            data-slot="multi-step-form-back-button"
            type="button"
            variant={variant}
            disabled={disabled || isFirst}
            onClick={(e) => {
                onClick?.(e);
                goBack();
            }}
            {...props}
        >
            {children ?? "Back"}
        </Button>
    );
};

export interface MultiStepFormNextButtonProps extends ComponentProps<typeof Button> {
    /**
     * Label used while on the last step.
     * @default "Submit"
     */
    completeLabel?: ReactNode;
    loading?: boolean;
}

export const MultiStepFormNextButton: FC<MultiStepFormNextButtonProps> = ({
    children,
    completeLabel = "Submit",
    onClick,
    loading,
    disabled,
    ...props
}) => {
    const { isLast, requestAdvance } = useMultiStepForm();

    return (
        <Button
            data-slot="multi-step-form-next-button"
            type="button"
            onClick={(e) => {
                onClick?.(e);
                requestAdvance();
            }}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <Spinner data-icon="inline-start" />}
            {children ?? (isLast ? completeLabel : "Next")}
        </Button>
    );
};

export interface MultiStepFormSubProps {
    /**
     * A single `<form>` element. Submitted whenever Next/Finish is pressed.
     */
    children: ReactElement<ComponentProps<"form">, "form">;
}

function collectFormData(form: HTMLFormElement): MultiStepFormData {
    const formData = new FormData(form);
    const data: MultiStepFormData = {};
    formData.forEach((value, key) => {
        if (key in data) {
            const existingValue = data[key];
            if (Array.isArray(existingValue)) {
                existingValue.push(value);
            } else {
                data[key] = [existingValue, value];
            }
        } else {
            data[key] = value;
        }
    });
    return data;
}

/**
 * Plugs a `<form>` into the current step: Next/Finish triggers the form's
 * native submit (gating on HTML5 validation) and advances once its `onSubmit` resolves.
 */
export const MultiStepFormSub: FC<MultiStepFormSubProps> = ({ children }) => {
    const { goNext, registerStepSubmit, updateData } = useMultiStepForm();
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        registerStepSubmit(() => formRef.current?.requestSubmit());
        return () => registerStepSubmit(null);
    }, [registerStepSubmit]);

    const childOnSubmit = children.props.onSubmit;
    const childOnChange = children.props.onChange;

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLFormElement>) => {
            childOnChange?.(e);
            updateData(collectFormData(e.currentTarget));
        },
        [childOnChange, updateData],
    );

    const handleSubmit = useCallback(
        async (e: SubmitEvent<HTMLFormElement>) => {
            e.preventDefault();

            childOnSubmit?.(e);

            const newData = collectFormData(e.currentTarget);
            updateData(newData);

            goNext();
        },
        [childOnSubmit, goNext, updateData],
    );

    return cloneElement(children, { ref: formRef, onChange: handleChange, onSubmit: handleSubmit });
};

export type MultiStepFormDataView = Pick<
    MultiStepFormContextValue,
    "data" | "updateData" | "totalSteps" | "stepIndex"
> & {
    /** Current step data */
    stepData: MultiStepFormData;
    /** Merged data from all steps */
    mergedData: MultiStepFormData;
};

export function useMultiStepFormData(): MultiStepFormDataView {
    const { data, updateData, totalSteps, stepIndex } = useMultiStepForm();
    const stepData = data[stepIndex];
    const mergedData = useMemo(() => {
        return Object.assign({}, ...data);
    }, [data]);
    return { data, updateData, totalSteps, stepIndex, stepData, mergedData };
}

export type MultiStepFormNavigation = Pick<
    MultiStepFormContextValue,
    "stepIndex" | "isFirst" | "isLast" | "goNext" | "goBack" | "goTo" | "reset" | "totalSteps"
>;

export function useMultiStepFormNavigation(): MultiStepFormNavigation {
    const { stepIndex, isFirst, isLast, goNext, goBack, goTo, reset, totalSteps } = useMultiStepForm();
    return { stepIndex, isFirst, isLast, goNext, goBack, goTo, reset, totalSteps };
}
