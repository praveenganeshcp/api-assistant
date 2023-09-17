import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'api-assistant-account-routes-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>
      <a routerLink="/">
        API Assistant
      </a>
    </h1>
  `
})
export class AccountRoutesHeaderComponent {}
