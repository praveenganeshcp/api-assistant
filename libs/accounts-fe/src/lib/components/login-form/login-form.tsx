import { Link } from 'react-router-dom';
import styles from './login-form.module.scss';
import { useForm } from "react-hook-form";

/* eslint-disable-next-line */
export interface LoginFormProps {
  handleLogin: (credentials: {emailId: string, password: string}) => void
}

export function LoginForm(props: LoginFormProps) {

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      emailId: 'praveen@mail.com',
      password: 'Pragaa@6cp'
    },
    mode: "onTouched"
  });

  const { isValid, errors } = formState;

  return (
    <form onSubmit={handleSubmit(props.handleLogin)} className={styles['login-form']} noValidate>
      <input placeholder='Email ID' {...register('emailId', {
        required: "EmailID is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Invalid email address'
        }
      })} />
      <span>{ errors?.emailId?.message }</span>
      <div className={styles['login-form__password-control']}>
        <input placeholder='Password' {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters long'
          },
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
          }
        })} />
        <Link to=''>Forgot password?</Link>
      </div>
      <span>{ errors?.password?.message }</span>
      <button disabled={!isValid}>Login</button>

      <span>New to API Assistant? <Link to={'/accounts/signup'}>Create account</Link> here</span> 
    </form>
  );
}

export default LoginForm;
