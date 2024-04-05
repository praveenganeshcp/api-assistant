import styles from './landing-page-header.module.scss';

/* eslint-disable-next-line */
export interface LandingPageHeaderProps {}

export function LandingPageHeader(props: LandingPageHeaderProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to LandingPageHeader!</h1>
    </div>
  );
}

export default LandingPageHeader;
