// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import NxWelcome from './nx-welcome';

import { Route, Routes, Link } from 'react-router-dom';
import { LandingPageFe }  from "@api-assistant/landing-page-fe";

export function App() {
  return (
    <LandingPageFe />
  );
}

export default App;
