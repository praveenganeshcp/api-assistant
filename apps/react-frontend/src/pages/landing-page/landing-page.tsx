import styles from './landing-page.module.scss';

/* eslint-disable-next-line */
export interface LandingPageProps {}

export function LandingPage(props: LandingPageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to LandingPage!</h1>
    </div>
  );
}

export default LandingPage;
