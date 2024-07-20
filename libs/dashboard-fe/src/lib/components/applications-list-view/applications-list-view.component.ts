import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationListItemComponent } from '../application-list-item/application-list-item.component';
import { Application } from '@api-assistant/application-core';

@Component({
  selector: 'api-assistant-applications-list-view',
  templateUrl: './applications-list-view.component.html',
  standalone: true,
  imports: [CommonModule, ApplicationListItemComponent],
})
export class ApplicationsListViewComponent {
  @Input() applications: Application[] = [];
}
