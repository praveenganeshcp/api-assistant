import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from 'apps/frontend/src/environments/environment.dev';
import { ProjectDetailsRepository } from '../../repository/project-details.repository';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/app.state';
import { projectAPIKeyDetailsSelector } from '../../store/selectors';
import { filter, switchMap, take } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { CanBeNull, SwButtonComponent, SwInputComponent } from 'ngx-simple-widgets';

@Component({
  selector: 'api-assistant-project-experiment',
  standalone: true,
  imports: [
    FormsModule,
    NgJsonEditorModule,
    NgIf,
    AsyncPipe,
    SwInputComponent,
    SwButtonComponent,
  ],
  styleUrls: ['./project-experiment.component.scss'],
  templateUrl: './project-experiment.component.html',
})
export class ProjectExperimentComponent {
  apiUrl: string = environment.apiUrl;

  public editorOptions = new JsonEditorOptions();

  public responseEditorOptions = new JsonEditorOptions();

  public get crudUrl() {
    return `${this.apiUrl}api/v6/core-engine/${this.enableFileUploadMode ? "files" : "crud"}`;
  }

  input: string = '';

  data = {};

  response: Object = {};

  filePath: string = "";

  file: CanBeNull<File> = null;

  enableFileUploadMode: boolean = false;

  handleModeSelection() {
    this.cd.detectChanges() 
  }

  apiKeyDetails$ = this.store.select(projectAPIKeyDetailsSelector);

  get contentType(): string {
    return this.enableFileUploadMode ? "form-data": "application/json"
  }

  handleFileSelection(event: any) {
    const files: FileList = event.target?.files;
    if(!files.length) {
      return;
    }
    const file = files.item(0);
    this.file = file;
  }

  constructor(
    private repository: ProjectDetailsRepository,
    private store: Store<AppState>,
    private cd: ChangeDetectorRef
  ) {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.mode = 'code';
    this.editorOptions.indentation = 2;

    this.responseEditorOptions.mode = 'tree';
    this.responseEditorOptions.indentation = 4;
    this.responseEditorOptions.sortObjectKeys = false;
  }

  handleChange(value: any) {
    if (value.isTrusted) {
      return;
    }
    this.data = value;
  }

  sendRequest() {
    this.response = {};
    if(this.enableFileUploadMode && this.file) {
      const formData = new FormData();
      formData.append(this.filePath, this.file);
      this.apiKeyDetails$
      .pipe(
        filter((details) => details !== null),
        switchMap((details) => {
          return this.repository.uploadFile(formData, details?.key ?? "");
        }),
        take(1)
      )
      .subscribe((response) => {
        this.response = response;
      });
      return;
    }
    this.apiKeyDetails$
      .pipe(
        filter((details) => details !== null),
        switchMap((details) => {
          return this.repository.performCRUD(this.data, details?.key || '');
        }),
        take(1)
      )
      .subscribe((response) => {
        this.response = response;
      });
  }

  get showResponseWindow(): boolean {
    return Object.keys(this.response).length > 0;
  }
}