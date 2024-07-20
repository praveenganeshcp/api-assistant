import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/app.state';
import { applicationDataSelector } from '../../store/selectors';

@Component({
  selector: 'api-assistant-application-analytics-host',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './application-analytics-host.component.html',
  styleUrls: ['./application-analytics-host.component.scss'],
})
export class ApplicationAnalyticsHostComponent {
  constructor(private readonly store: Store<AppState>) {}
}
