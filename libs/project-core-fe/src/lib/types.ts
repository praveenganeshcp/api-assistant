export interface FileObject {
    isFile: boolean;
    name: string;
    path: string;
  }
  
  export interface ProjectDetails {
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
      lastGeneratedOn: Date
    }
  }