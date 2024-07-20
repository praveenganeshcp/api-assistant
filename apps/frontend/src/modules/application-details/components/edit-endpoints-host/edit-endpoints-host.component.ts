import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, map } from 'rxjs';
import {
  Endpoint,
  EndpointFormValue,
  EndpointsFormComponent,
} from '@api-assistant/endpoints-fe';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/app.state';
import {
  endpointDetailsDataSelector,
  endpointDetailsErrorSelector,
  endpointDetailsLoadingSelector,
} from '../../store/selectors';
import { CanBeNull, SwButtonComponent } from 'ngx-simple-widgets';
import {
  editEndpointAction,
  endpointUpdateSuccessAction,
  errorInUpdatingEndpointAction,
  fetchEndpointDetails,
  resetEndpointDetailsState,
} from '../../store/actions';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StoreActionDispatcher } from '@api-assistant/commons-fe';

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
      fetchEndpointDetails({
        applicationId: this.applicationId,
        endpointId: this.endpointId,
      })
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetEndpointDetailsState());
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
