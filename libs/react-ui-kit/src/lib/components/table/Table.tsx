import { TableHTMLAttributes } from "react";
import { TableColumn, TableRowData } from "./table.types";
import "./Table.scss";
import { TableRow } from "./TableRow";

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
    columns: TableColumn[];
    rows: TableRowData[];
}

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