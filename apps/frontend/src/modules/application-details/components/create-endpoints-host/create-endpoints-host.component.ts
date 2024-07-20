import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  EndpointFormValue,
  EndpointsFormComponent,
} from '@api-assistant/endpoints-fe';
import { StoreActionDispatcher } from '@api-assistant/commons-fe';
import {
  createEndpointAction,
  endpointCreatedAction,
  errorInCreatingEndpointAction,
} from '../../store/actions';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'api-assistant-create-endpoints-host',
  standalone: true,
  imports: [CommonModule, EndpointsFormComponent],
  templateUrl: './create-endpoints-host.component.html',
  styleUrls: ['./create-endpoints-host.component.scss'],
})
export class CreateEndpointsHostComponent {
  constructor(
    private readonly storeActionDispatcher: StoreActionDispatcher,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  private get applicationId(): string {
    return this.activatedRoute.parent?.snapshot.params['applicationId'];
  }

  protected readonly inProgress$ = new BehaviorSubject(false);

  handleCreateEndpoint(value: EndpointFormValue) {
    this.storeActionDispatcher
      .dispatchAsyncAction(
        createEndpointAction({
          endpoint: {
            name: value.name,
            description: value.description,
            url: value.url,
            crud: value.body,
            response: value.response,
          },
          applicationId: this.applicationId,
        }),
        endpointCreatedAction,
        errorInCreatingEndpointAction,
        this.inProgress$
      )
      .subscribe(({ endpoint }) => {
        this.router.navigate([
          'app',
          'applications',
          this.applicationId,
          'endpoints',
          endpoint._id,
          'view',
        ]);
      });
  }
}
