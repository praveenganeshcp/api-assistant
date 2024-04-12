import { createBrowserRouter } from 'react-router-dom';
import LandingPage from './pages/landing-page/components/landing-page/landing-page';
import AccountsShell from './pages/accounts/components/accounts-shell/accounts-shell';
import Login from './pages/accounts/components/login/login';
import Signup from './pages/accounts/components/signup/signup';
import { App } from './app/App';

export const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
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
    ]
  }
]);
