import { TableRowData } from "@praveenkumarcp/reacteasy";

export interface Project extends TableRowData {
    name: string;
    storage: number;
    tablesCount: number;
    createOps: number;
    readOps: number;
    updateOps: number;
    deleteOps: number;
    createdOn: Date;
    users: number;
}