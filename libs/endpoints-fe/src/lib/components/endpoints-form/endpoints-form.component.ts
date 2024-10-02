import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CanBeNull,
  SwButtonComponent,
  SwFormControlComponent,
  SwInputComponent,
} from 'ngx-simple-widgets';
import { JsonInputComponent } from '@api-assistant/commons-fe';
import { CRUDEngineHttpMethods } from '@api-assistant/crud-engine-core';

export interface EndpointFormValue {
  name: string;
  url: string;
  description: string;
  body: Object[];
  response: Object;
  validations: Object;
  method: CRUDEngineHttpMethods
  isAuthenticated: boolean
}

@Component({
  selector: 'api-assistant-endpoints-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SwFormControlComponent,
    SwButtonComponent,
    JsonInputComponent,
    SwInputComponent,
  ],
  templateUrl: './endpoints-form.component.html',
  styleUrls: ['./endpoints-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EndpointsFormComponent {
  @Input() loading: boolean = false;

  @Input()
  set value(formValue: CanBeNull<EndpointFormValue>) {
    if (formValue) {
      this.createEndpointForm?.setValue(formValue);
    } else {
      this.createEndpointForm.setValue({
        name: '',
        url: '',
        description: '',
        body: '',
        response: '',
        validations: '',
        method: 'POST',
        isAuthenticated: false
      });
    }
  }

  @Output() onSubmit = new EventEmitter<{ value: EndpointFormValue }>();

  public readonly httpMethodOptions: Array<{label: string, value: CRUDEngineHttpMethods}> = [
    { label: 'Post', value: 'POST' },
    { label: 'Get', value: 'GET' },
    { label: 'Patch', value: 'PATCH' },
    { label: 'Delete', value: 'DELETE' }
  ]

  public readonly createEndpointForm: FormGroup = this.formBuilder.group({
    name: this.formBuilder.control('', [Validators.required]),
    url: this.formBuilder.control('', [Validators.required]),
    method: this.formBuilder.control('POST', [Validators.required]),
    description: this.formBuilder.control('', [Validators.required]),
    body: this.formBuilder.control([], [Validators.required]),
    response: this.formBuilder.control({}, [Validators.required]),
    validations: this.formBuilder.control({}, [Validators.required]),
    isAuthenticated: this.formBuilder.control(false, [Validators.required]),
  });

  public get nameControl() {
    return this.createEndpointForm.controls['name'];
  }

  public get urlControl() {
    return this.createEndpointForm.controls['url'];
  }

  public get methodControl() {
    return this.createEndpointForm.controls['method'];
  }

  public get descriptionControl() {
    return this.createEndpointForm.controls['description'];
  }

  public get isAuthenticatedControl() {
    return this.createEndpointForm.controls['isAuthenticated'];
  }

  constructor(private readonly formBuilder: FormBuilder) {}

  public handleSubmit() {
    if (this.createEndpointForm.valid) {
      this.onSubmit.emit({ value: this.createEndpointForm.value });
    }
  }
}
