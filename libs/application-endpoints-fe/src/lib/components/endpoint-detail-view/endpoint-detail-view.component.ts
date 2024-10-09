import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { Endpoint } from '../../types';
import { CanBeNull } from 'ngx-simple-widgets';

@Component({
  selector: 'api-assistant-endpoint-detail-view',
  standalone: true,
  imports: [NgIf],
  templateUrl: './endpoint-detail-view.component.html',
  styleUrls: ['./endpoint-detail-view.component.scss'],
})
export class EndpointDetailViewComponent {
  @Input() endpoint: CanBeNull<Endpoint> = null;

  get endpointCrud(): string {
    return JSON.stringify(this.endpoint?.crud, undefined, 3);
  }

  get endpointResponse(): string {
    return JSON.stringify(this.endpoint?.response, undefined, 3);
  }
}
