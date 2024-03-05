import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators, FormBuilder } from '@angular/forms';
import {
  SW_DIALOG_DATA,
  SwDialogRef,
  SwDialogModule,
  SwButtonComponent,
  SwInputComponent,
  SwAllowedSizes,
  SwFormControlComponent,
  CanBeNull,
} from 'ngx-simple-widgets';
import { Observable, map, combineLatest, BehaviorSubject } from 'rxjs';
import { BreakPointObserver } from '../../../app/services/breakpointobserver.service';
import { createProjectAction, errorInCreatingProjectAction, projectCreatedAction } from '../../store/dashboard.actions';
import { StoreWrapper } from '../../../commons/StoreWrapper';
import { Project } from '../../store/dashboard.state';

@Component({
  selector: 'api-assistant-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SwDialogModule,
    SwButtonComponent,
    SwInputComponent,
    ReactiveFormsModule,
    SwFormControlComponent
  ],
})
export class CreateProjectComponent {

  public createProjectForm = this.formBuilder.group({
    name: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ])
  })

  public loading$ = new BehaviorSubject(false);

  public errorMessage = "";

  public errorMessagesMap: Record<string, string> = {
    minLength: "Minimum 3 characters is required"
  }

  constructor(
    @Inject(SW_DIALOG_DATA) public data: unknown,
    private dialogRef: SwDialogRef<CanBeNull<Project>>,
    private breakpointObserver: BreakPointObserver,
    private storeWrapper: StoreWrapper,
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
    if(this.createProjectForm.invalid) {
      return
    }
    this.errorMessage = "";
    this.storeWrapper.dispatchAsyncAction(
      createProjectAction({ name: this.projectNameFormControl.value }),
      projectCreatedAction,
      errorInCreatingProjectAction,
      this.loading$
    ).subscribe({
      next: (response) => {
        this.dialogRef.close(response.data)
      },
      error: (err: ReturnType<typeof errorInCreatingProjectAction>) => {
        this.errorMessage = err.error;
      }
    })
  }

  public close() {
    this.dialogRef.close(null);
  }
}
