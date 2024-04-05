import styles from './landing-page-feature-card.module.scss';

/* eslint-disable-next-line */
export interface LandingPageFeatureCardProps {}

export function LandingPageFeatureCard(props: LandingPageFeatureCardProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to LandingPageFeatureCard!</h1>
    </div>
  );
}

export default LandingPageFeatureCard;
