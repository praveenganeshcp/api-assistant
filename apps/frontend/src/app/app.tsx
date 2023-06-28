// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import NxWelcome from './nx-welcome';

import { Route, Routes, Link } from 'react-router-dom';
import { ReactUiKit } from "@praveenkumarcp/reacteasy";

export function App() {
  return (
    <div>
      <h1>hello</h1>
      <ReactUiKit />
    </div>
  );
}

export default App;
