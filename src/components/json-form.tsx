"use client";

import RjsfForm, { getDefaultRegistry, RichDescription, RichHelp, type FormProps } from "@rjsf/core";
import {
    ADDITIONAL_PROPERTY_FLAG,
    ariaDescribedByIds,
    getTemplate,
    getSchemaType,
    getSubmitButtonOptions,
    getUiOptions,
    helpId,
    schemaRequiresTrueValue,
    titleId,
    TranslatableString,
    type ArrayFieldItemTemplateProps,
    type ArrayFieldTemplateProps,
    type DescriptionFieldProps,
    type ErrorListProps,
    type FieldTemplateProps,
    type FieldHelpProps,
    type FormContextType,
    type IconButtonProps,
    type ObjectFieldTemplateProps,
    type RJSFSchema,
    type StrictRJSFSchema,
    type SubmitButtonProps,
    type TitleFieldProps,
    type UiSchema,
    type WidgetProps,
    type WrapIfAdditionalTemplateProps,
} from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { Button } from "@/components/ui/button.js";
import { Checkbox } from "@/components/ui/checkbox.js";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field.js";
import { Input } from "@/components/ui/input.js";
import { Textarea } from "@/components/ui/textarea.js";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip.js";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.js";
import { cn } from "@/lib/utils.js";
import { ChevronDown, ChevronUp, Copy, LucideInfo, MoreHorizontalIcon, Plus, Trash2 } from "lucide-react";
import { createContext, useContext, type FocusEvent, type ReactNode, type Ref } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert.js";

const JsonFormFieldPlaceholderContext = createContext<string | undefined>(undefined);
const ArrayItemTitleContext = createContext<string | undefined>(undefined);

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

function DescriptionFieldTemplate({ id, description, registry, uiSchema }: DescriptionFieldProps) {
    if (!description) return null;

    return (
        <div id={id} className="field-description text-sm text-muted-foreground">
            <RichDescription description={description} registry={registry} uiSchema={uiSchema} />
        </div>
    );
}

function FieldHelpTemplate({ help, fieldPathId, registry, uiSchema }: FieldHelpProps) {
    if (!help || (typeof help === "string" && !help.trim())) return null;

    return (
        <Alert id={helpId(fieldPathId)} className="text-muted-foreground">
            <LucideInfo />
            <AlertDescription>
                <RichHelp help={help} registry={registry} uiSchema={uiSchema} />
            </AlertDescription>
        </Alert>
    );
}

function FieldTemplate(props: FieldTemplateProps) {
    const {
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
        fieldPathId,
        schema,
        hideError,
        hidden,
        disabled,
        rawErrors,
        registry,
        uiSchema,
    } = props;
    const WrapIfAdditionalTemplate = getTemplate(
        "WrapIfAdditionalTemplate",
        registry,
        getUiOptions(uiSchema),
    );
    if (hidden) return <div className="hidden">{children}</div>;
    const isArrayItem = typeof fieldPathId.path.at(-1) === "number";
    const isAdditionalProperty = ADDITIONAL_PROPERTY_FLAG in schema;
    const fieldPlaceholder = isAdditionalProperty ? "Value" : isArrayItem ? "Enter item" : undefined;

    return (
        <WrapIfAdditionalTemplate {...props}>
            <Field
                className={classNames}
                data-disabled={disabled || undefined}
                data-invalid={Boolean(rawErrors?.length) || undefined}
                style={style as React.CSSProperties}
            >
                {displayLabel && label && (
                    <FieldLabel
                        className={isArrayItem || isAdditionalProperty ? "sr-only" : undefined}
                        htmlFor={id}
                    >
                        {label}
                        {required && <span className="text-destructive">*</span>}
                    </FieldLabel>
                )}
                <JsonFormFieldPlaceholderContext.Provider value={fieldPlaceholder}>
                    {children}
                </JsonFormFieldPlaceholderContext.Provider>
                {displayLabel && description}
                {help}
                {!hideError && Boolean(rawErrors?.length) && <FieldError>{errors}</FieldError>}
            </Field>
        </WrapIfAdditionalTemplate>
    );
}

