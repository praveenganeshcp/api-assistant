import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Application } from '../../types';
import { ApplicationListItemComponent } from '../application-list-item/application-list-item.component';

@Component({
  selector: 'api-assistant-applications-list-view',
  templateUrl: './applications-list-view.component.html',
  standalone: true,
  imports: [CommonModule, ApplicationListItemComponent],
})
export class ApplicationsListViewComponent {
  @Input() applications: Application[] = [];
}
