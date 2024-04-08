import { createBrowserRouter } from 'react-router-dom';
import LandingPage from './pages/landing-page/landing-page';
import AppShell from './pages/app-shell/app-shell';
import AppsDashboard from './pages/apps-dashboard/apps-dashboard';

export const router = createBrowserRouter([
  {
    path: '',
    element: <LandingPage />,
  },
  {
    path: 'app',
    element: <AppShell />,
    children: [
      {
        path: 'dashboard',
        element: <AppsDashboard />
      }
    ]
  }
]);
