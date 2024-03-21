"use client";

import clsx from "clsx";
import React from "react";
import type { FormValidator } from "./JSForm";
import Typography from "../text/Typography";
import { StyleProps } from "../../types";
import { styleProps } from "../../util";

export type FormSummaryFactory<T extends object = any> = {
    [K in keyof T]-?:
        | ((
              value: T[K],
              data: Partial<T>
          ) => {
              render?: React.ReactNode;
              type?: React.HTMLInputTypeAttribute;
              input?: React.ReactElement<{
                  onChange?: (...args: any) => void;
                  name?: string;
                  className?: string;
              }>;
              label: string;
              empty?: boolean;
              alignCenter?: boolean;
          } | null)
        | null;
};

interface FormSummaryProps<T extends object = any> extends StyleProps {
    data: T;
    factory: FormSummaryFactory<T>;
    /** @default 100 */
    labelWidth?: number;
    /** @default "start" */
    variant?: "centered" | "start";
    onChange?: boolean;
    validate?: FormValidator<T>;
}

export default function Summary<T extends object = any>(props: FormSummaryProps<T>) {
    return (
        <div {...styleProps({ className: "flex flex-col space-y-2 flex-shrink-0" }, props)}>
            <div className="flex flex-col space-y-2 min-w-0">
                {Object.keys(props.factory).map((key) => {
                    const value: any = (props.data as any)[key];
                    const field = props.factory[key as keyof typeof props.factory]?.(value, props.data);

                    if (!field) return null;

                    const render = field.render || value + "";
                    const classes = clsx(
                        "flex space-x-3 flex-shrink-0 min-h-0 min-w-0, max-w-full",
                        !!field.alignCenter && "items-center"
                    );
                    let body: React.ReactNode;

                    if (typeof render === "string" || typeof render === "number")
                        body = (
                            <Typography
                                long
                                disabled={!!field.empty}
                                tag={field.empty ? "i" : undefined}
                                variant="body1"
                                secondary={!field.empty}
                                className="overflow-y-auto flex-shrink-0"
                                style={{ maxHeight: 100 }}
                            >
                                {render || (field.empty ? "Leer" : "")}
                            </Typography>
                        );
                    else body = render;

                    return (
                        <div className={classes} key={key}>
                            <Typography
                                variant="body2"
                                className="flex-shrink-0"
                                disabled
                                style={{
                                    width: props.labelWidth || 100,
                                    textAlign: props.variant === "centered" ? "end" : undefined,
                                }}
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
