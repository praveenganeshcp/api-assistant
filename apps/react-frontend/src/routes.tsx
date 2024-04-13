import { createBrowserRouter } from 'react-router-dom';
import { App } from './app/App';
import LandingPage from './pages/landing-page/components/landing-page/landing-page';

export const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: '',
        element: <LandingPage />,
      },
    ]
  }
]);
