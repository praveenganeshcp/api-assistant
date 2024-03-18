import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'api-assistant-alert-banner',
  template: ` <h4 *ngIf="text" [class]="alertClass">{{ text }}</h4> `,
  styles: [
    `
      .alert-banner {
        padding: 1rem;
        font-size: 12px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        border-radius: 5px;

        &.error-alert-banner {
          background-color: red;
          color: white;
        }

        &.warning-alert-banner {
          background-color: orange;
          color: white;
        }

        &.info-alert-banner {
          background-color: lightblue;
          color: black;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AlertBannerComponent {
  @Input() text: string | null = '';

  @Input() type: 'info' | 'warning' | 'error' = 'info';

  private alertTypeCssClassMap: Map<string, string> = new Map([
    ['info', 'info-alert-banner'],
    ['warning', 'warning-alert-banner'],
    ['error', 'error-alert-banner'],
  ]);

  public get alertClass() {
    return `alert-banner ${this.alertTypeCssClassMap.get(this.type)}`;
  }
}
