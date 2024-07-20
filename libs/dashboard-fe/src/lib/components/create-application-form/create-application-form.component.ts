import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import {
  SwButtonComponent,
  SwInputComponent,
  SwFormControlComponent,
} from 'ngx-simple-widgets';

@Component({
  selector: 'api-assistant-create-application-form',
  templateUrl: './create-application-form.component.html',
  styleUrls: ['./create-application-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SwButtonComponent,
    SwInputComponent,
    ReactiveFormsModule,
    SwFormControlComponent,
  ],
})
export class CreateApplicationFormComponent {
  @Input() loading: boolean = false;

  @Output() createApplication = new EventEmitter<string>();

  public createApplicationForm = this.formBuilder.group({
    name: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
  });

  public errorMessagesMap: Record<string, string> = {
    minlength: 'Minimum 3 characters is required',
  };

  constructor(private formBuilder: FormBuilder) {}

  public get applicationNameFormControl(): FormControl {
    return this.createApplicationForm.controls['name'];
  }

  public onCreateApplication() {
    this.createApplicationForm.markAllAsTouched();
    if (this.createApplicationForm.invalid) {
      return;
    }
    this.createApplication.emit(this.applicationNameFormControl.value);
  }
}
