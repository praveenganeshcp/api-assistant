import React, { ReactNode } from 'react';
import styles from './landing-page-feature-card.module.scss';

/* eslint-disable-next-line */
export interface LandingPageFeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function LandingPageFeatureCard(props: LandingPageFeatureCardProps) {
  return (
    <div className={styles['feature-card']}>
      {props.icon}
      <div className={styles['feature-card__details']}>
        <h2 data-testid="feature-title">{props.title}</h2>
        <p data-testid="feature-description">{props.description}</p>
      </div>
    </div>
  );
}

export default LandingPageFeatureCard;
