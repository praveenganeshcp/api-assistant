import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MinimalEndpointInfo } from '../../types';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'api-assistant-endpoints-list-item',
  templateUrl: './endpoints-list-item.component.html',
  styleUrls: ['./endpoints-list-item.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe],
})
export class EndpointsListItemComponent {
  @Input() minimalEndpointInfo!: MinimalEndpointInfo;
}
