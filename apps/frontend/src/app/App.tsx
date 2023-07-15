
import { appStore } from '../store/app.store';
import { AppRoutes } from './App.routes';
import { Provider } from "react-redux";
import "./App.scss";

export function App() {
  return (
    <div className='app-router'>
      <Provider store={appStore}>
        <AppRoutes />
      </Provider>
    </div>
  );
}

export default App;
