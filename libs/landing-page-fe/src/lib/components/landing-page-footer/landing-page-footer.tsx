import { Link } from 'react-router-dom';
import styles from './landing-page-footer.module.scss';

/* eslint-disable-next-line */
export interface LandingPageFooterProps {
  isUserLoggedIn: boolean;
}

export function LandingPageFooter(props: LandingPageFooterProps) {
  return (
    <footer>
      {props.isUserLoggedIn ? (
        <h4 data-testid="footer-dashboard-link">
          Navigate to <Link to={'/app/dashboard'}>Dashboard</Link> and manage
          your applications at ease{' '}
        </h4>
      ) : (
        <h4 data-testid="footer-signup-link">
          Want to try API Assistant?{' '}
          <Link to={'/app/dashboard'}>Signup here</Link>
        </h4>
      )}
    </footer>
  );
}

export default LandingPageFooter;
