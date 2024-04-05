import styles from './landing-page-banner.module.scss';

/* eslint-disable-next-line */
export interface LandingPageBannerProps {}

export function LandingPageBanner(props: LandingPageBannerProps) {
  return (
    <div className={styles['landing-page-banner']}>
      <h1 data-testid='banner-app-name'>API Assistant</h1>
      <h4 data-testid='banner-app-caption'>Declarative backend for trivial apps</h4>
    </div>
  );
}

export default LandingPageBanner;
