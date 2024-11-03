import { Component, Input } from '@angular/core';
import { SwLoaderComponent } from 'ngx-simple-widgets';
import { ApplicationDashboardView } from '@api-assistant/application-core';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApplicationListItemComponent } from '../application-list-item/application-list-item.component';

@Component({
  selector: 'api-assistant-applications-list-view',
  standalone: true,
  imports: [SwLoaderComponent, NgIf, NgFor, RouterModule, ApplicationListItemComponent],
  templateUrl: './applications-list-view.component.html',
  styleUrls: ['./applications-list-view.component.scss'],
})
export class ApplicationsListViewComponent {
  @Input() applications: ApplicationDashboardView[] = [];

  @Input() isLoading: boolean = false;

}
