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
    type SubmitEvent,
    type ReactElement,
    type ReactNode,
    type ChangeEvent,
} from "react";
import { Button } from "@/components/ui/button.js";
import { Progress } from "@/components/ui/progress.js";
import { ProgressDecorator } from "./progress-decorator.js";
import { cn } from "@/lib/utils.js";
import { Spinner } from "@/components/ui/spinner.js";
import { useRefOf } from "@/hooks/use-ref-of.js";
import { DataSummary } from "./data-summary.js";
import { AccordionCard } from "./accordion-card.js";

type WizardFormData = Record<string, unknown>;

export type WizardFormVariant = "wizard" | "stacked";

interface WizardFormContextValue {
    stepIndex: number;
    totalSteps: number;
    registerTotalSteps: (totalSteps: number) => void;
    isFirst: boolean;
    isLast: boolean;
    variant: WizardFormVariant;
    goNext: (dataOverride?: WizardFormData[]) => void;
    goBack: () => void;
    goTo: (index: number, dataOverride?: WizardFormData[]) => void;
    reset: () => void;
    /**
     * Registers a step's form submit trigger (set by {@link WizardFormSub}).
     * Pass `null` to unregister.
     */
    registerStepSubmit: (stepIndex: number, trigger: (() => WizardFormData | null) | null) => void;
    /**
     * Advances to the next step, deferring to a registered step submit trigger if present.
     */
    requestAdvance: () => void;
    /**
     * The active step's title, set by {@link WizardFormTitle} when rendered within it.
     */
    stepTitle: ReactNode | null;
    registerStepTitle: (title: ReactNode | null) => void;
    data: WizardFormData[];
    updateData: (newData: WizardFormData, stepIndexOverride?: number) => void;
}

const WizardFormContext = createContext<WizardFormContextValue | null>(null);
const WizardFormStepContext = createContext<number | null>(null);

function useWizardForm(): WizardFormContextValue {
    const ctx = useContext(WizardFormContext);
    if (!ctx) {
        throw new Error("WizardForm compound components must be used within a WizardForm");
    }
    return ctx;
}

function useWizardFormStepIndex(): number {
    const ctx = useContext(WizardFormStepContext);
    if (ctx === null) {
        throw new Error("WizardFormStep compound components must be used within a WizardFormStep");
    }
    return ctx;
}

export interface WizardFormProps extends ComponentProps<"div"> {
    /** Initial active step. Changes after mount are ignored. */
    initialStep?: number;
    /** Initial data for each step. Changes after mount are ignored. */
    initialData?: WizardFormData[];
    variant?: WizardFormVariant;
    onStepChange?: (stepIndex: number, data: WizardFormData[]) => void;
    /**
     * Called when {@link WizardFormSubmitButton} is triggered on the last step.
     */
    onComplete?: (data: WizardFormData[], mergedData: WizardFormData) => void;
    onDataChange?: (data: WizardFormData[], mergedData: WizardFormData) => void;
    children: ReactNode;
}

/**
 * Wizard form root. Manages the active step and data in local React state.
 */
