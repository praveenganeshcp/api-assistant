import { LandingPageHeader } from '@api-assistant/landing-page-fe';
import styles from './landing-page.module.scss';

/* eslint-disable-next-line */
export interface LandingPageProps {}

export function LandingPage(props: LandingPageProps) {
  return (
    <div className={styles['landing-page']}>
      <LandingPageHeader isUserLoggedIn={false} />
    </div>
  );
}

export default LandingPage;
