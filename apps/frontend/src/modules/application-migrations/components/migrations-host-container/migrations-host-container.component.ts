import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MigrationsListItemComponent } from '../migrations-list-item/migrations-list-item.component';
import { ApplicationMigration } from '../../types';
import { CanBeNull, SwButtonComponent } from 'ngx-simple-widgets';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BehaviorSubject, combineLatest, filter, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/app.state';
import { migrationsListDataSelector } from '../../store/selectors';
import {
  applyMigrationAction,
  errorOccuredInApplyMigrationAction,
  errorOccuredInRevertMigrationAction,
  loadMigrationsListAction,
  migrationAppliedAction,
  migrationRevertedAction,
  revertMigrationAction,
} from '../../store/actions';
import { StoreActionDispatcher } from '@api-assistant/commons-fe';

@Component({
  selector: 'api-assistant-migrations-host-container',
  standalone: true,
  imports: [
    CommonModule,
    MigrationsListItemComponent,
    SwButtonComponent,
    RouterModule,
  ],
  templateUrl: './migrations-host-container.component.html',
  styleUrls: ['./migrations-host-container.component.scss'],
})
export class MigrationsHostContainerComponent implements OnInit {
  private readonly store: Store<AppState> = inject(Store);

  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly asyncActionDispatcher = inject(StoreActionDispatcher);

  private readonly router: Router = inject(Router);

  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  private get applicationId(): string {
    return this.activatedRoute.parent?.snapshot.params['applicationId'];
  }

  migrations$: Observable<CanBeNull<ApplicationMigration[]>> = this.store
    .select(migrationsListDataSelector)
    .pipe(filter((data) => !!data));

  isApplyMigrationInProgress$ = new BehaviorSubject(false);

  isRevertMigrationInProgress$ = new BehaviorSubject(false);

  isMigrationInProgress$: Observable<boolean> = combineLatest([
    this.isApplyMigrationInProgress$.asObservable(),
    this.isRevertMigrationInProgress$.asObservable(),
  ]).pipe(
    map(
      ([isApplyMigrationInProgress, isRevertMigrationInProgress]) =>
        isApplyMigrationInProgress || isRevertMigrationInProgress
    )
  );

  ngOnInit(): void {
    this.store.dispatch(
      loadMigrationsListAction({ applicationId: this.applicationId })
    );
  }

  protected handleApplyMigration() {
    this.asyncActionDispatcher
      .dispatchAsyncAction(
        applyMigrationAction({ applicationId: this.applicationId }),
        migrationAppliedAction,
        errorOccuredInApplyMigrationAction,
        this.isApplyMigrationInProgress$
      )
      .subscribe({
        next: () => {
          this.store.dispatch(
            loadMigrationsListAction({ applicationId: this.applicationId })
          );
        },
      });
  }

  protected handleRevertMigration() {
    this.asyncActionDispatcher
      .dispatchAsyncAction(
        revertMigrationAction({ applicationId: this.applicationId }),
        migrationRevertedAction,
        errorOccuredInRevertMigrationAction,
        this.isRevertMigrationInProgress$
      )
      .subscribe({
        next: () => {
          this.store.dispatch(
            loadMigrationsListAction({ applicationId: this.applicationId })
          );
        },
      });
  }

  protected handleItemNavigation(item: ApplicationMigration) {
    this.router.navigate([item.fileName], { relativeTo: this.route });
  }
}
