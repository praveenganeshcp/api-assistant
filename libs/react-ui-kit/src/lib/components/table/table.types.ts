/**
 * Configuration to render a column value and appearance.
 */
export interface TableColumn {
    /**
     * Unique value to identify a table column
     */
    id: number;
    /**
     * Column display value.
     */
    label: string;
    /**
     * Width to allocate for the column
     */
    size: string;
    /**
     * Object key which holds the value for the row cell.
     */
    fieldName: string;
    /**
     * Custom render function, which gets row object and field name as arguments.
     * The function need to return the valid JSX element which will be rendered
     * as row cell.
     */
    render?: (row: TableRowData, fieldName: string) => string | number | JSX.Element;
}

/**
 * Object to render as table row. Keys will be used as fieldname to render in specific columns.
 */
export interface TableRowData {
    /**
     * Unique value to identify a table row.
     */
    id: number;
    /**
     * key value pair, whose key will be used as fieldName 
     * in column config to render the cell value.
     */
    [key: string]: string | number;
}