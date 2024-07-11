import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndpointFormValue, EndpointsFormComponent } from '@api-assistant/endpoints-fe';

@Component({
  selector: 'api-assistant-create-endpoints-host',
  standalone: true,
  imports: [
    CommonModule,
    EndpointsFormComponent
  ],
  templateUrl: './create-endpoints-host.component.html',
  styleUrls: ['./create-endpoints-host.component.scss'],
})
export class CreateEndpointsHostComponent {

  handleCreateEndpoint(value: EndpointFormValue) {
  }
}
