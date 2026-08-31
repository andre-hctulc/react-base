"use client";

import RjsfForm, { type FormProps } from "@rjsf/core";
import {
    getSubmitButtonOptions,
    type ArrayFieldItemTemplateProps,
    type ArrayFieldTemplateProps,
    type ErrorListProps,
    type FieldTemplateProps,
    type FormContextType,
    type IconButtonProps,
    type RJSFSchema,
    type StrictRJSFSchema,
    type SubmitButtonProps,
    type TitleFieldProps,
    type UiSchema,
    type WidgetProps,
} from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { Button } from "@/components/ui/button.js";
import { Checkbox } from "@/components/ui/checkbox.js";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field.js";
import { Input } from "@/components/ui/input.js";
import { Textarea } from "@/components/ui/textarea.js";
import { cn } from "@/lib/utils.js";
import { ChevronDown, ChevronUp, Copy, LucideInfo, Plus, Trash2 } from "lucide-react";
import { Children, Fragment, type FocusEvent, type ReactNode, type Ref } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert.js";

export type JsonFormRef<
    T = any,
    S extends StrictRJSFSchema = RJSFSchema,
    F extends FormContextType = any,
> = RjsfForm<T, S, F>;

export type JsonFormChangeHandler<T = any> = FormProps<T>["onChange"];
export type JsonFormChangeEvent<T = any> = Parameters<Exclude<JsonFormChangeHandler<T>, undefined>>[0];
export type JsonFormSubmitHandler<T = any> = FormProps<T>["onSubmit"];
export type JsonFormSubmitEvent<T = any> = Parameters<Exclude<JsonFormSubmitHandler<T>, undefined>>[0];
export type JsonFormErrorHandler<T = any> = FormProps<T>["onError"];
export type JsonFormFocusHandler<T = any> = FormProps<T>["onFocus"];
export type JsonFormBlurHandler<T = any> = FormProps<T>["onBlur"];

export interface JsonFormProps<
    T = any,
    S extends StrictRJSFSchema = RJSFSchema,
    F extends FormContextType = any,
> extends Omit<
    FormProps<T, S, F>,
    "schema" | "validator" | "formData" | "initialFormData" | "readonly" | "uiSchema"
> {
    schema: S;
    defaultValue?: T;
    value?: T;
    readOnly?: boolean;
    submitButton?: boolean;
    uiSchema?: UiSchema<T, S, F>;
    ref?: Ref<JsonFormRef<T, S, F>>;
}

const isEmpty = (node: ReactNode) => {
    if (node === null || node === undefined) return true;
    if (typeof node === "string" && node.trim() === "") return true;
    if (Array.isArray(node)) return node.every(isEmpty);
    return Children.toArray(node).every(isEmpty);
};

function FieldTemplate({
    id,
    classNames,
    style,
    label,
    help,
    required,
    description,
    errors,
    children,
    displayLabel,
    hideError,
    hidden,
    disabled,
    rawErrors,
    rawHelp,
}: FieldTemplateProps) {
    if (hidden) return <div className="hidden">{children}</div>;

    return (
        <Field
            className={classNames}
            data-disabled={disabled || undefined}
            data-invalid={Boolean(rawErrors?.length) || undefined}
            style={style as React.CSSProperties}
        >
            {displayLabel && label && (
                <FieldLabel htmlFor={id}>
                    {label}
                    {required && <span className="text-destructive">*</span>}
                </FieldLabel>
            )}
            {children}
            {description && <FieldDescription>{description}</FieldDescription>}
            {help && !isEmpty(help) && (
                <Alert>
                    <LucideInfo />
                    <AlertDescription>{help}</AlertDescription>
                </Alert>
            )}
            {!hideError && errors && <FieldError>{errors}</FieldError>}
        </Field>
    );
}

function TitleFieldTemplate({ title, id, required, optionalDataControl }: TitleFieldProps) {
    return (
        <div className="mt-4 flex items-center justify-between gap-2">
            <h3 id={id} className="text-base font-semibold">
                {title} {required && <span className="text-destructive">*</span>}
            </h3>
            {optionalDataControl}
        </div>
    );
}

