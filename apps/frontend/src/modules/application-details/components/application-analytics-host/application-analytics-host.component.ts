import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import {
  ApplicationAnalyticsComponent,
  ApplicationCRUDAnalyticChartProps,
} from '@api-assistant/project-core-fe';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/app.state';
import { applicationDataSelector } from '../../store/selectors';

@Component({
  selector: 'api-assistant-application-analytics-host',
  standalone: true,
  imports: [CommonModule, ApplicationAnalyticsComponent],
  templateUrl: './application-analytics-host.component.html',
  styleUrls: ['./application-analytics-host.component.scss'],
})
export class ApplicationAnalyticsHostComponent {
  protected readonly crudAnalyticsProps$: Observable<ApplicationCRUDAnalyticChartProps> =
    this.store.select(applicationDataSelector).pipe(
      map((applicationDetails) => {
        if (!applicationDetails.data?.count) {
          return {
            data: { create: 0, update: 0, delete: 0, read: 0 },
            labels: [],
          };
        }
        const {
          createAction: create,
          updateAction: update,
          deleteAction,
          readAction: read,
        } = applicationDetails.data.count;
        const props: ApplicationCRUDAnalyticChartProps = {
          data: {
            create,
            update,
            read,
            delete: deleteAction,
          },
          labels: ['Create', 'Update', 'Read', 'Delete'],
        };
        return props;
      })
    );

  constructor(private readonly store: Store<AppState>) {}
}
