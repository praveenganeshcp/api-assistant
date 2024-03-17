import { Component } from "@angular/core";
import {
	SwButtonComponent,
	SwInputComponent,
	SwIconComponent
} from "ngx-simple-widgets";
import { CommonModule } from "@angular/common";
import { JsonEditorOptions, NgJsonEditorModule } from "ang-jsoneditor";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { switchMap, take } from "rxjs";
import { projectAPIKeyDetailsSelector } from "../../store/selectors";
import { ProjectDetailsRepository } from "../../repository/project-details.repository";
import { GlobalState } from "../../store/state";

@Component({
	selector: 'api-assistant-project-database',
	standalone: true,
	templateUrl: "./project-database.component.html",
	styleUrls: ["./project-database.component.scss"],
	imports: [
		CommonModule,
		SwButtonComponent,
		SwInputComponent,
		SwIconComponent,
    NgJsonEditorModule,
    ReactiveFormsModule
	]
})
export class ProjectDatabaseComponent {
	
  public queryForm = this.formBuilder.group({
    collectionName: this.formBuilder.control(''),
    action: this.formBuilder.control(''),
    payload: this.formBuilder.control({})
  })

  dbResults: Object = {};

  apiDetails$ = this.store.select(projectAPIKeyDetailsSelector)

  collections: string[] = [];

  actions: Array<{name: string, label: string}> = [
    { name: 'findOne', label: 'Find one' },
    { name: 'find', label: 'Find all' },
    { name: 'insertOne', label: 'Insert one' },
    { name: 'insertMany', label: 'Insert many' },
    { name: 'updateOne', label: 'Update one' },
    { name: 'updateMany', label: 'Update many' },
  ]

  public get showResults() {
    return Array.isArray(this.dbResults) ? this.dbResults.length > 0 : Object.keys(this.dbResults).length > 0
  }

  fetchCollections() {
    this.apiDetails$.pipe(
      switchMap((apiDetails) => {
        return this.projectDetailsRepo.fetchCollections(apiDetails?.key ?? "")
      }),
      take(1)
    ).subscribe(collections => {
      this.collections = collections;
    })
  }

  ngOnInit() {
   this.fetchCollections()
  }

  handleQueryChange(payload: any) {
    if (payload.isTrusted) {
      return;
    }
    this.queryForm.controls.payload.setValue(payload);
  }

  public editorOptions = new JsonEditorOptions();

  public resultEditorOptions = new JsonEditorOptions();

  constructor(
    private formBuilder: FormBuilder,
    private projectDetailsRepo: ProjectDetailsRepository,
    private store: Store<GlobalState>
  ) {
    this.editorOptions.mode = "code";

    this.resultEditorOptions.mode = "form";
    this.resultEditorOptions.expandAll = true;
    this.resultEditorOptions.indentation = 4;
  }

  executeQuery() {
    this.dbResults = {}
    const queryPayload = this.queryForm.value;
    const bePayload = {
      crud: [
        {
          action: queryPayload.action,
          collectionName: queryPayload.collectionName,
          payload: queryPayload.payload
        }
      ],
      response: {
        data: "${results.0}"
      }
    }
    this.apiDetails$.pipe(
      switchMap((apiDetails) => {
        return this.projectDetailsRepo.performCRUD(bePayload, apiDetails?.key ?? "")
      }),
      take(1)
    ).subscribe(results => {
      this.dbResults = results.data;
    })
  }
}