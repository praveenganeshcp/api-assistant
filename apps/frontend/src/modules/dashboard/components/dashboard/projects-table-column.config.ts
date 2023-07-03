import { TableColumn } from "@praveenkumarcp/reacteasy";

export const projectsTableColumnsConfig: TableColumn[] = [
    { 
        id: 1, 
        fieldName: 'name', 
        label: 'Project name', 
        size: '15%', 
    },
    {
        id: 2,
        fieldName: 'storage',
        label: 'Storage',
        size: '10%'
    },
    { 
        id: 3, 
        fieldName: 'tablesCount', 
        label: 'Table count', 
        size: '10%' 
    },
    { 
        id: 4, 
        fieldName: 'createOps', 
        label: 'Create operations', 
        size: '14%' 
    },
    { 
        id: 5, 
        fieldName: 'readOps', 
        label: 'Read Operations', 
        size: '14%' 
    },
    { 
        id: 6, 
        fieldName: 'updateOps', 
        label: 'Update Operations', 
        size: '14%' 
    },
    { 
        id: 7, 
        fieldName: 'deleteOps', 
        label: 'Delete Operations', 
        size: '14%' 
    },
    { 
        id: 8, 
        fieldName: 'users', 
        label: 'Users', 
        size: '9%',
    },
]