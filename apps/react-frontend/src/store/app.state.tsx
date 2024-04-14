import { store } from './app.store';
import { Provider } from 'react-redux';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const ReduxContextProvider = (props: any) => {
  return <Provider store={props.store}>{props.children}</Provider>;
};
