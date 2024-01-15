"use client";

import Typography from "@react-client/components/text/typography";
import clsx from "clsx";
import LongText from "@react-client/components/text/long-text";
import JSForm, { FormValidator, useFormController } from "./js-form";
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
    return (
        <div className={clsx("flex flex-col space-y-2 flex-shrink-0", props.className)} style={props.style}>
            <div className="flex flex-col space-y-2 min-w-0">
                {Object.keys(props.factory).map(key => {
                    const value: any = (props.data as any)[key];
                    const field = props.factory[key as keyof typeof props.factory]?.(value,props.data);

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
            </div>
        </div>
    );
}
