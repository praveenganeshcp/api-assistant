import { Component, Input } from '@angular/core';
import { SwColumnDef, SwTableComponent } from 'ngx-simple-widgets';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'api-assistant-db-results-viewer',
  standalone: true,
  imports: [SwTableComponent, NgFor, NgIf],
  templateUrl: './db-results-viewer.component.html',
  styleUrls: ['./db-results-viewer.component.scss'],
})
export class DbResultsViewerComponent {
  protected rows: Array<{ [key: string]: unknown }> = [];

  protected columns: SwColumnDef[] = [];

  @Input() loading: boolean = false;

  @Input()
  set results(data: unknown) {
    if (Array.isArray(data)) {
      const uniqueColumnNames: string[] = this.getUniqueObjectKeys(
        data
      ) as string[];
      this.columns = uniqueColumnNames.map((columnName) => ({
        fieldName: columnName,
        label: columnName,
        renderTemplate: false,
        flex: 'auto',
      }));
      this.rows = data;
    } else if (typeof data === 'object' && !!data) {
      const uniqueColumnNames: string[] = this.getUniqueObjectKeys([
        data,
      ]) as string[];
      this.columns = uniqueColumnNames.map((columnName) => ({
        fieldName: columnName,
        label: columnName,
        renderTemplate: false,
        flex: 'auto',
      }));
      this.rows = [data as any];
    } else {
      this.rows = data as any;
    }
  }

  private getUniqueObjectKeys(data: unknown[]) {
    const uniqueKeys = new Set();
    data.forEach((object) => {
      Object.keys(object ?? {}).forEach((objectKey) => {
        uniqueKeys.add(objectKey);
      });
    });
    return [...uniqueKeys.values()];
  }
}
