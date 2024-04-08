import { ListSearchApps } from '@api-assistant/apps-dashboard-fe';
import styles from './apps-dashboard.module.scss';

/* eslint-disable-next-line */
export interface AppsDashboardProps {}

export function AppsDashboard(props: AppsDashboardProps) {
  return (
    <div className={styles['container']}>
      <ListSearchApps />
    </div>
  );
}

export default AppsDashboard;
