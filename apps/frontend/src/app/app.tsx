
import { appStore } from '../store/app.store';
import { AppRoutes } from './App.routes';
import { AppShell } from './AppShell';
import './app.scss';
import { Provider } from "react-redux";

export function App() {
  return (
    <div className='app-router'>
      <Provider store={appStore}>
        <AppShell />
      </Provider>
    </div>
  );
}

export default App;
