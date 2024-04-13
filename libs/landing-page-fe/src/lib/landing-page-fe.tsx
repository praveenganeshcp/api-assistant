import styles from './landing-page-fe.module.scss';

/* eslint-disable-next-line */
export interface LandingPageFeProps {}

export function LandingPageFe(props: LandingPageFeProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to LandingPageFe</h1>
    </div>
  );
}

export default LandingPageFe;
