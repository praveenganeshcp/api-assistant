import { TableColumn, TableRowData } from "./table.types";

/**
 * Props to render a table row based on the provided column configuration.
 */
interface TableRowProps {
    columns: TableColumn[];
    row: TableRowData;
}

/**
 * Render individual table rows by mapping row object values from column config.
 */
export function TableRow(props: TableRowProps) {
    const { columns, row } = props;
    
    const columnMarkup = (
        columns.map((column) => {
            return(
                <td key={column.id} style={{flexBasis: column.size}}>
                    {
                        column?.render 
                        ? column.render(row, column.fieldName) 
                        : row[column.fieldName]
                    }
                </td>
            )
        })
    )
    return (
        <tr>
            {columnMarkup}
        </tr>
    )
}