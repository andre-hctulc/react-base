"use client";

interface JSFormProps {
    id?: string;
    children?: React.ReactNode;
    onSubmit?: (data: FormData, objData: any) => void;
    onInvalid?: (data: FormData, objData: any, reason: { source: "form" | "validate" }) => void;
    validate?: (data: FormData, objData: any) => boolean;
    className?: string;
    action?: any;
    target?: string;
    method?: "get" | "post" | "dialog" | "put" | "delete";
}

export const JSForm: React.FC<JSFormProps> = ({
    children,
    onSubmit,
    className,
    onInvalid,
    target,
    method,
    action,
    validate,
    id,
    ...props
}) => {
    const trySubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevents form routing
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const objData = Object.fromEntries(formData);

        if (form.checkValidity() === false) {
            form.reportValidity();
            onInvalid?.(formData, objData, { source: "form" });
            return;
        }

        if (validate && !validate(formData, objData)) {
            onInvalid?.(formData, objData, { source: "validate" });
            return;
        }

        onSubmit?.(formData, objData);
    };

    return (
        <form
            id={id}
            onSubmit={trySubmit}
            className={className}
            action={action}
            target={target}
            method={method}
        >
            {children}
        </form>
    );
};
