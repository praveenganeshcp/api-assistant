export interface TableColumn {
    id: number;
    label: string;
    size: string;
    fieldName: string;
    render?: (row: TableRowData, fieldName: string) => string | number | JSX.Element;
}


export interface TableRowData {
    id: number;
    [key: string]: any
}