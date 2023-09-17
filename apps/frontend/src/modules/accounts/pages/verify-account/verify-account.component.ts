import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'api-assistant-verify-account',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .verify-account {
        width: 100%;
        height: 90%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
      }
    `
  ],
  template: `
    <div class="verify-account">
      <span>Verifying account. Please wait...</span>
    </div>
  `
})
export class VerifyAccountComponent {}
