import { Component, Input } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'api-assistant-db-results-raw-json-view',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './db-results-raw-json-view.component.html',
  styleUrls: ['./db-results-raw-json-view.component.css'],
})
export class DbResultsRawJsonViewComponent {
  protected jsonResults: unknown = {};

  @Input()
  set results(data: unknown) {
    if (typeof data === 'object') {
      this.jsonResults = JSON.stringify(data, undefined, 8);
    }
  }
}
