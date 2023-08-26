import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/App';

import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: 'f2551028-2ce9-40d5-9314-cf0460e40555',
    clientToken: 'pub9a1ea4c92fd9f2349fe2473f7125cc55',
    site: 'datadoghq.com',
    service:'api-assistant',
    env:'developement',
    version: '1.0.0', 
    sessionSampleRate:100,
    sessionReplaySampleRate: 20,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input'
});
    
datadogRum.startSessionReplayRecording();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
