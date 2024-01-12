// * SSR

import VHCenter from "@react-client/components/layout/containers/vh-center";
import Typography from "@react-client/components/text/typography";
import clsx from "clsx";

interface SectionCardProps {
    children?: React.ReactNode;
    title: string;
    description?: string;
    loading?: boolean;
    style?: React.CSSProperties;
    className?: string;
    alignItems?: "start" | "end";
    spacing?: boolean;
    dangerous?: boolean;
}

export default function SectionCard(props: SectionCardProps) {
    const classes = clsx("flex sm:flex-col md:flex-row border rounded-lg p-2 bg-bg SectionCard", props.dangerous && "border-error/40 bg-error/5", props.className);
    const mainClasses = clsx(
        "flex-grow px-1 py-3 min-w-0 flex flex-col justify-center",
        props.alignItems === "end" && "items-end",
        props.alignItems === "start" && "items-start",
        props.spacing && "space-y-4"
    );

    return (
        <section className={classes} style={props.style}>
            <div className={"w-[350px] p-1 flex flex-col flex-shrink-0"}>
                <Typography className="font-medium" variant="body2">
                    {props.title}
                </Typography>
                {props.description && (
                    <Typography variant="caption" secondary className="mt-1">
                        {props.description}
                    </Typography>
                )}
            </div>
            <div className={mainClasses}>{props.loading ? <VHCenter>{/* TODO <CircularProgress /> */}</VHCenter> : props.children}</div>
        </section>
    );
}