function ErrorListTemplate({ errors }: ErrorListProps) {
    if (!errors.length) return null;

    return (
        <details className="mb-4 rounded-md border border-destructive/40 p-3 text-destructive">
            <summary className="cursor-pointer select-none font-medium">Errors ({errors.length})</summary>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                {errors.map((error, index) => (
                    <li key={`${error.stack}-${index}`}>{error.stack}</li>
                ))}
            </ul>
        </details>
    );
}

function ArrayFieldTemplate({ className, items, canAdd, onAddClick }: ArrayFieldTemplateProps) {
    return (
        <FieldGroup className={cn("", className)}>
            {items}
            {canAdd && (
                <Button className="ml-auto flex" size="sm" type="button" onClick={onAddClick}>
                    <Plus />
                    Add item
                </Button>
            )}
        </FieldGroup>
    );
}

function ArrayFieldItemTemplate({
    children,
    className,
    hasToolbar,
    buttonsProps,
}: ArrayFieldItemTemplateProps) {
    const {
        hasCopy,
        hasMoveDown,
        hasMoveUp,
        hasRemove,
        onCopyItem,
        onMoveDownItem,
        onMoveUpItem,
        onRemoveItem,
    } = buttonsProps;

    return (
        <div className={cn("space-y-2", className)}>
            {hasToolbar && (
                <div className="flex justify-end gap-1">
                    {hasCopy && <CopyButtonTemplate registry={buttonsProps.registry} onClick={onCopyItem} />}
                    {hasMoveDown && (
                        <MoveDownButtonTemplate registry={buttonsProps.registry} onClick={onMoveDownItem} />
                    )}
                    {hasMoveUp && (
                        <MoveUpButtonTemplate registry={buttonsProps.registry} onClick={onMoveUpItem} />
                    )}
                    {hasRemove && (
                        <RemoveButtonTemplate registry={buttonsProps.registry} onClick={onRemoveItem} />
                    )}
                </div>
            )}
            {children}
        </div>
    );
}

interface FormIconButtonProps extends IconButtonProps {
    children: ReactNode;
    destructive?: boolean;
    label: string;
}

function FormIconButton({
    children,
    destructive,
    label,
    className,
    onClick,
    disabled,
    type,
    style,
}: FormIconButtonProps) {
    return (
        <Button
            aria-label={label}
            title={label}
            className={className}
            disabled={disabled}
            onClick={onClick}
            size="icon-sm"
            style={style}
            type={type ?? "button"}
            variant={destructive ? "destructive" : "outline"}
        >
            {children}
        </Button>
    );
}

function AddButtonTemplate(props: IconButtonProps) {
    return (
        <FormIconButton {...props} className={cn("mt-4", props.className)} label="Add item">
            <Plus />
        </FormIconButton>
    );
}

function MoveDownButtonTemplate(props: IconButtonProps) {
    return (
        <FormIconButton {...props} label="Move item down">
            <ChevronDown />
        </FormIconButton>
    );
}

function MoveUpButtonTemplate(props: IconButtonProps) {
    return (
        <FormIconButton {...props} label="Move item up">
            <ChevronUp />
        </FormIconButton>
    );
}

function CopyButtonTemplate(props: IconButtonProps) {
    return (
        <FormIconButton {...props} label="Copy item">
            <Copy />
        </FormIconButton>
    );
}

function RemoveButtonTemplate(props: IconButtonProps) {
    return (
        <FormIconButton {...props} destructive label="Remove item">
            <Trash2 />
        </FormIconButton>
    );
}

function SubmitButtonTemplate({ uiSchema }: SubmitButtonProps) {
    const { norender, submitText, props = {} } = getSubmitButtonOptions(uiSchema);
    if (norender) return null;

    return (
        <Button {...props} className={cn("mt-4", props.className)} type="submit">
            {submitText}
        </Button>
    );
}

