import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import {
  SwDialogModule,
  SwButtonComponent,
  SwInputComponent,
  SwAllowedSizes,
  SwFormControlComponent,
} from 'ngx-simple-widgets';
import { Observable, map, combineLatest } from 'rxjs';
import { BreakPointObserver } from '@api-assistant/commons-fe';

@Component({
  selector: 'api-assistant-create-project-form',
  templateUrl: './create-project-form.component.html',
  styleUrls: ['./create-project-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SwDialogModule,
    SwButtonComponent,
    SwInputComponent,
    ReactiveFormsModule,
    SwFormControlComponent,
  ],
})
export class CreateProjectFormComponent {
  @Input() loading: boolean = false;

  @Output() createApplication = new EventEmitter<string>();

  public createProjectForm = this.formBuilder.group({
    name: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
  });

  public errorMessagesMap: Record<string, string> = {
    minLength: 'Minimum 3 characters is required',
  };

  constructor(
    private breakpointObserver: BreakPointObserver,
    private formBuilder: FormBuilder
  ) {}

  public dialogSize$: Observable<SwAllowedSizes> = combineLatest([
    this.breakpointObserver.isDesktopScreen$,
    this.breakpointObserver.isTabletScreen$,
    this.breakpointObserver.isMobileScreen$,
  ]).pipe(
    map(([isDesktopScreen, isTabletScreen]) => {
      if (isDesktopScreen) return 'sm';
      else if (isTabletScreen) return 'sm';
      return 'lg';
    })
  );

  public get projectNameFormControl(): FormControl {
    return this.createProjectForm.controls['name'];
  }

  public onCreateProject() {
    this.createProjectForm.markAllAsTouched();
    if (this.createProjectForm.invalid) {
      return;
    }
    this.createApplication.emit(this.projectNameFormControl.value);
  }
}
