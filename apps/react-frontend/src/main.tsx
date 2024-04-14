import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { store } from './store/app.store';
import { ReduxContextProvider } from './store/app.state';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ReduxContextProvider store={store}>
      <RouterProvider router={router} />
    </ReduxContextProvider>
  </StrictMode>
);
