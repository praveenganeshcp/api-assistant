import { Component, Input } from '@angular/core';
import { DbResultsRawJsonViewComponent } from '../db-results-raw-json-view/db-results-raw-json-view.component';

@Component({
  selector: 'api-assistant-db-results-viewer',
  standalone: true,
  imports: [DbResultsRawJsonViewComponent],
  templateUrl: './db-results-viewer.component.html',
  styleUrls: ['./db-results-viewer.component.scss'],
})
export class DbResultsViewerComponent {
  @Input() results: unknown = {};
}
