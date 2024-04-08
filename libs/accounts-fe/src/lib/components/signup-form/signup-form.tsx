import { Link } from 'react-router-dom';
import styles from './signup-form.module.scss';
import { Button, Input } from "antd"
 
/* eslint-disable-next-line */
export interface SignupFormProps {}

export function SignupForm(props: SignupFormProps) {
  return (
    <div className={styles['signup-form']}>
      <h2>Create Account</h2>

      <Input size='large' placeholder='Username' />

      <Input size='large' placeholder='Email ID' />

      <Input size='large'  placeholder='Password' />

      <Button type='primary'>Signup</Button>

      <span>Already have an account? <Link to={'/accounts/login'}>Login</Link> here</span> 
  </div>
  );
}

export default SignupForm;
