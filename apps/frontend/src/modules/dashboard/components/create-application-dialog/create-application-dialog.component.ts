import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  BreakPointObserver,
  StoreActionDispatcher,
} from '@api-assistant/commons-fe';
import { CreateApplicationFormComponent } from '@api-assistant/dashboard-fe';
import {
  SwAllowedSizes,
  SwDialogModule,
  SwDialogRef,
} from 'ngx-simple-widgets';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import {
  applicationCreatedAction,
  createApplicationAction,
  errorInCreatingApplicationAction,
  loadApplicationsAction,
} from '../../store/actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'api-assistant-create-application-dialog',
  standalone: true,
  imports: [SwDialogModule, AsyncPipe, CreateApplicationFormComponent],
  templateUrl: './create-application-dialog.component.html',
})
export class CreateApplicationDialogComponent {
  protected createAppInProgress$ = new BehaviorSubject(false);

  constructor(
    private readonly breakpointObserver: BreakPointObserver,
    private readonly actionDispatcher: StoreActionDispatcher,
    private readonly dialogRef: SwDialogRef<void>,
    private readonly store: Store
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

  protected handleCreateApplication(applicationName: string) {
    this.actionDispatcher
      .dispatchAsyncAction(
        createApplicationAction({ name: applicationName }),
        applicationCreatedAction,
        errorInCreatingApplicationAction,
        this.createAppInProgress$
      )
      .subscribe({
        next: () => {
          this.store.dispatch(loadApplicationsAction());
        },
        complete: () => {
          this.dialogRef.close();
        },
      });
  }
}