function widgetValue(props: WidgetProps, emptyValue: unknown) {
    return props.value ?? props.defaultValue ?? emptyValue;
}

function widgetFocusHandlers(props: WidgetProps) {
    return {
        onBlur: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            props.onBlur(props.id, event.currentTarget.value),
        onFocus: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            props.onFocus(props.id, event.currentTarget.value),
    };
}

function TextWidget(props: WidgetProps) {
    return (
        <Input
            id={props.id}
            name={props.htmlName ?? props.name}
            value={widgetValue(props, "")}
            required={props.required}
            disabled={props.disabled}
            readOnly={Boolean(props.options.readonly ?? props.readonly)}
            autoFocus={props.autofocus}
            autoComplete="off"
            placeholder={props.placeholder}
            aria-invalid={Boolean(props.rawErrors?.length)}
            onChange={(event) => props.onChange(event.currentTarget.value)}
            {...widgetFocusHandlers(props)}
        />
    );
}

function TextareaWidget(props: WidgetProps) {
    return (
        <Textarea
            id={props.id}
            name={props.htmlName ?? props.name}
            value={widgetValue(props, "")}
            required={props.required}
            disabled={props.disabled}
            readOnly={Boolean(props.options.readonly ?? props.readonly)}
            autoFocus={props.autofocus}
            placeholder={props.placeholder}
            aria-invalid={Boolean(props.rawErrors?.length)}
            onChange={(event) => props.onChange(event.currentTarget.value)}
            {...widgetFocusHandlers(props)}
        />
    );
}

function CheckboxWidget(props: WidgetProps) {
    const readonly = Boolean(props.options.readonly ?? props.readonly);

    return (
        <Checkbox
            id={props.id}
            name={props.htmlName ?? props.name}
            checked={Boolean(widgetValue(props, false))}
            required={props.required}
            disabled={props.disabled || readonly}
            aria-invalid={Boolean(props.rawErrors?.length)}
            onCheckedChange={(checked) => props.onChange(checked === true)}
            onBlur={() => props.onBlur(props.id, props.value)}
            onFocus={() => props.onFocus(props.id, props.value)}
        />
    );
}

const templates = {
    ErrorListTemplate,
    ArrayFieldTemplate,
    ArrayFieldItemTemplate,
    TitleFieldTemplate,
    FieldTemplate,
    ButtonTemplates: {
        AddButton: AddButtonTemplate,
        MoveDownButton: MoveDownButtonTemplate,
        CopyButton: CopyButtonTemplate,
        MoveUpButton: MoveUpButtonTemplate,
        RemoveButton: RemoveButtonTemplate,
        SubmitButton: SubmitButtonTemplate,
    },
};

const widgets = { TextWidget, TextareaWidget, CheckboxWidget };

/** A shadcn-styled JSON Schema form powered by RJSF and AJV. */
export function JsonForm<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>({
    schema,
    className,
    value,
    defaultValue,
    submitButton,
    readOnly,
    uiSchema,
    ref,
    children,
    ...formProps
}: JsonFormProps<T, S, F>) {
    const mergedUiSchema = {
        ...uiSchema,
        "ui:submitButtonOptions": {
            ...uiSchema?.["ui:submitButtonOptions"],
            norender: !submitButton,
        },
    } as UiSchema<T, S, F>;

    return (
        <RjsfForm<T, S, F>
            ref={ref}
            schema={schema || ({} as S)}
            validator={validator as FormProps<T, S, F>["validator"]}
            className={cn("", className)}
            formData={value}
            initialFormData={value === undefined ? defaultValue : undefined}
            uiSchema={mergedUiSchema}
            readonly={readOnly}
            templates={templates as FormProps<T, S, F>["templates"]}
            widgets={widgets as FormProps<T, S, F>["widgets"]}
            {...formProps}
        >
            <FieldGroup>{children}</FieldGroup>
        </RjsfForm>
    );
}
