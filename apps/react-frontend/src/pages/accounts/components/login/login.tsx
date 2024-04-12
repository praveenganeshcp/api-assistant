import { useDispatch } from 'react-redux';
import styles from './login.module.scss';
import { LoginForm, LoginFormValue } from "@api-assistant/accounts-fe"
import { AppDispatch } from 'apps/react-frontend/src/store/app.state';
import { loginAccount } from '../../store/effects';

/* eslint-disable-next-line */
export interface LoginProps {}

export function Login() {

  const dispatch = useDispatch<AppDispatch>()

  const handleLogin = (credentials: LoginFormValue) => {
    dispatch(loginAccount({emailId: credentials.emailId, password: credentials.password}))
  }

  return (
    <div className={styles['login-container']}>
      <LoginForm handleLogin={handleLogin} />
    </div>
  );
}

export default Login;
