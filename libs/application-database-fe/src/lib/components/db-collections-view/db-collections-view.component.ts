import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule, NgFor, NgSwitch, NgSwitchCase } from '@angular/common';
import {
  SwButtonComponent,
  SwColumnDef,
  SwTableComponent,
} from 'ngx-simple-widgets';

@Component({
  selector: 'api-assistant-db-collections-view',
  standalone: true,
  imports: [CommonModule, SwButtonComponent, SwTableComponent],
  templateUrl: './db-collections-view.component.html',
  styleUrls: ['./db-collections-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DbCollectionsViewComponent {
  protected columns: SwColumnDef[] = [
    {
      label: 'Collections',
      fieldName: 'name',
      renderTemplate: true,
      flex: '1',
    },
  ];

  protected rows: Array<{ name: string }> = [];

  @Input()
  set collectionNames(data: string[]) {
    this.rows = data.map((collectionName) => ({ name: collectionName }));
  }

  @Input() selectedCollectionName: string = '';

  @Output() change = new EventEmitter<string>();

  handleSelectCollection(collectionName: string) {
    this.change.emit(collectionName);
  }
}
