import clsx from "clsx";

interface DataGridCellTextProps {
    children?: any;
    className?: string;
    style?: React.CSSProperties;
    italic?: boolean;
    secondary?: boolean;
}

export const DataGridCellText: React.FC<DataGridCellTextProps> = ({
    children,
    style,
    className,
    italic,
    secondary,
}) => {
    return (
        <span
            className={clsx(
                "inline-block py-2 truncate font-light align-middle max-w-full",
                italic && "italic",
                secondary && "text-t3 text-sm",
                className
            )}
            style={style}
        >
            {children === undefined ? "" : String(children)}
        </span>
    );
};
