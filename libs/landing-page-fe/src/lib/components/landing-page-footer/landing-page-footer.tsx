import styles from './landing-page-footer.module.scss';

/* eslint-disable-next-line */
export interface LandingPageFooterProps {}

export function LandingPageFooter(props: LandingPageFooterProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to LandingPageFooter!</h1>
    </div>
  );
}

export default LandingPageFooter;
