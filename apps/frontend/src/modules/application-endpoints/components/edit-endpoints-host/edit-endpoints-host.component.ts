import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, map } from 'rxjs';
import {
  Endpoint,
  EndpointFormValue,
  EndpointsFormComponent,
} from '@api-assistant/application-endpoints-fe';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/app.state';

import { CanBeNull, SwButtonComponent } from 'ngx-simple-widgets';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StoreActionDispatcher } from '@api-assistant/commons-fe';
import {
  editEndpointAction,
  endpointUpdateSuccessAction,
  errorInUpdatingEndpointAction,
  fetchEndpointDetailsAction,
  resetEndpointDetailsStateAction,
} from '../../store/actions';
import {
  endpointDetailsDataSelector,
  endpointDetailsLoadingSelector,
  endpointDetailsErrorSelector,
} from '../../store/selectors';

@Component({
  selector: 'api-assistant-edit-endpoints-host',
  standalone: true,
  imports: [
    CommonModule,
    EndpointsFormComponent,
    RouterModule,
    SwButtonComponent,
  ],
  templateUrl: './edit-endpoints-host.component.html',
  styleUrls: ['./edit-endpoints-host.component.scss'],
})
export class EditEndpointsHostComponent implements AfterViewInit, OnDestroy {
  private readonly endpoint$: Observable<CanBeNull<Endpoint>> =
    this.store.select(endpointDetailsDataSelector);

  protected readonly isLoading$: Observable<boolean> = this.store.select(
    endpointDetailsLoadingSelector
  );

  protected readonly error$: Observable<string> = this.store.select(
    endpointDetailsErrorSelector
  );

  protected readonly endpointsFormValue$: Observable<
    CanBeNull<EndpointFormValue>
  > = this.endpoint$.pipe(
    map((endpoint: CanBeNull<Endpoint>) => {
      if (!endpoint) {
        return null;
      }
      const formValue: EndpointFormValue = {
        name: endpoint.name,
        description: endpoint.description,
        url: endpoint.url,
        response: endpoint.response,
        body: endpoint.crud,
        validations: endpoint.validations,
        method: endpoint.method,
        isAuthenticated: endpoint.isAuthenticated,
      };
      return formValue;
    })
  );

  constructor(
    private readonly store: Store<AppState>,
    private readonly activatedRoute: ActivatedRoute,
    private readonly storeActionDispatcher: StoreActionDispatcher,
    private readonly router: Router
  ) {}

  protected readonly updateInProgress$ = new BehaviorSubject(false);

  private get applicationId(): string {
    return this.activatedRoute.parent?.snapshot.params['applicationId'];
  }

  private get endpointId(): string {
    return this.activatedRoute.snapshot.params['endpointId'];
  }

  ngAfterViewInit(): void {
    this.store.dispatch(
      fetchEndpointDetailsAction({
        applicationId: this.applicationId,
        endpointId: this.endpointId,
      })
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetEndpointDetailsStateAction());
  }

  handleSaveEndpoint(value: EndpointFormValue) {
    this.storeActionDispatcher
      .dispatchAsyncAction(
        editEndpointAction({
          endpoint: {
            name: value.name,
            description: value.description,
            url: value.url,
            crud: value.body,
            response: value.response,
            validations: value.validations,
            method: value.method,
            isAuthenticated: value.isAuthenticated,
          },
          applicationId: this.applicationId,
          endpointId: this.endpointId,
        }),
        endpointUpdateSuccessAction,
        errorInUpdatingEndpointAction,
        this.updateInProgress$
      )
      .subscribe(({ endpoint }) => {
        this.router.navigate([
          'app',
          'applications',
          this.applicationId,
          'endpoints',
        ]);
      });
  }
}
