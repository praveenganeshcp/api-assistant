import { Link } from 'react-router-dom';
import styles from './login-form.module.scss';
import { Input, Button } from "antd"

/* eslint-disable-next-line */
export interface LoginFormProps {}

export function LoginForm(props: LoginFormProps) {
  return (
    <div className={styles['login-form']}>
      <h2>Login</h2>
      <Input size='large' placeholder='Email ID' />

      <div className={styles['login-form__password-control']}>
        <Input size='large'  placeholder='Password' />
        <Link to=''>Forgot password?</Link>
      </div>

      <Button type='primary'>Login</Button>

      <span>New to API Assistant? <Link to={'/accounts/signup'}>Create account</Link> here</span> 
    </div>
  );
}

export default LoginForm;