export const WizardForm: FC<WizardFormProps> = ({
    initialStep = 0,
    initialData = [],
    variant = "wizard",
    onStepChange,
    onComplete,
    onDataChange,
    className,
    children,
    ...props
}) => {
    const initialState = useRef({ stepIndex: initialStep, data: initialData });
    const [stepIndex, setStepIndex] = useState(() => initialState.current.stepIndex);
    const [data, setData] = useState(() => initialState.current.data);
    const onDataChangeRef = useRefOf(onDataChange);

    const updateData = useCallback(
        (newData: WizardFormData, stepIndexOverride?: number) => {
            setData((prev) => {
                const next = [...prev];
                next[stepIndexOverride ?? stepIndex] = newData;
                onDataChangeRef.current?.(next, Object.assign({}, ...next));
                return next;
            });
        },
        [stepIndex, setData],
    );
    const stepSubmitRef = useRef<Map<number, (() => WizardFormData | null) | null>>(new Map());

    const [totalSteps, setTotalSteps] = useState(0);
    const registerTotalSteps = useCallback((nextTotalSteps: number) => {
        setTotalSteps(nextTotalSteps);
    }, []);

    const onStepChangeRef = useRefOf(onStepChange);

    const goTo = useCallback(
        (index: number, dataOverride = data) => {
            const clamped = Math.min(Math.max(index, 0), Math.max(totalSteps - 1, 0));
            setStepIndex(clamped);
            onStepChangeRef.current?.(clamped, dataOverride);
        },
        [setStepIndex, totalSteps, data],
    );

    const onCompleteRef = useRefOf(onComplete);

    useEffect(() => {
        const clamped = Math.min(Math.max(stepIndex, 0), Math.max(totalSteps - 1, 0));
        if (stepIndex !== clamped) {
            setStepIndex(clamped);
        }
    }, [setStepIndex, stepIndex, totalSteps]);

    const goNext = useCallback(
        (dataOverride = data) => {
            if (variant === "stacked") {
                return;
            }

            if (stepIndex >= totalSteps - 1) {
                onCompleteRef.current?.(dataOverride, Object.assign({}, ...dataOverride));
                return;
            }
            goTo(stepIndex + 1, dataOverride);
        },
        [goTo, stepIndex, totalSteps, data, variant],
    );

    const goBack = useCallback(() => {
        if (variant === "stacked") {
            return;
        }
        goTo(stepIndex - 1);
    }, [goTo, stepIndex, variant]);

    const reset = useCallback(() => {
        const { data: initialData, stepIndex: initialStep } = initialState.current;
        setData(initialData);
        onDataChangeRef.current?.(initialData, Object.assign({}, ...initialData));
        goTo(initialStep, initialData);
    }, [goTo]);

    const registerStepSubmit = useCallback(
        (targetStepIndex: number, trigger: (() => WizardFormData | null) | null) => {
            if (trigger) {
                stepSubmitRef.current.set(targetStepIndex, trigger);
            } else {
                stepSubmitRef.current.delete(targetStepIndex);
            }
        },
        [],
    );

    const [stepTitle, setStepTitle] = useState<ReactNode | null>(null);
    const registerStepTitle = useCallback((title: ReactNode | null) => {
        setStepTitle(title);
    }, []);

    const requestAdvance = useCallback(() => {
        const isLast = stepIndex >= totalSteps - 1;

        if (variant === "stacked") {
            const nextData = [...data];
            let isValid = true;

            for (const [targetStepIndex, trigger] of stepSubmitRef.current) {
                const formData = trigger?.();
                if (formData) {
                    nextData[targetStepIndex] = formData;
                } else {
                    isValid = false;
                }
            }

            if (isValid) {
                onCompleteRef.current?.(nextData, Object.assign({}, ...nextData));
            }
            return;
        }

        if (isLast || stepSubmitRef.current.size === 0) {
            goNext();
            return;
        }

        const activeTrigger = stepSubmitRef.current.get(stepIndex) ?? null;
        if (activeTrigger) {
            activeTrigger();
        } else {
            goNext();
        }
    }, [data, goNext, stepIndex, totalSteps, variant]);

    const contextValue = useMemo<WizardFormContextValue>(
        () => ({
            stepIndex,
            totalSteps,
            registerTotalSteps,
            isFirst: stepIndex <= 0,
            isLast: stepIndex >= totalSteps - 1,
            variant,
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
            variant,
        ],
    );

    return (
        <WizardFormContext.Provider value={contextValue}>
            <div data-slot="wizard-form" className={cn("flex flex-col gap-6", className)} {...props}>
                {children}
            </div>
        </WizardFormContext.Provider>
    );
};

export interface WizardFormContentProps extends ComponentProps<"div"> {
    children?: ReactNode;
    variant?: WizardFormVariant;
}

export const WizardFormContent: FC<WizardFormContentProps> = ({ className, children, variant, ...props }) => {
    const { stepIndex, variant: formVariant, registerTotalSteps } = useWizardForm();
    const resolvedVariant = variant ?? formVariant;

    const totalSteps = useMemo(
        () =>
            Children.toArray(children).filter(
                (child): child is ReactElement => isValidElement(child) && child.type === WizardFormStep,
            ).length,
        [children],
    );

    useEffect(() => {
        registerTotalSteps(totalSteps);
        return () => registerTotalSteps(0);
    }, [registerTotalSteps, totalSteps]);

    const renderedChildren = useMemo(() => {
        const mapped = Children.map(children, (child, index) => {
            if (isValidElement(child) && child.type === WizardFormStep) {
                const stepChild = child as ReactElement<WizardFormStepProps>;
                const enhancedChild = cloneElement(stepChild, {
                    stepIndex: index,
                    className: stepChild.props.className,
                });

                if (resolvedVariant === "stacked") {
                    return enhancedChild;
                }

                return index === stepIndex ? enhancedChild : null;
            }
            return child;
        });

        return mapped;
    }, [children, resolvedVariant, stepIndex]);

    return (
        <div data-slot="wizard-form-content" className={cn("flex flex-col gap-6", className)} {...props}>
            {renderedChildren}
        </div>
    );
};

export interface WizardFormStepProps extends ComponentProps<"div"> {
    children?: ReactNode;
    stepIndex?: number;
    collapsible?: boolean;
}

/**
 * Renders a wizard step or an accordion item in the stacked layout.
 */
export const WizardFormStep: FC<WizardFormStepProps> = ({
    className,
    children,
    stepIndex,
    collapsible = false,
    defaultValue,
    ...props
}) => {
    const { variant } = useWizardForm();
    const stacked = variant === "stacked";

    const childArray = Children.toArray(children);
    const titleElement = childArray.find(
        (child): child is ReactElement<WizardFormTitleProps> =>
            isValidElement(child) && child.type === WizardFormTitle,
    );
    const bodyChildren = childArray.filter((child) => child !== titleElement);
    const title = titleElement ? (
        cloneElement(titleElement, {
            className: cn("!mb-0 text-base font-medium", titleElement.props.className),
            hidden: false,
        })
    ) : (
        <span>Step {(stepIndex ?? 0) + 1}</span>
    );

    return (
        <WizardFormStepContext.Provider value={stepIndex ?? 0}>
            {stacked ? (
                <AccordionCard
                    title={title.props.children}
                    collapsible={collapsible}
                    data-slot="wizard-form-step"
                    className={className}
                    {...props}
                >
                    {bodyChildren}
                </AccordionCard>
            ) : (
                <div data-slot="wizard-form-step" className={className} {...props}>
                    {children}
                </div>
            )}
        </WizardFormStepContext.Provider>
    );
};

export interface WizardFormTitleProps extends ComponentProps<"h2"> {
    /**
     * Prevent rendering the title in the DOM,
     * but still use it as step label.
     */
    hidden?: boolean;
}

/**
 * Renders the step's title and registers it as {@link WizardFormContextValue.stepTitle},
 * used as the default label by {@link WizardFormProgress}.
 */
export const WizardFormTitle: FC<WizardFormTitleProps> = ({ className, children, hidden, ...props }) => {
    const { registerStepTitle } = useWizardForm();

    useEffect(() => {
        registerStepTitle(children);
        return () => registerStepTitle(null);
    }, [children, registerStepTitle]);

    return (
        <h2
            data-slot="wizard-form-title"
            className={cn("text-lg font-semibold", hidden && "hidden", className)}
            {...props}
        >
            {children}
        </h2>
    );
};

export interface WizardFormDescriptionProps extends ComponentProps<"p"> {}

/**
 * Renders the step's description.
 */
export const WizardFormDescription: FC<WizardFormDescriptionProps> = ({ className, children, ...props }) => {
    return (
        <p
            data-slot="wizard-form-description"
            className={cn("text-sm text-muted-foreground", className)}
            {...props}
        >
            {children}
        </p>
    );
};

export interface WizardFormProgressProps extends Omit<ComponentProps<typeof Progress>, "value"> {
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
export const WizardFormProgress: FC<WizardFormProgressProps> = ({
    className,
    valueLabel,
    valueText,
    description,
    decoratorProps,
    ...props
}) => {
    const { stepIndex, totalSteps, stepTitle, variant } = useWizardForm();

    if (variant === "stacked") {
        return null;
    }

    const progress = totalSteps > 0 ? ((stepIndex + 1) / totalSteps) * 100 : 0;
    const vl = valueLabel === null ? undefined : (valueLabel ?? `Step ${stepIndex + 1} of ${totalSteps}`);
    const vt =
        valueText === null ? undefined : (valueText ?? (stepTitle || `${stepIndex + 1} / ${totalSteps}`));

    return (
        <ProgressDecorator
            data-slot="wizard-form-progress"
            valueLabel={vl}
            value={vt}
            description={description}
        >
            <Progress {...props} value={progress} className={className} />
        </ProgressDecorator>
    );
};

export interface WizardFormFooterProps extends ComponentProps<"div"> {
    children?: ReactNode;
    divider?: boolean;
    sticky?: boolean;
}

export const WizardFormFooter: FC<WizardFormFooterProps> = ({
    className,
    children,
    divider,
    sticky,
    ...props
}) => {
    return (
        <div
            data-slot="wizard-form-footer"
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

export interface WizardFormBackButtonProps extends ComponentProps<typeof Button> {}

export const WizardFormBackButton: FC<WizardFormBackButtonProps> = ({
    children,
    variant = "outline",
    onClick,
    disabled,
    ...props
}) => {
    const { isFirst, goBack, variant: formVariant } = useWizardForm();

    if (formVariant === "stacked") {
        return null;
    }

    return (
        <Button
            data-slot="wizard-form-back-button"
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

interface WizardFormSubmitButtonProps extends ComponentProps<typeof Button> {
    /**
     * Label used while on the last step.
     * @default "Submit"
     */
    completeLabel?: ReactNode;
    loading?: boolean;
    nextLabel?: ReactNode;
}

export const WizardFormSubmitButton: FC<WizardFormSubmitButtonProps> = ({
    children,
    completeLabel = "Submit",
    onClick,
    loading,
    disabled,
    className,
    nextLabel,
    ...props
}) => {
    const { isLast, requestAdvance, variant } = useWizardForm();

    return (
        <Button
            data-slot="wizard-form-submit-button"
            type="button"
            onClick={(e) => {
                onClick?.(e);
                requestAdvance();
            }}
            className={cn(className, "ml-auto")}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <Spinner data-icon="inline-start" />}
            {children ??
                (variant === "stacked"
                    ? (completeLabel ?? "Submit")
                    : isLast
                      ? (completeLabel ?? "Submit")
                      : (nextLabel ?? "Next"))}
        </Button>
    );
};

export interface WizardFormSubProps {
    /**
     * A single `<form>` element. Submitted whenever Next/Finish is pressed.
     */
    children: ReactElement<ComponentProps<"form">, "form">;
}

function collectFormData(form: HTMLFormElement): WizardFormData {
    const formData = new FormData(form);
    const data: WizardFormData = {};
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
 * native submit (gating on HTML5 validation) before persisting its data and advancing.
 */
export const WizardFormSub: FC<WizardFormSubProps> = ({ children }) => {
    const { data, goNext, registerStepSubmit, updateData, variant } = useWizardForm();
    const stepIndex = useWizardFormStepIndex();
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        registerStepSubmit(stepIndex, () => {
            const form = formRef.current;
            if (!form || !form.reportValidity()) {
                return null;
            }

            const formData = collectFormData(form);
            form.requestSubmit();
            return formData;
        });
        return () => registerStepSubmit(stepIndex, null);
    }, [registerStepSubmit, stepIndex]);

    const childOnSubmit = useRefOf(children.props.onSubmit);
    const childOnChange = useRefOf(children.props.onChange);
    const setFormRef = useCallback(
        (form: HTMLFormElement | null) => {
            formRef.current = form;

            const childRef = children.props.ref;
            if (typeof childRef === "function") {
                childRef(form);
            } else if (childRef) {
                childRef.current = form;
            }
        },
        [children.props.ref],
    );

    useEffect(() => {
        if (formRef.current) {
            updateData(collectFormData(formRef.current), stepIndex);
        }
    }, [stepIndex, updateData]);

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLFormElement>) => {
            childOnChange.current?.(e);
            updateData(collectFormData(e.currentTarget), stepIndex);
        },
        [stepIndex, updateData],
    );

    const handleSubmit = useCallback(
        async (e: SubmitEvent<HTMLFormElement>) => {
            e.preventDefault();

            childOnSubmit.current?.(e);

            const newData = collectFormData(e.currentTarget);
            updateData(newData, stepIndex);

            if (variant === "wizard") {
                const nextData = [...data];
                nextData[stepIndex] = newData;
                goNext(nextData);
            }
        },
        [data, goNext, stepIndex, updateData, variant],
    );

    return cloneElement(children, { ref: setFormRef, onChange: handleChange, onSubmit: handleSubmit });
};

export type WizardFormDataView = Pick<
    WizardFormContextValue,
    "data" | "updateData" | "totalSteps" | "stepIndex"
> & {
    /** Current step data */
    stepData: WizardFormData;
    /** Merged data from all steps */
    mergedData: WizardFormData;
};

export function useWizardFormData(): WizardFormDataView {
    const { data, updateData, totalSteps, stepIndex } = useWizardForm();
    const stepData = data[stepIndex];
    const mergedData = useMemo(() => {
        return Object.assign({}, ...data);
    }, [data]);
    return { data, updateData, totalSteps, stepIndex, stepData, mergedData };
}

export type WizardFormNavigation = Pick<
    WizardFormContextValue,
    "stepIndex" | "isFirst" | "isLast" | "goNext" | "goBack" | "goTo" | "reset" | "totalSteps"
>;

export function useWizardFormNavigation(): WizardFormNavigation {
    const { stepIndex, isFirst, isLast, goNext, goBack, goTo, reset, totalSteps } = useWizardForm();
    return { stepIndex, isFirst, isLast, goNext, goBack, goTo, reset, totalSteps };
}

export type CurrentWizardFormDataVariant = "all" | "inclusive" | "exclusive";

export interface CurrentWizardFormDataProps extends ComponentProps<typeof AccordionCard> {
    defaultOpen?: boolean;
    variant?: CurrentWizardFormDataVariant;
    includeKeys?: string[];
    excludeKeys?: string[];
    labelWidth?: number | string;
}

export const CurrentWizardFormData: FC<CurrentWizardFormDataProps> = ({
    title = "Current data",
    defaultOpen = false,
    variant = "exclusive",
    includeKeys,
    excludeKeys,
    labelWidth,
    className,
    ...props
}) => {
    const { data, stepIndex } = useWizardForm();
    const displayData = useMemo(() => {
        const lastIndex =
            variant === "all" ? data.length : variant === "inclusive" ? stepIndex + 1 : stepIndex;

        return Object.assign({}, ...data.slice(0, Math.max(lastIndex, 0)));
    }, [data, stepIndex, variant]);

    return (
        <AccordionCard className={className} {...props}>
            {Object.keys(displayData).length === 0 ? (
                <p className="text-muted-foreground text-sm text-center">No completed data yet.</p>
            ) : (
                <DataSummary
                    data={displayData}
                    includeKeys={includeKeys}
                    excludeKeys={excludeKeys}
                    labelWidth={labelWidth}
                />
            )}
        </AccordionCard>
    );
};
