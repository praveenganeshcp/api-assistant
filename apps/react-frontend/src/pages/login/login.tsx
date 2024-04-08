import styles from './login.module.scss';
import { LoginForm } from "@api-assistant/accounts-fe"

/* eslint-disable-next-line */
export interface LoginProps {}

export function Login(props: LoginProps) {
  return (
    <div className={styles['login-container']}>
      <LoginForm />
    </div>
  );
}

export default Login;
