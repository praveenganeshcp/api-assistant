import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {
  DbCollectionsViewComponent,
  DbQueryInputComponent,
  DbResultsViewerComponent,
} from '@api-assistant/application-database-fe';
import { Observable, map, of, tap } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'api-assistant-application-db-host',
  standalone: true,
  imports: [
    DbCollectionsViewComponent,
    AsyncPipe,
    DbQueryInputComponent,
    DbResultsViewerComponent,
  ],
  templateUrl: './application-db-host.component.html',
  styleUrls: ['./application-db-host.component.scss'],
})
export class ApplicationDbHostComponent {
  protected readonly collectionNames$: Observable<string[]> = of([]);

  protected readonly rows = {};

  protected readonly queryForm = this.formBuilder.group({
    collectionName: this.formBuilder.control('users'),
    query: this.formBuilder.control({}),
    actionName: this.formBuilder.control(''),
  });

  private get collectionNameControl() {
    return this.queryForm.controls['collectionName'];
  }

  protected get selectedCollectionName(): string {
    return this.collectionNameControl.value ?? '';
  }

  constructor(private readonly formBuilder: FormBuilder) {}

  protected handleCollectionChange(collectionName: string) {
    this.collectionNameControl.patchValue(collectionName);
  }
}
