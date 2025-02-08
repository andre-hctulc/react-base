import clsx from "clsx";

interface DataGridCellTextProps {
    children?: any;
    className?: string;
    style?: React.CSSProperties;
}

export const DataGridCellText: React.FC<DataGridCellTextProps> = ({ children, style, className }) => {
    return (
        <span
            className={clsx("inline-block py-2 truncate font-light align-middle max-w-full", className)}
            style={style}
        >
            {children === undefined ? "" : String(children)}
        </span>
    );
};
