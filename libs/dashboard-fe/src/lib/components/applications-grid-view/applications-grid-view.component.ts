import { Component, Input } from '@angular/core';
import { SwColumnDef, SwTableComponent } from 'ngx-simple-widgets';
import { ApplicationDashboardView } from '@api-assistant/application-core';
import { DatePipe, NgSwitch, NgSwitchCase } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'api-assistant-applications-grid-view',
  standalone: true,
  imports: [SwTableComponent, DatePipe, NgSwitchCase, NgSwitch, RouterModule],
  templateUrl: './applications-grid-view.component.html',
  styleUrls: ['./applications-grid-view.component.scss'],
})
export class ApplicationsGridViewComponent {
  @Input() rows: ApplicationDashboardView[] = [];

  @Input() isLoading: boolean = false;

  protected readonly activeColumns: SwColumnDef[] = [
    { fieldName: 'name', label: 'Name', renderTemplate: false, flex: '1' },
    {
      fieldName: 'createdOn',
      label: 'Created on',
      renderTemplate: true,
      flex: '1',
    },
    {
      fieldName: 'endpointsCount',
      label: 'Total Endpoints',
      renderTemplate: false,
      flex: '1',
    },
    {
      fieldName: 'usersCount',
      label: 'Total Users',
      renderTemplate: false,
      flex: '1',
    },
    { fieldName: '_id', label: 'Action', renderTemplate: true, flex: '1' },
  ];
}
