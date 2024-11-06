import { Component, inject, OnInit } from "@angular/core";
import { AsyncPipe, NgFor } from "@angular/common";
import {
  DbCollectionsViewComponent,
  DbResultsViewerComponent,
} from "@api-assistant/application-database-fe";
import { BehaviorSubject, Observable, filter, map, of, tap } from "rxjs";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app/app.state";
import {
  appDbCollectionsListSelector,
  appDbResultListSelector,
} from "../../store/selectors";
import {
  CanBeNull,
  DropdownOptions,
  SwButtonComponent,
  SwDropdownComponent,
  SwListViewComponent,
  SwListViewItem,
} from "ngx-simple-widgets";
import {
  errorInExecutingQueryAction,
  executeQueryAction,
  loadCollectionsAction,
  queryExecutedAction,
} from "../../store/actions";
import { ActivatedRoute } from "@angular/router";
import { ALLOWED_DB_OPERATIONS_IN_ENDPOINT } from "@api-assistant/application-endpoints-fe";
import {
  JsonInputComponent,
  StoreActionDispatcher,
} from "@api-assistant/commons-fe";
import { CRUDActionDefinition } from "@api-assistant/applications-crud-engine-core";

@Component({
  selector: "api-assistant-application-db-host",
  standalone: true,
  imports: [
    DbCollectionsViewComponent,
    AsyncPipe,
    NgFor,
    DbResultsViewerComponent,
    SwDropdownComponent,
    ReactiveFormsModule,
    SwButtonComponent,
    JsonInputComponent,
    SwListViewComponent,
  ],
  templateUrl: "./application-db-host.component.html",
  styleUrls: ["./application-db-host.component.scss"],
})
export class ApplicationDbHostComponent implements OnInit {
  private readonly store: Store<AppState> = inject(Store);

  private readonly activatedRoute = inject(ActivatedRoute);

  protected readonly collectionNameListItems$: Observable<
    CanBeNull<SwListViewItem[]>
  > = this.store.select(appDbCollectionsListSelector).pipe(
    filter((data) => !!data),
    map((collectionNames) => {
      return (collectionNames ?? []).map((collectionName, index) => {
        return <SwListViewItem>{
          id: collectionName,
          text: collectionName,
        };
      });
    })
  );

  protected readonly queryResult$: Observable<CanBeNull<unknown>> = this.store
    .select(appDbResultListSelector)
    .pipe(filter((data) => !!data));

  private readonly actionDispatcher = inject(StoreActionDispatcher);

  protected readonly actionListItems: SwListViewItem[] = [
    { text: "Find All", id: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.find },
    { text: "Find one", id: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.findOne },
    { text: "Insert many", id: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.insertMany },
    { text: "Insert one", id: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.insertOne },
    { text: "Update one", id: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.updateOne },
    {
      text: "Update many",
      id: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.updateMany,
    },
    { text: "Delete one", id: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.deleteOne },
    {
      text: "Delete many",
      id: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.deleteMany,
    },
  ];

  public readonly queryExecutionInProgress$ = new BehaviorSubject(false);

  protected readonly queryForm = this.formBuilder.group({
    collectionName: this.formBuilder.control(""),
    payload: this.formBuilder.control({}),
    operation: this.formBuilder.control(""),
  });

  public get applicationId(): string {
    return this.activatedRoute.parent?.snapshot.params["applicationId"];
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
    return this.queryForm.controls["collectionName"];
  }

  protected get selectedCollectionName(): string {
    return this.collectionNameControl.value ?? "";
  }

  private get actionControl() {
    return this.queryForm.controls["operation"];
  }

  protected get actionControlValue(): string {
    return this.actionControl.value ?? "";
  }

  handleActionChange(action: SwListViewItem) {
    this.queryForm.patchValue({
      operation: action.id as string,
      payload: this.getMockQuery(
        action.id as ALLOWED_DB_OPERATIONS_IN_ENDPOINT
      ),
    });
  }

  constructor(private readonly formBuilder: FormBuilder) {}

  protected handleCollectionChange(selectedCollection: SwListViewItem) {
    this.queryForm.setValue({
      collectionName: selectedCollection.text,
      payload: this.getMockQuery(ALLOWED_DB_OPERATIONS_IN_ENDPOINT.find),
      operation: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.find,
    });
    this.handleQueryExecute();
  }

  private getMockQuery(operation: ALLOWED_DB_OPERATIONS_IN_ENDPOINT) {
    switch (operation) {
      case ALLOWED_DB_OPERATIONS_IN_ENDPOINT.findOne:
      case ALLOWED_DB_OPERATIONS_IN_ENDPOINT.find: {
        return {
          filter: {},
          options: {},
        };
      }
      case ALLOWED_DB_OPERATIONS_IN_ENDPOINT.deleteOne:
      case ALLOWED_DB_OPERATIONS_IN_ENDPOINT.deleteMany: {
        return {
          field: "value",
        };
      }
      case ALLOWED_DB_OPERATIONS_IN_ENDPOINT.insertOne: {
        return {
          field: "value",
        };
      }
      case ALLOWED_DB_OPERATIONS_IN_ENDPOINT.insertMany: {
        return [{ field: "value" }, { field: "value" }];
      }
      case ALLOWED_DB_OPERATIONS_IN_ENDPOINT.updateMany:
      case ALLOWED_DB_OPERATIONS_IN_ENDPOINT.updateOne: {
        return {
          filter: {
            field: "value",
          },
          patch: { $set: { field: "value" } },
        };
      }
      default: {
        return {};
      }
    }
  }
}
