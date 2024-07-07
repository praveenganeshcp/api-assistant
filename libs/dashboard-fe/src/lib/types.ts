export interface Application {
  id: string;
  name: string;
  totalOperations: number;
  storageSize: number;
  activeUsers: number;
  createdOn: Date;
  status: boolean;
}
