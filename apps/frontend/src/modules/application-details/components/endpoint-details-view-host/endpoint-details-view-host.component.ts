import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { CanBeNull, SwButtonComponent } from 'ngx-simple-widgets';
import {
  Endpoint,
  EndpointDetailViewComponent,
} from '@api-assistant/endpoints-fe';
import {
  endpointDetailsDataSelector,
  endpointDetailsErrorSelector,
  endpointDetailsLoadingSelector,
} from '../../store/selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/app.state';
import { ActivatedRoute, Router } from '@angular/router';
import {
  deleteEndpointAction,
  endpointDeletedAction,
  errorInDeletingEndpointAction,
  fetchEndpointDetails,
  resetEndpointDetailsState,
} from '../../store/actions';
import { StoreActionDispatcher } from '@api-assistant/commons-fe';

@Component({
  selector: 'api-assistant-endpoint-details-view-host',
  standalone: true,
  imports: [EndpointDetailViewComponent, AsyncPipe, SwButtonComponent, NgIf],
  templateUrl: './endpoint-details-view-host.component.html',
  styleUrls: ['./endpoint-details-view-host.component.scss'],
})
export class EndpointDetailsViewHostComponent {
  protected readonly endpoint$: Observable<CanBeNull<Endpoint>> =
    this.store.select(endpointDetailsDataSelector);

  protected readonly isLoading$: Observable<boolean> = this.store.select(
    endpointDetailsLoadingSelector
  );

  protected readonly error$: Observable<string> = this.store.select(
    endpointDetailsErrorSelector
  );

  public readonly deleteEndpointInProgress$ = new BehaviorSubject(false);

  constructor(
    private readonly store: Store<AppState>,
    private readonly activatedRoute: ActivatedRoute,
    private readonly actionsDispacher: StoreActionDispatcher,
    private readonly router: Router
  ) {}

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

  protected handleDelete() {
    this.actionsDispacher
      .dispatchAsyncAction(
        deleteEndpointAction({
          endpointId: this.endpointId,
          applicationId: this.applicationId,
        }),
        endpointDeletedAction,
        errorInDeletingEndpointAction,
        this.deleteEndpointInProgress$
      )
      .subscribe(() => {
        this.router.navigate([
          'app',
          'applications',
          this.applicationId,
          'endpoints',
        ]);
      });
  }

  protected handleEnableEdit() {
    this.router.navigate([
      'app',
      'applications',
      this.applicationId,
      'endpoints',
      this.endpointId,
      'edit',
    ]);
  }
}
