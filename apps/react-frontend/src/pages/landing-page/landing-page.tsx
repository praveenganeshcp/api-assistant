import { LandingPageBanner, LandingPageHeader } from '@api-assistant/landing-page-fe';
import styles from './landing-page.module.scss';

/* eslint-disable-next-line */
export interface LandingPageProps {}

export function LandingPage(props: LandingPageProps) {
  return (
    <div className={styles['landing-page']}>
      <LandingPageHeader isUserLoggedIn={false} />
      <LandingPageBanner />
      <h1 style={{ textAlign: 'center', padding: '2rem' }}>Features</h1>
    </div>
  );
}

export default LandingPage;
