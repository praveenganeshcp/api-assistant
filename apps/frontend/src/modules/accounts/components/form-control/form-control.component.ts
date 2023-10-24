import { Component, Input } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'api-assistant-form-control',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-control">
      <ng-content></ng-content>
      <span *ngIf="showErrorMessage" class="form-control__error-message">
        {{ errorMessage }}
      </span>
    </div>
  `,
  styles: [
    `
      .form-control {
        width: 100%;
        display: flex;
        flex-direction: column;
        flex-items: center;

        input {
          width: 100%;
        }

        .form-control__error-message {
          color: red;
          font-size: 12px;
        }
      }
    `,
  ],
  standalone: true,
})
export class FormControlComponent {
  @Input() control!: AbstractControl | null;

  private errorMessages: Record<string, string> = {
    required: 'This is a required field',
    emailId: 'Enter valid email',
    duplicateEmailId: 'EmailId already registered',
    strongPassword:
      'Password must contain atleast 1 uppercase, 1 lowercase and 1 number',
  };

  public get errorMessage(): string {
    const formControlError = this.control?.errors;
    return formControlError
      ? this.errorMessages[Object.keys(formControlError)[0]]
      : '';
  }

  public get showErrorMessage(): boolean {
    return (this.errorMessage !== '' && this.control?.touched) || false;
  }
}
