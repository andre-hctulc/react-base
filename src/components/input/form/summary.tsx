"use client";

import Typography from "@react-client/components/text/typography";
import clsx from "clsx";
import LongText from "@react-client/components/text/long-text";
import JSForm, { FormValidator, useFormData } from "./js-form";
import Input from "../base/input";
import React from "react";

export type SummaryFactory<T extends object = any> = {
    [K in keyof T]-?:
        | ((
              value: T[K],
              data: Partial<T>
          ) => {
              render?: React.ReactNode;
              type?: React.HTMLInputTypeAttribute;
              input?: React.ReactElement<{ onChange?: (...args: any) => void; name?: string; className?: string }>;
              label: string;
              empty?: boolean;
              alignCenter?: boolean;
          } | null)
        | null;
};

interface SummaryProps<T extends object = any> {
    data: T;
    className?: string;
    style?: React.CSSProperties;
    factory: SummaryFactory<T>;
    /** @default 100 */
    labelWidth?: number;
    /** @default "start" */
    variant?: "centered" | "start";
    onChange?: boolean;
    validate?: FormValidator<T>;
}

export default function Summary<T extends object = any>(props: SummaryProps<T>) {
    const classes = clsx("flex flex-col space-y-2 flex-shrink-0", props.className);
    const { formProps, data, okData } = useFormData(props.data);
    // const formClasses = clsx("space-y-2");

    return (
        <div className={classes}>
            <JSForm validate={props.validate} tag="div" className={"space-y-2 min-w-0"} {...formProps}>
                {Object.keys(props.factory).map(key => {
                    const value: any = (data as any)[key];
                    const field = props.factory[key as keyof typeof props.factory]?.(value, data);

                    if (!field) return null;

                    const render = field.render || value + "";
                    const classes = clsx("flex space-x-3 flex-shrink-0 min-h-0 min-w-0, max-w-full", !!field.alignCenter && "items-center");
                    let body: React.ReactNode;

                    if (typeof render === "string" || typeof render === "number")
                        body = (
                            <LongText
                                disabled={!!field.empty}
                                tag={field.empty ? "i" : undefined}
                                variant="body1"
                                secondary={!field.empty}
                                className="overflow-y-auto flex-shrink-0"
                                style={{ maxHeight: 100 }}
                            >
                                {render || (field.empty ? "Leer" : "")}
                            </LongText>
                        );
                    else body = render;

                    return (
                        <div className={classes} key={key}>
                            <Typography
                                variant="body2"
                                className="flex-shrink-0"
                                disabled
                                style={{ width: props.labelWidth || 100, textAlign: props.variant === "centered" ? "end" : undefined }}
                            >
                                {field.label}
                            </Typography>
                            {body}
                        </div>
                    );
                })}
            </JSForm>
        </div>
    );
}
