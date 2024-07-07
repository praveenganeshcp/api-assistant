import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'api-assistant-account-routes-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>
      <a aria-label="home-page" routerLink="/"> API Assistant </a>
    </h1>
  `,
  standalone: true,
  imports: [RouterModule],
})
export class AccountRoutesHeaderComponent {}
