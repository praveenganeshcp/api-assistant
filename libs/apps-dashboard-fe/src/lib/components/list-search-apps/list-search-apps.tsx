import ListApps from '../list-apps/list-apps';
import { ApplicationMinimal } from '../types';
import styles from './list-search-apps.module.scss';

/* eslint-disable-next-line */
export interface ListSearchAppsProps {
  applications: ApplicationMinimal[]
}

const apps: ApplicationMinimal[] = [
  { id: 1, name: "Employee CRUD", createdOn: new Date(), totalActions: 10, activeUsers: 10 },
  { id: 2, name: "City CRUD", createdOn: new Date(), totalActions: 10, activeUsers: 10 },
  { id: 3, name: "Contact CRUD", createdOn: new Date(), totalActions: 10, activeUsers: 10 },
  { id: 4, name: "Contract CRUD", createdOn: new Date(), totalActions: 10, activeUsers: 10 },
  { id: 5, name: "Contract CRUD", createdOn: new Date(), totalActions: 10, activeUsers: 10 },
  { id: 6, name: "Contract CRUD", createdOn: new Date(), totalActions: 10, activeUsers: 10 },
  { id: 7, name: "Contract CRUD", createdOn: new Date(), totalActions: 10, activeUsers: 10 },
]

export function ListSearchApps(props: ListSearchAppsProps) {
  return (
    <section className={styles['list-search-apps']}>
      <h1>All Applications</h1>
      <input placeholder='Search applications' />
      <ListApps applications={apps} />
    </section>
  );
}

export default ListSearchApps;
