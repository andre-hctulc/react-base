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
    type ComponentProps,
    type FC,
    type FormEvent,
    type ReactElement,
    type ReactNode,
} from "react";
import { Button } from "@/components/ui/button.js";
import { Progress } from "@/components/ui/progress.js";
import { cn } from "@/lib/utils.js";
import { usePersistentState } from "@/hooks/use-persistent-state.js";

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
}

const MultiStepFormCtx = createContext<MultiStepFormContextValue | null>(null);

function useMultiStepForm(): MultiStepFormContextValue {
    const ctx = useContext(MultiStepFormCtx);
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
    /**
     * Storage used to persist the current step index.
     * @default localStorage
     */
    storage?: Storage;
    defaultStep?: number;
    onStepChange?: (stepIndex: number) => void;
    /**
     * Called when {@link MultiStepFormNextButton} is triggered on the last step.
     */
    onComplete?: () => void;
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
    const [stepIndex, setStepIndex] = usePersistentState<number>(persistKey, defaultStep, storage);
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

    const goTo = useCallback(
        (index: number) => {
            const clamped = Math.min(Math.max(index, 0), Math.max(totalSteps - 1, 0));
            setStepIndex(clamped);
            onStepChange?.(clamped);
        },
        [onStepChange, setStepIndex, totalSteps],
    );

    const goNext = useCallback(() => {
        if (stepIndex >= totalSteps - 1) {
            onComplete?.();
            return;
        }
        goTo(stepIndex + 1);
    }, [goTo, onComplete, stepIndex, totalSteps]);

    const goBack = useCallback(() => {
        goTo(stepIndex - 1);
    }, [goTo, stepIndex]);

    const reset = useCallback(() => {
        goTo(defaultStep);
    }, [defaultStep, goTo]);

    const registerStepSubmit = useCallback((trigger: (() => void) | null) => {
        stepSubmitRef.current = trigger;
    }, []);

    const requestAdvance = useCallback(() => {
        if (stepSubmitRef.current) {
            stepSubmitRef.current();
        } else {
            goNext();
        }
    }, [goNext]);

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
        }),
        [goBack, goNext, goTo, registerStepSubmit, requestAdvance, reset, stepIndex, totalSteps],
    );

    return (
        <MultiStepFormCtx.Provider value={contextValue}>
            <div data-slot="multi-step-form" className={cn("flex flex-col gap-6", className)} {...props}>
                {renderedChildren}
            </div>
        </MultiStepFormCtx.Provider>
    );
};

export interface MultiStepFormStepProps extends ComponentProps<"div"> {
    children: ReactNode;
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

export interface MultiStepFormTitleProps extends ComponentProps<"h2"> {}

export const MultiStepFormTitle: FC<MultiStepFormTitleProps> = ({ className, children, ...props }) => {
    return (
        <h2 data-slot="multi-step-form-title" className={cn("text-lg font-semibold", className)} {...props}>
            {children}
        </h2>
    );
};

export interface MultiStepFormProgressProps extends ComponentProps<typeof Progress> {}

/**
 * Progress bar reflecting the current step out of the total step count.
 */
export const MultiStepFormProgress: FC<MultiStepFormProgressProps> = ({ className, ...props }) => {
    const { stepIndex, totalSteps } = useMultiStepForm();
    const value = totalSteps > 0 ? ((stepIndex + 1) / totalSteps) * 100 : 0;

    return <Progress data-slot="multi-step-form-progress" value={value} className={className} {...props} />;
};

export interface MultiStepFormFooterProps extends ComponentProps<"div"> {
    children: ReactNode;
}

export const MultiStepFormFooter: FC<MultiStepFormFooterProps> = ({ className, children, ...props }) => {
    return (
        <div
            data-slot="multi-step-form-footer"
            className={cn("flex items-center justify-between gap-3", className)}
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
}

export const MultiStepFormNextButton: FC<MultiStepFormNextButtonProps> = ({
    children,
    completeLabel = "Submit",
    onClick,
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
            {...props}
        >
            {children ?? (isLast ? completeLabel : "Next")}
        </Button>
    );
};

export interface MultiStepFormSubProps {
    /**
     * A single `<form>` element. Submitted whenever Next/Finish is pressed.
     * Return `false` (or a Promise resolving to `false`) from its `onSubmit`
     * to keep the wizard on the current step, e.g. after failed validation.
     */
    children: ReactElement<ComponentProps<"form">, "form">;
}

/**
 * Plugs a `<form>` into the current step: Next/Finish triggers the form's
 * native submit (gating on HTML5 validation) and advances once its `onSubmit` resolves.
 */
export const MultiStepFormSub: FC<MultiStepFormSubProps> = ({ children }) => {
    const { goNext, registerStepSubmit } = useMultiStepForm();
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        registerStepSubmit(() => formRef.current?.requestSubmit());
        return () => registerStepSubmit(null);
    }, [registerStepSubmit]);

    const childOnSubmit = children.props.onSubmit;

    const handleSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const result = await childOnSubmit?.(e);
            if ((result as unknown) !== false) {
                goNext();
            }
        },
        [childOnSubmit, goNext],
    );

    return cloneElement(children, { ref: formRef, onSubmit: handleSubmit });
};
