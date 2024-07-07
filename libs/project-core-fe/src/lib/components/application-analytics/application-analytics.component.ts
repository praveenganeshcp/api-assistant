import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SwIconComponent } from 'ngx-simple-widgets';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ApplicationCRUDAnalyticChartProps } from '../../types';

@Component({
  selector: 'api-assistant-application-analytics',
  standalone: true,
  templateUrl: './application-analytics.component.html',
  styleUrls: ['./application-analytics.component.scss'],
  imports: [SwIconComponent, NgIf, AsyncPipe, NgFor, NgChartsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationAnalyticsComponent {
  protected chartData: ChartConfiguration<'bar'>['data'] = {
    datasets: [],
    labels: [],
  };

  @Input()
  set crudAnalyticsData(props: ApplicationCRUDAnalyticChartProps) {
    this.chartData = {
      labels: props.labels,
      datasets: [
        {
          data: Object.values(props.data),
          label: 'Actions',
          backgroundColor: 'rgba(255,0,0,0.3)',
        },
      ],
    };
  }

  public lineChartOptions: ChartOptions<'bar'> = {
    responsive: true,
  };
}
