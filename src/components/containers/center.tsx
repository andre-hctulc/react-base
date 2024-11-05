import clsx from "clsx";

interface CenterProps extends React.ComponentProps<"div"> {}

/**
 * A container that centers its children both horizontally and vertically.
 */
export const Center: React.FC<CenterProps> = ({ className, ...props }) => {
    return (
        <div className={clsx("flex items-center justify-center", className)} {...props}>
            {props.children}
        </div>
    );
};
