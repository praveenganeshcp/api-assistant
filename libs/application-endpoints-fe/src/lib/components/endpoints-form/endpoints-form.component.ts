import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
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
import { CRUDEngineHttpMethods } from '@api-assistant/applications-crud-engine-core';

export interface EndpointFormValue {
  name: string;
  url: string;
  description: string;
  body: Object[];
  response: Object;
  validations: Object;
  method: CRUDEngineHttpMethods;
  isAuthenticated: boolean;
  useCloudCode: boolean,
  requestHandler: string
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
export class EndpointsFormComponent implements AfterViewInit, OnChanges {
  @Input() loading: boolean = false;

  @Input() requestHandlers: string[] = [];

  @Input() inEditMode: boolean = false;

  @Input()
  set value(formValue: CanBeNull<EndpointFormValue>) {
    if (formValue) {
      console.log(formValue)
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
        isAuthenticated: false,
        useCloudCode: false,
        requestHandler: ''
      });
    }
  }

  @Output() onSubmit = new EventEmitter<{ value: EndpointFormValue }>();

  public readonly httpMethodOptions: Array<{
    label: string;
    value: CRUDEngineHttpMethods;
  }> = [
    { label: 'Post', value: 'POST' },
    { label: 'Get', value: 'GET' },
    { label: 'Patch', value: 'PATCH' },
    { label: 'Delete', value: 'DELETE' },
  ];

  public readonly createEndpointForm: FormGroup = this.formBuilder.group({
    name: this.formBuilder.control('', [Validators.required]),
    url: this.formBuilder.control('', [Validators.required]),
    method: this.formBuilder.control('POST', [Validators.required]),
    description: this.formBuilder.control('', [Validators.required]),
    body: this.formBuilder.control([]),
    response: this.formBuilder.control({}),
    validations: this.formBuilder.control({}, [Validators.required]),
    isAuthenticated: this.formBuilder.control(false, [Validators.required]),
    useCloudCode: this.formBuilder.control(false, [Validators.required]),
    requestHandler: this.formBuilder.control('')
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

  public get useCloudCodeControl() {
    return this.createEndpointForm.controls['useCloudCode'];
  }

  public get cloudCodeEnabled() {
    return this.useCloudCodeControl.value === true;
  }

  public get isAuthenticatedControl() {
    return this.createEndpointForm.controls['isAuthenticated'];
  }

  constructor(private readonly formBuilder: FormBuilder) {}

  ngAfterViewInit(): void {
      this.useCloudCodeControl.valueChanges.subscribe(isEnabled => {
        if(isEnabled) {
          this.createEndpointForm.patchValue({
            response: {},
            body: []
          })
        }
        else {
          this.createEndpointForm.patchValue({
            requestHandler: ''
          })
        }
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['inEditMode']) {
        if(this.inEditMode) {
          this.useCloudCodeControl.disable()
        }
        else {
          this.useCloudCodeControl.enable();
        }
      }
  }

  public handleSubmit() {
    if (this.createEndpointForm.valid) {
      this.onSubmit.emit({ value: this.createEndpointForm.value });
    }
  }
}
