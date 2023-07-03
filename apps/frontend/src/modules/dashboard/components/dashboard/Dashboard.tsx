import { Table } from "@praveenkumarcp/reacteasy";
import { Project } from "../../types/project-card.types";
import "./Dashboard.scss";
import { projectsTableColumnsConfig } from "./projects-table-column.config";

export function DashBoard() {

    const projects: Project[] = [
        {
            id: 1,
            name: "API Assistant",
            createOps: 100,
            readOps: 2323,
            updateOps: 323,
            deleteOps: 3232,
            storage: 100,
            tablesCount: 33,
            createdOn: new Date(),
            users: 102,
        },
        {
            id: 3,
            name: "Supabase",
            createOps: 100,
            readOps: 2323,
            updateOps: 323,
            deleteOps: 3232,
            storage: 100,
            tablesCount: 33,
            createdOn: new Date(),
            users: 102,
        },
        {
            id: 2,
            name: "Firebase",
            createOps: 100,
            readOps: 2323,
            updateOps: 323,
            deleteOps: 3232,
            storage: 100,
            tablesCount: 33,
            createdOn: new Date(),
            users: 102,
        }
    ]

    return (
        <section className="dashboard h-100 w-100">
            <div className="search-projects w-100 d-flex align-items-center">
                <input placeholder="Search Projects" />
            </div>
            <div className="projects-table p-4">
                <Table rows={projects} columns={projectsTableColumnsConfig}/>
            </div>
        </section>
    )
}