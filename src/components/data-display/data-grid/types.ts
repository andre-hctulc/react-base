export type CellRenderer<T extends object = any> = (
    cellValue: any,
    row: T,
    col: DataGridColDef<T>
) => React.ReactNode;

export type CellStringify<T extends object = any> = (
    cellValue: any,
    row: T,
    col: DataGridColDef<T>
) => string;

export type OnCellClick<T extends object = any> = (
    cellValue: any,
    row: T,
    col: DataGridColDef<T>,
    e: React.MouseEvent<HTMLDivElement>
) => void;

export type OnRowClick<T extends object = any> = (row: T, e: React.MouseEvent<HTMLDivElement>) => void;

export interface DataGridColDef<T extends object = any> {
    /**
     * Header label
     */
    label: React.ReactNode;
    /**
     * The data field. Can be a nested path.
     *
     * Examples: `name`, `data.user.name`
     */
    path: string;
    /**
     * @default true
     */
    hidable?: boolean;
    sortable?: boolean;
    /**
     * @default 100
     */
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    /**
     * Custom cell renderer.
     * @default CellText
     */
    render?: CellRenderer<T>;
    /**
     * Determine the text value of the cell. By default null and undefined values are converted to empty string,
     * otherwise String() is used.
     */
    stringify?: CellStringify<T>;
    className?: string;
    /**
     * Creates flex cells with `align-items: flex-start`.
     */
    alignCenter?: boolean;
    /**
     * Creates flex cells with `justify-content: flex-start`.
     */
    justifyCenter?: boolean;
    /**
     * Creates flex cells with `justify-content: flex-start` and `align-items: center`.
     */
    center?: boolean;
    /**
     * Additional data attached to the column.
     */
    data?: any;
    stickyLeft?: boolean;
    stickyRight?: boolean;
    headerCellClassName?: string;
}
