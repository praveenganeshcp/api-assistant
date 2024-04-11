import { Link } from 'react-router-dom';
import styles from './signup-form.module.scss';
 
/* eslint-disable-next-line */
export interface SignupFormProps {}

export function SignupForm(props: SignupFormProps) {
  return (
    <div className={styles['signup-form']}>
      <h2>Create Account</h2>

      <input placeholder='Username' />

      <input placeholder='Email ID' />

      <input  placeholder='Password' />

      <button>Signup</button>

      <span>Already have an account? <Link to={'/accounts/login'}>Login</Link> here</span> 
  </div>
  );
}

export default SignupForm;
