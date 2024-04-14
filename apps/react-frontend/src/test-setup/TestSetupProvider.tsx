import { BrowserRouter } from 'react-router-dom';
import { ReduxContextProvider } from '../store/app.state';
import { store } from '../store/app.store';

export function TestSetupProvider(props: any) {
  return (
    <ReduxContextProvider store={store}>
      <BrowserRouter>{props.children}</BrowserRouter>
    </ReduxContextProvider>
  );
}
