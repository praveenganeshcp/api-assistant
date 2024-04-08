import { Link, Outlet } from 'react-router-dom';
import styles from './accounts-shell.module.scss';

/* eslint-disable-next-line */
export interface AccountsShellProps {}

export function AccountsShell(props: AccountsShellProps) {
  return (
    <div className={styles['accounts-shell']}>
      <div className={styles['accounts-shell__banner']}>
        <Link to={'/'}>API Assistant</Link>
        <h4>Declarative backend for trivial apps</h4>
      </div>

      <div className={styles['accounts-shell__outlet']}>
        <Outlet />
      </div>
    </div>
  );
}

export default AccountsShell;
