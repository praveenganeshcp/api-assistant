export interface FileObject {
  isFile: boolean;
  name: string;
  path: string;
}

export interface ApplicationDetails {
  _id: string;
  name: string;
  count: {
    createAction: number;
    readAction: number;
    updateAction: number;
    deleteAction: number;
    aggregate: number;
  };
  api: {
    key: string;
    lastGeneratedOn: Date;
  };
}

export interface ApplicationCRUDAnalyticChartProps {
  labels: string[];
  data: {
    create: number;
    delete: number;
    update: number;
    read: number;
  };
}
