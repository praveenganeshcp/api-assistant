import styles from './landing-page-header.module.scss';
import { Link } from 'react-router-dom';
import { Button } from '@praveenkumarcp/reacteasy';

/* eslint-disable-next-line */
export interface LandingPageHeaderProps {
  isUserLoggedIn: boolean;
}

export function LandingPageHeader(props: LandingPageHeaderProps) {
  return (
    <header className={styles['landing-page-header']}>
      {props.isUserLoggedIn ? (
        <Link data-testid="header-dashboard-link" to={'/app/dashboard'}>
          Dashboard
        </Link>
      ) : (
        <>
          <button data-testid="header-login-btn">Login</button>
          <button data-testid="header-signup-btn">Create Account</button>
        </>
      )}
    </header>
  );
}

export default LandingPageHeader;
