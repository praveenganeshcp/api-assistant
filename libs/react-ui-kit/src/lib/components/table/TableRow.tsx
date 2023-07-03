import { TableColumn, TableRowData } from "./table.types";

interface TableRowProps {
    columns: TableColumn[];
    row: TableRowData;
}

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