import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import {
  DbCollectionsViewComponent,
  DbQueryInputComponent,
  DbResultsViewerComponent,
} from '@api-assistant/application-database-fe';
import { BehaviorSubject, Observable, filter, map, of, tap } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/app.state';
import {
  appDbCollectionsListSelector,
  appDbResultListSelector,
} from '../../store/selectors';
import {
  CanBeNull,
  DropdownOptions,
  SwButtonComponent,
  SwDropdownComponent,
} from 'ngx-simple-widgets';
import {
  errorInExecutingQueryAction,
  executeQueryAction,
  loadCollectionsAction,
  queryExecutedAction,
} from '../../store/actions';
import { ActivatedRoute } from '@angular/router';
import { ALLOWED_DB_OPERATIONS_IN_ENDPOINT } from '@api-assistant/endpoints-fe';
import {
  JsonInputComponent,
  StoreActionDispatcher,
} from '@api-assistant/commons-fe';
import { CRUDActionDefinition } from '@api-assistant/crud-engine-core';

@Component({
  selector: 'api-assistant-application-db-host',
  standalone: true,
  imports: [
    DbCollectionsViewComponent,
    AsyncPipe,
    NgFor,
    DbQueryInputComponent,
    DbResultsViewerComponent,
    SwDropdownComponent,
    ReactiveFormsModule,
    SwButtonComponent,
    JsonInputComponent,
  ],
  templateUrl: './application-db-host.component.html',
  styleUrls: ['./application-db-host.component.scss'],
})
export class ApplicationDbHostComponent implements OnInit {
  private readonly store: Store<AppState> = inject(Store);

  private readonly activatedRoute = inject(ActivatedRoute);

  protected readonly collectionNames$: Observable<CanBeNull<string[]>> =
    this.store
      .select(appDbCollectionsListSelector)
      .pipe(filter((data) => !!data));

  protected readonly queryResult$: Observable<CanBeNull<unknown>> = this.store
    .select(appDbResultListSelector)
    .pipe(filter((data) => !!data));

  private readonly actionDispatcher = inject(StoreActionDispatcher);

  protected readonly options: DropdownOptions[] = [
    { label: 'Insert one', value: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.insertOne },
    {
      label: 'Insert many',
      value: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.insertMany,
    },
    { label: 'Find one', value: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.findOne },
    { label: 'Find All', value: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.find },
    { label: 'Insert many', value: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.find },
    { label: 'Update one', value: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.updateOne },
    {
      label: 'Update many',
      value: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.updateMany,
    },
    { label: 'Delete one', value: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.deleteOne },
    {
      label: 'Delete many',
      value: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.deleteMany,
    },
  ];

  public readonly queryExecutionInProgress$ = new BehaviorSubject(false);

  protected readonly queryForm = this.formBuilder.group({
    collectionName: this.formBuilder.control('users'),
    payload: this.formBuilder.control({}),
    operation: this.formBuilder.control(''),
  });

  public get applicationId(): string {
    return this.activatedRoute.parent?.snapshot.params['applicationId'];
  }

  ngOnInit(): void {
    this.store.dispatch(
      loadCollectionsAction({ applicationId: this.applicationId })
    );
    this.queryForm.valueChanges.subscribe(console.log);
  }

  public handleQueryExecute() {
    this.actionDispatcher
      .dispatchAsyncAction(
        executeQueryAction({
          applicationId: this.applicationId,
          actionDef: this.queryForm.value as CRUDActionDefinition,
        }),
        queryExecutedAction,
        errorInExecutingQueryAction,
        this.queryExecutionInProgress$
      )
      .subscribe();
  }

  private get collectionNameControl() {
    return this.queryForm.controls['collectionName'];
  }

  protected get selectedCollectionName(): string {
    return this.collectionNameControl.value ?? '';
  }

  constructor(private readonly formBuilder: FormBuilder) {}

  protected handleCollectionChange(collectionName: string) {
    this.queryForm.setValue({
      collectionName: collectionName,
      payload: {
        filter: {},
        options: {},
      },
      operation: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.find,
    });
    this.handleQueryExecute();
  }
}
