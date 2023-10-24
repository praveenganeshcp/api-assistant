import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  SW_DIALOG_DATA,
  SwDialogRef,
  SwDialogModule,
  SwButtonComponent,
  SwInputComponent,
  SwAllowedSizes,
} from 'ngx-simple-widgets';
import { Observable, map, combineLatest, tap } from 'rxjs';
import { BreakPointObserver } from '../../../app/services/breakpointobserver.service';
import { createProject } from '../../store/dashboard.actions';
import { AppState } from '../../../app/app.state';
import {
  isCreateProjectInProgress,
  createProjectError,
  isCreateProjectSuccess,
} from '../../store/dashboard.selector';

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
  ],
})
export class CreateProjectComponent {
  public projectNameControl = new FormControl('');

  constructor(
    @Inject(SW_DIALOG_DATA) public data: unknown,
    private dialogRef: SwDialogRef<CreateProjectComponent>,
    private breakpointObserver: BreakPointObserver,
    private store: Store<AppState>
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

  public projectCreationErrorMsg$: Observable<string> =
    this.store.select(createProjectError);

  public isCreateProjectInProgress$: Observable<boolean> = this.store.select(
    isCreateProjectInProgress
  );

  public onCreateProject() {
    this.store.dispatch(
      createProject({ name: this.projectNameControl.value as string })
    );
  }
}
