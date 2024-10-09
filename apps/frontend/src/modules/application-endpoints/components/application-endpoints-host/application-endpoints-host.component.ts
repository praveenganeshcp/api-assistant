import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import {
  EndpointsListViewComponent,
  MinimalEndpointInfo,
} from '@api-assistant/application-endpoints-fe';

import { AppState } from '../../../app/app.state';
import { SwButtonComponent } from 'ngx-simple-widgets';
import {
  allEndpointsDataSelector,
  allEndpointsLoadingSelector,
  allEndpointsErrorSelector,
} from '../../store/selectors';
import { fetchAllEndpointsAction } from '../../store/actions';

@Component({
  selector: 'api-assistant-application-endpoints-host',
  standalone: true,
  imports: [
    CommonModule,
    EndpointsListViewComponent,
    RouterModule,
    SwButtonComponent,
  ],
  templateUrl: './application-endpoints-host.component.html',
  styleUrls: ['./application-endpoints-host.component.scss'],
})
export class ApplicationEndpointsHostComponent implements OnInit {
  public readonly allEndpoints$: Observable<MinimalEndpointInfo[]> = this.store
    .select(allEndpointsDataSelector)
    .pipe(
      map((endpoints) => {
        if (endpoints === null || endpoints === undefined) {
          return [];
        }
        return endpoints;
      })
    );

  public readonly endpointsLoading$: Observable<boolean> = this.store.select(
    allEndpointsLoadingSelector
  );

  public readonly endpointsFetchError$: Observable<string> = this.store.select(
    allEndpointsErrorSelector
  );

  constructor(
    private readonly store: Store<AppState>,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  private get applicationId(): string {
    return this.activatedRoute.parent?.snapshot.params['applicationId'];
  }

  ngOnInit(): void {
    this.store.dispatch(
      fetchAllEndpointsAction({ applicationId: this.applicationId })
    );
  }

  public handleAddEndpoint() {
    this.router.navigate([
      'app',
      'applications',
      this.applicationId,
      'endpoints',
      'create',
    ]);
  }

  public handleEndpointDetailNavigation(endpoint: MinimalEndpointInfo) {
    this.router.navigate([
      'app',
      'applications',
      this.applicationId,
      'endpoints',
      endpoint._id,
      'edit',
    ]);
  }
}
