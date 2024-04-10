import styles from './login.module.scss';
import { LoginForm } from "@api-assistant/accounts-fe"

/* eslint-disable-next-line */
export interface LoginProps {}

export function Login(props: LoginProps) {

  const handleLogin = (values: any) => {
    console.log(values)
  }

  return (
    <div className={styles['login-container']}>
      <LoginForm handleLogin={handleLogin} />
    </div>
  );
}

export default Login;
