import { Link, Outlet } from 'react-router-dom';
import styles from './app-shell.module.scss';
import { MdOutlineAccountCircle, MdOutlineHome, MdOutlineLogout } from 'react-icons/md';

/* eslint-disable-next-line */
export interface AppShellProps {}

export function AppShell(props: AppShellProps) {
  return (
    <main className={styles['app-shell']}>
      <aside className={styles['app-shell__side-nav']}>
        <Link to={'/app/dashboard'}>
          <MdOutlineHome fontSize={'30px'} />
        </Link>
        <div className={styles['app-shell__side-nav-menus']}>
          <Link to={'/app/profile'}>
            <MdOutlineAccountCircle fontSize={'30px'} />
          </Link>
          <MdOutlineLogout fontSize={'30px'} />
        </div>
      </aside>
      <section className={styles['app-shell__outlet']}>
        <Outlet />
      </section>
    </main>
  );
}

export default AppShell;
