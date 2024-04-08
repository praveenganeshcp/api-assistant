import { createBrowserRouter } from 'react-router-dom';
import LandingPage from './pages/landing-page/landing-page';
import AccountsShell from './pages/accounts-shell/accounts-shell';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';

export const router = createBrowserRouter([
  {
    path: '',
    element: <LandingPage />,
  },
  {
    path: 'accounts',
    element: <AccountsShell />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <Signup />
      }
    ]
  }
]);
