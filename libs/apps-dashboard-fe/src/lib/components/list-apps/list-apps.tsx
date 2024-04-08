import AppCardView from '../app-card-view/app-card-view';
import { ApplicationMinimal } from '../types';
import styles from "./list-apps.module.scss";

/* eslint-disable-next-line */
export interface ListAppsProps {
  applications: ApplicationMinimal[]
}

export function ListApps(props: ListAppsProps) {
  return (
    <div className={styles['apps-list-view']}>
      { props.applications.map(application => <AppCardView application={application} />) }
    </div>
  );
}

export default ListApps;
