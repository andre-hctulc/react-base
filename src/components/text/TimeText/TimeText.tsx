import { DateFormat, VagueDateDE } from "@client-util/time";
import { differenceInMinutes, format, isToday, isYesterday } from "date-fns";
import React from "react";
import ShortText from "../ShortText/ShortText";
import type { TextLikeTag, TextVariant } from "../Typography/Typography";
import { humanizeDuration } from "@client-util/time";

interface TimeTextProps {
    date?: Date | string;
    /** Millisekunden */
    duration?: number | string;
    /** @default "span" */
    tag?: TextLikeTag;
    timeOnly?: boolean;
    noTime?: boolean;
    disableTextFormat?: boolean;
    vague?: boolean;
    after?: boolean;
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    variant?: TextVariant;
    disabled?: boolean;
    secondary?: boolean;
}

/**
 * @root `ShortText`
 */
export default function TimeText(props: TimeTextProps) {
    const text = React.useMemo(() => {
        if (typeof props.date === "string") return props.date;
        if (typeof props.duration === "string") return props.duration;
        if (!props.duration && !props.date) return props.date;

        if (props.date) {
            const now = new Date();
            const timeStr = format(props.date, DateFormat.timeDE);
            const dateStr = format(props.date, props.disableTextFormat ? DateFormat.dateDE : DateFormat.dateDEshort);

            // e.g. 17 Feb
            if (props.vague) return `${props.date.getDate()}${true ? "." : ""} ${VagueDateDE[props.date.getMonth()]}`; // TODO

            if (!props.disableTextFormat && !props.timeOnly) {
                const diffInMinutes = differenceInMinutes(now, props.date);

                if (diffInMinutes < 1 && !props.noTime) return "Gerade eben";
                else if (diffInMinutes < 60 && !props.noTime) return `Vor ${diffInMinutes} Minuten`;
                else if (isToday(props.date)) return `Heute${props.noTime ? "" : " " + timeStr}`;
                else if (isYesterday(props.date)) return `Gestern${props.noTime ? "" : " " + timeStr}`;
            }

            if (props.timeOnly) return timeStr;
            else if (props.noTime) return dateStr;
            else return `${dateStr} ${timeStr}`;
        } else if (props.duration) {
            return humanizeDuration(props.duration);
        }
    }, [props.date, props.disableTextFormat, props.timeOnly, props.noTime, props.vague, props.duration]);

    return (
        <ShortText
            disabled={props.disabled}
            secondary={props.secondary}
            tag={props.tag || "span"}
            className={props.className}
            style={props.style}
            variant={props.variant}
        >
            {!props.after && props.children}
            {text}
            {!!props.after && props.children}
        </ShortText>
    );
}
