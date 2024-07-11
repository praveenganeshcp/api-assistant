import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { MinimalEndpointInfo } from '../../types';
import { EndpointsListItemComponent } from '../endpoints-list-item/endpoints-list-item.component';

@Component({
  selector: 'api-assistant-endpoints-list-view',
  templateUrl: './endpoints-list-view.component.html',
  styleUrls: ['./endpoints-list-view.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EndpointsListItemComponent, NgFor],
})
export class EndpointsListViewComponent {
  @Input() endpointsMinimalInfo: MinimalEndpointInfo[] = [];

  @Output() endpointClicked = new EventEmitter<MinimalEndpointInfo>();

  trackEndpoints(_: number, endpoint: MinimalEndpointInfo) {
    return endpoint._id;
  }

  public handleEndpointClicked(endpoint: MinimalEndpointInfo) {
    this.endpointClicked.emit(endpoint);
  }
}
