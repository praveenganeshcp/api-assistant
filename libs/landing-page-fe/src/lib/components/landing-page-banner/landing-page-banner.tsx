import styles from './landing-page-banner.module.scss';

/* eslint-disable-next-line */
export interface LandingPageBannerProps {}

export function LandingPageBanner(props: LandingPageBannerProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to LandingPageBanner!</h1>
    </div>
  );
}

export default LandingPageBanner;
