import { Link } from 'react-router-dom';
import { ApplicationMinimal } from '../types';
import styles from './app-card-view.module.scss';

/* eslint-disable-next-line */
export interface AppCardViewProps {
  application: ApplicationMinimal
}

export function AppCardView(props: AppCardViewProps) {
  const { application } = props;
  return (
    <div className={styles['app-card-view']}>
      <h1>{ application.name }</h1>
      <div className={styles['app-card-view__divider']}></div>
      <div className={styles['app-card-view__item']}>
        Operations: 
        <span>{application.totalActions}</span>
      </div>
      <div className={styles['app-card-view__item']}>
        Created Date: 
        <span>{application.createdOn.toDateString()}</span>
      </div><div className={styles['app-card-view__item']}>
        Active Users: 
        <span>{application.activeUsers}</span>
      </div>
      <Link style={{ alignSelf: 'center' }} to={'/app/dashboard/applications/11'}>View application</Link>
    </div>
  );
}

export default AppCardView;
