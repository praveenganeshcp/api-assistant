import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { store } from './store/reducer';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