function WrapIfAdditionalTemplate({
    id,
    label,
    schema,
    children,
    disabled,
    readonly,
    onKeyRenameBlur,
    onRemoveProperty,
    registry,
    uiSchema,
}: WrapIfAdditionalTemplateProps) {
    if (!(ADDITIONAL_PROPERTY_FLAG in schema)) return children;

    const keyLabel = registry.translateString(TranslatableString.KeyLabel, [label]);
    const { RemoveButton } = registry.templates.ButtonTemplates;

    return (
        <div className="flex items-start gap-2">
            <Field className="min-w-0 flex-1" data-disabled={disabled || undefined}>
                <FieldLabel className="sr-only" htmlFor={`${id}-key`}>
                    {keyLabel}
                </FieldLabel>
                <Input
                    key={label}
                    id={`${id}-key`}
                    defaultValue={label}
                    placeholder="Property name"
                    disabled={disabled}
                    readOnly={readonly}
                    onBlur={onKeyRenameBlur}
                />
            </Field>
            <div className="min-w-0 flex-1">{children}</div>
            <RemoveButton
                className="mt-1"
                disabled={disabled || readonly}
                onClick={onRemoveProperty}
                registry={registry}
                uiSchema={uiSchema}
            />
        </div>
    );
}

function TitleFieldTemplate({ title, id, required, optionalDataControl }: TitleFieldProps) {
    const arrayItemTitleId = useContext(ArrayItemTitleContext);
    if (id === arrayItemTitleId) return null;

    return (
        <div className="flex items-center justify-between gap-2">
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

const DefaultObjectFieldTemplate = getDefaultRegistry().templates.ObjectFieldTemplate;
const DefaultArrayFieldTemplate = getDefaultRegistry().templates.ArrayFieldTemplate;

function ObjectFieldTemplate(props: ObjectFieldTemplateProps) {
    const isNested = props.fieldPathId.path.length > 0;

    return (
        <DefaultObjectFieldTemplate
            {...props}
            className={cn("flex flex-col gap-5", isNested && "border-l border-border pl-3", props.className)}
        />
    );
}

function ArrayFieldTemplate(props: ArrayFieldTemplateProps) {
    return (
        <DefaultArrayFieldTemplate
            {...props}
            className={cn(
                "flex flex-col gap-2 [&>.array-item-list]:flex [&>.array-item-list]:flex-col [&>.array-item-list]:gap-2",
                props.className,
            )}
        />
    );
}

function ArrayFieldItemTemplate({
    children,
    className,
    hasToolbar,
    buttonsProps,
    schema,
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
        disabled,
        readonly,
    } = buttonsProps;
    const isActionDisabled = disabled || readonly;
    const itemTitleId = titleId(buttonsProps.fieldPathId);

    return (
        <div
            className={cn(
                "flex gap-1",
                getSchemaType(schema) === "object" &&
                    "mt-2 border-t border-border pt-4 first:mt-0 first:border-t-0 first:pt-0",
                className,
            )}
        >
            <ArrayItemTitleContext.Provider value={itemTitleId}>
                <div className="min-w-0 grow">{children}</div>
            </ArrayItemTitleContext.Provider>
            {hasToolbar && (
                <DropdownMenu>
                    <Tooltip>
                        <TooltipTrigger
                            aria-label="Item actions"
                            disabled={isActionDisabled}
                            render={
                                <DropdownMenuTrigger
                                    disabled={isActionDisabled}
                                    render={<Button variant="ghost" size="icon-sm" />}
                                />
                            }
                            className="mt-0.5"
                        >
                            <MoreHorizontalIcon />
                        </TooltipTrigger>
                        <TooltipContent role="tooltip">Item actions</TooltipContent>
                    </Tooltip>
                    <DropdownMenuContent align="end" className="w-40">
                        {hasCopy && (
                            <DropdownMenuItem disabled={isActionDisabled} onClick={onCopyItem}>
                                <Copy />
                                Copy item
                            </DropdownMenuItem>
                        )}
                        {hasMoveUp && (
                            <DropdownMenuItem disabled={isActionDisabled} onClick={onMoveUpItem}>
                                <ChevronUp />
                                Move item up
                            </DropdownMenuItem>
                        )}
                        {hasMoveDown && (
                            <DropdownMenuItem disabled={isActionDisabled} onClick={onMoveDownItem}>
                                <ChevronDown />
                                Move item down
                            </DropdownMenuItem>
                        )}
                        {hasRemove && (
                            <DropdownMenuItem
                                disabled={isActionDisabled}
                                onClick={onRemoveItem}
                                variant="destructive"
                            >
                                <Trash2 />
                                Remove item
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
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
    id,
}: FormIconButtonProps) {
    return (
        <Tooltip>
            <TooltipTrigger
                id={id}
                aria-label={label}
                className={className}
                disabled={disabled}
                onClick={onClick}
                style={style}
                type={type ?? "button"}
                render={
                    <Button
                        disabled={disabled}
                        size="icon-sm"
                        variant={destructive ? "destructive" : "outline"}
                    />
                }
            >
                {children}
            </TooltipTrigger>
            <TooltipContent role="tooltip">{label}</TooltipContent>
        </Tooltip>
    );
}

function AddButtonTemplate(props: IconButtonProps) {
    return (
        <FormIconButton {...props} className={cn("self-end", props.className)} label="Add item">
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
    const fieldPlaceholder = useContext(JsonFormFieldPlaceholderContext);

    return (
        <Input
            id={props.id}
            name={props.htmlName ?? props.name}
            type={props.schema.format === "email" ? "email" : "text"}
            value={widgetValue(props, "")}
            required={props.required}
            disabled={props.disabled}
            readOnly={Boolean(props.options.readonly ?? props.readonly)}
            autoFocus={props.autofocus}
            autoComplete="off"
            placeholder={props.placeholder || fieldPlaceholder}
            aria-describedby={ariaDescribedByIds(props.id)}
            aria-invalid={Boolean(props.rawErrors?.length)}
            onChange={(event) => props.onChange(event.currentTarget.value)}
            {...widgetFocusHandlers(props)}
        />
    );
}

function TextareaWidget(props: WidgetProps) {
    const fieldPlaceholder = useContext(JsonFormFieldPlaceholderContext);

    return (
        <Textarea
            id={props.id}
            name={props.htmlName ?? props.name}
            value={widgetValue(props, "")}
            required={props.required}
            disabled={props.disabled}
            readOnly={Boolean(props.options.readonly ?? props.readonly)}
            autoFocus={props.autofocus}
            placeholder={props.placeholder || fieldPlaceholder}
            aria-describedby={ariaDescribedByIds(props.id)}
            aria-invalid={Boolean(props.rawErrors?.length)}
            onChange={(event) => props.onChange(event.currentTarget.value)}
            {...widgetFocusHandlers(props)}
        />
    );
}

function CheckboxWidget(props: WidgetProps) {
    const readonly = Boolean(props.options.readonly ?? props.readonly);
    const DescriptionFieldTemplate = getTemplate("DescriptionFieldTemplate", props.registry, props.options);
    const description = props.options.description ?? props.schema.description;

    return (
        <div className="space-y-2">
            {!props.hideLabel && description && (
                <DescriptionFieldTemplate
                    id={`${props.id}__description`}
                    description={description}
                    schema={props.schema}
                    uiSchema={props.uiSchema}
                    registry={props.registry}
                />
            )}
            <div className="flex items-center gap-2">
                <Checkbox
                    id={props.id}
                    name={props.htmlName ?? props.name}
                    checked={Boolean(widgetValue(props, false))}
                    required={props.required && schemaRequiresTrueValue(props.schema)}
                    disabled={props.disabled || readonly}
                    autoFocus={props.autofocus}
                    aria-describedby={ariaDescribedByIds(props.id)}
                    aria-invalid={Boolean(props.rawErrors?.length)}
                    onCheckedChange={(checked) => props.onChange(checked === true)}
                    onBlur={() => props.onBlur(props.id, props.value)}
                    onFocus={() => props.onFocus(props.id, props.value)}
                />
                {!props.hideLabel && <FieldLabel htmlFor={props.id}>{props.label}</FieldLabel>}
            </div>
        </div>
    );
}

const templates = {
    DescriptionFieldTemplate,
    ObjectFieldTemplate,
    ErrorListTemplate,
    ArrayFieldTemplate,
    ArrayFieldItemTemplate,
    TitleFieldTemplate,
    FieldTemplate,
    FieldHelpTemplate,
    WrapIfAdditionalTemplate,
    ButtonTemplates: {
        AddButton: AddButtonTemplate,
        MoveDownButton: MoveDownButtonTemplate,
        CopyButton: CopyButtonTemplate,
        MoveUpButton: MoveUpButtonTemplate,
        RemoveButton: RemoveButtonTemplate,
        SubmitButton: SubmitButtonTemplate,
    },
};

const widgets = { TextWidget, TextareaWidget, CheckboxWidget, EmailWidget: TextWidget };

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
            <TooltipProvider>
                {children === undefined ? undefined : <FieldGroup>{children}</FieldGroup>}
            </TooltipProvider>
        </RjsfForm>
    );
}
