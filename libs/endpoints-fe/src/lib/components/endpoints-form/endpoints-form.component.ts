import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CanBeNull, SwButtonComponent, SwFormControlComponent } from 'ngx-simple-widgets';
import { JsonInputComponent } from '@api-assistant/commons-fe';

export interface EndpointFormValue {
  name: string;
  url: string;
  description: string;
  body: Object;
  response: Object;
}

@Component({
  selector: 'api-assistant-endpoints-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SwFormControlComponent, SwButtonComponent, JsonInputComponent],
  templateUrl: './endpoints-form.component.html',
  styleUrls: ['./endpoints-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EndpointsFormComponent {

  @Input()
  set value(formValue: CanBeNull<EndpointFormValue>) {
    if(formValue) {
      this.createEndpointForm?.setValue(formValue)
    }
    else {
      this.createEndpointForm.setValue({
        name: '',
        url: '',
        description: '',
        body: '',
        response: ''
      })
    }
  }

  @Output() onSubmit = new EventEmitter<{value: EndpointFormValue}>();

  public readonly createEndpointForm: FormGroup = this.formBuilder.group({
    name: this.formBuilder.control('', [Validators.required]),
    url: this.formBuilder.control('', [Validators.required]),
    description: this.formBuilder.control('', [Validators.required]),
    body: this.formBuilder.control(null, [Validators.required]),
    response: this.formBuilder.control(null, [Validators.required])
  })


  public get nameControl() {
    return this.createEndpointForm.controls['name'];
  }

  public get urlControl() {
    return this.createEndpointForm.controls['url'];
  }

  public get descriptionControl() {
    return this.createEndpointForm.controls['description'];
  }

  constructor(
    private readonly formBuilder: FormBuilder
  ) {
  }

  public handleSubmit() {
    if(this.createEndpointForm.valid) {
      this.onSubmit.emit({value: this.createEndpointForm.value});
    }
  }

}
