import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { SwButtonComponent } from 'ngx-simple-widgets';

@Component({
  selector: 'api-assistant-db-collections-view',
  standalone: true,
  imports: [NgFor, SwButtonComponent],
  templateUrl: './db-collections-view.component.html',
  styleUrls: ['./db-collections-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DbCollectionsViewComponent {
  @Input() collectionNames: string[] = [];

  @Input() selectedCollectionName: string = '';

  @Output() change = new EventEmitter<string>();

  handleSelectCollection(collectionName: string) {
    this.change.emit(collectionName);
  }
}
