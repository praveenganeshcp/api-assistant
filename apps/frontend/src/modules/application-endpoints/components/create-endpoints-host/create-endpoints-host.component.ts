import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  EndpointFormValue,
  EndpointsFormComponent,
} from '@api-assistant/application-endpoints-fe';
import { StoreActionDispatcher } from '@api-assistant/commons-fe';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { CanBeNull, SwButtonComponent } from 'ngx-simple-widgets';
import {
  createEndpointAction,
  endpointCreatedAction,
  errorInCreatingEndpointAction,
} from '../../store/actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/app.state';
import { fetchAllRequestHandlersAction } from '../../../application-cloud-code/store/actions';
import { requestHandlersDataSelector } from '../../../application-cloud-code/store/selectors';

@Component({
  selector: 'api-assistant-create-endpoints-host',
  standalone: true,
  imports: [
    CommonModule,
    EndpointsFormComponent,
    SwButtonComponent,
    RouterModule,
  ],
  templateUrl: './create-endpoints-host.component.html',
  styleUrls: ['./create-endpoints-host.component.scss'],
})
export class CreateEndpointsHostComponent implements OnInit {

  protected readonly requestHandlers$: Observable<CanBeNull<string[]>> = this.store.select(requestHandlersDataSelector);

  constructor(
    private readonly storeActionDispatcher: StoreActionDispatcher,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
      this.store.dispatch(fetchAllRequestHandlersAction({
        applicationId: this.applicationId
      }))
  }

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
            validations: value.validations,
            method: value.method,
            isAuthenticated: value.isAuthenticated,
            useCloudCode: value.useCloudCode,
            requestHandler: value.requestHandler
          },
          applicationId: this.applicationId,
        }),
        endpointCreatedAction,
        errorInCreatingEndpointAction,
        this.inProgress$
      )
      .subscribe((_) => {
        this.router.navigate([
          'app',
          'applications',
          this.applicationId,
          'endpoints',
        ]);
      });
  }
}
