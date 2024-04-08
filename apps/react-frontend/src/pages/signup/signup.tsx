import { SignupForm } from '@api-assistant/accounts-fe';
import styles from './signup.module.scss';

/* eslint-disable-next-line */
export interface SignupProps {}

export function Signup(props: SignupProps) {
  return (
    <div className={styles['signup-container']}>
      <SignupForm />
    </div>
  );
}

export default Signup;
