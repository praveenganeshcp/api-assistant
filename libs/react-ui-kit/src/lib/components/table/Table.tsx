import { TableHTMLAttributes } from "react";
import { TableColumn, TableRowData } from "./table.types";
import "./Table.scss";
import { TableRow } from "./TableRow";

/**
 * Props to customise table columns and row cell value and appearance.
 */
interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
    /**
     * List of column configuration
     */
    columns: TableColumn[];
    /**
     * Array of objects to render as table rows.
     */
    rows: TableRowData[];
}

/**
 * The Table Component offers customizable column names and cell content using 
 * HTML elements for enhanced flexibility and versatility.
 */
export function Table(props: TableProps) {
    const { columns, rows } = props;
    return (
        <table className="react-easy-table">
            <thead>
                <tr>
                {columns.map(column => {
                    return (
                        <td key={column.id} style={{flexBasis: column.size}}>
                            {column.label}
                        </td>
                    )
                })}
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => {
                    return <TableRow key={row.id} row={row} columns={columns} />
                })}
            </tbody>
        </table>
    )
}