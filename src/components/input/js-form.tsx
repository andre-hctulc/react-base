"use client";

interface JSFormProps {
    id?: string;
    children?: React.ReactNode;
    onSubmit?: (data: FormData, objData: any) => void;
    onChange?: (data: FormData, objData: any) => void;
    onInvalid?: (data: FormData, objData: any, reason: { source: "form" | "validate" }) => void;
    validate?: (data: FormData, objData: any) => boolean;
    className?: string;
    action?: any;
    target?: string;
    method?: "get" | "post" | "dialog" | "put" | "delete";
}

export const JSForm: React.FC<JSFormProps> = ({
    children,
    onSubmit: onSubmit,
    className,
    onInvalid,
    target,
    method,
    action,
    validate,
    id,
    ...props
}) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

    const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget;
        const formData = new FormData(form);
        const objData = Object.fromEntries(formData);
        props.onChange?.(formData, objData);
    };

    return (
        <form
            id={id}
            onSubmit={handleSubmit}
            className={className}
            action={action}
            target={target}
            method={method}
            onChange={handleChange}
        >
            {children}
        </form>
    );
};
