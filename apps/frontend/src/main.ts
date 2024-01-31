import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from "./modules/app/app.config";
import { AppComponent } from './modules/app/components/root/app.component';
import { datadogRum } from "@datadog/browser-rum";

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
})

datadogRum.startSessionReplayRecording()

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
