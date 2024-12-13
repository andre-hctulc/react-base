"use client";

import React from "react";
import type { PropsOf } from "../../types";
import { Textarea } from "./textarea";
import { withPrefix } from "../../util/system";

interface JSONInputProps extends PropsOf<typeof Textarea> {
    jsonObject?: any;
}

export const JSONInput: React.FC<JSONInputProps> = React.forwardRef<HTMLTextAreaElement, JSONInputProps>(
    ({ className, jsonObject, defaultValue, ...inputProps }, ref) => {
        const defaultJSON = React.useMemo(() => {
            if (defaultValue !== undefined) return defaultValue;
            if (jsonObject !== undefined) return JSON.stringify(jsonObject, null, 2);
            return undefined;
        }, [jsonObject, defaultValue]);

        return <Textarea ref={ref} className={className} defaultValue={defaultJSON} {...inputProps} />;
    }
);

JSONInput.displayName = withPrefix("JSONInput");
