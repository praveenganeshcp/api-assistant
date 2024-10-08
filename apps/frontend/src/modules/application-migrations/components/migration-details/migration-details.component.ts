import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MigrationLogicFormComponent } from '../migration-logic-form/migration-logic-form.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SwButtonComponent } from 'ngx-simple-widgets';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/app.state';
import { migrationsDetailsDataSelector } from '../../store/selectors';
import { BehaviorSubject, tap } from 'rxjs';
import {
  errorInUpdatingMigration,
  loadMigrationDetailsAction,
  migrationUpdatedAction,
  updateMigrationAction,
} from '../../store/actions';
import { StoreActionDispatcher } from '@api-assistant/commons-fe';

@Component({
  selector: 'api-assistant-migration-details',
  standalone: true,
  imports: [
    CommonModule,
    MigrationLogicFormComponent,
    RouterModule,
    ReactiveFormsModule,
    SwButtonComponent,
  ],
  templateUrl: './migration-details.component.html',
  styleUrls: ['./migration-details.component.scss'],
})
export class MigrationDetailsComponent implements OnInit {
  private readonly store: Store<AppState> = inject(Store);

  private readonly router = inject(Router);

  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly storeDispatcher = inject(StoreActionDispatcher);

  protected readonly updateInProgress$ = new BehaviorSubject(false);

  public migrationDetails$ = this.store
    .select(migrationsDetailsDataSelector)
    .pipe(
      tap((data) => {
        this.formControl.setValue(data?.logic);
      })
    );

  ngOnInit(): void {
    this.store.dispatch(
      loadMigrationDetailsAction({
        applicationId: this.applicationId,
        fileName: this.fileName,
      })
    );
  }

  public formControl = new FormControl();

  private get applicationId(): string {
    return this.activatedRoute.parent?.snapshot.params['applicationId'];
  }

  private get fileName(): string {
    return this.activatedRoute?.snapshot.params['fileName'];
  }

  protected handleSave() {
    this.storeDispatcher
      .dispatchAsyncAction(
        updateMigrationAction({
          applicationId: this.applicationId,
          fileName: this.fileName,
          logic: this.formControl.value,
        }),
        migrationUpdatedAction,
        errorInUpdatingMigration,
        this.updateInProgress$
      )
      .subscribe({
        next: () => {
          this.router.navigate(['..'], { relativeTo: this.activatedRoute });
        },
      });
  }
}
