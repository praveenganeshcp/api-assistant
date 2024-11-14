import { Component, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  SwIconComponent,
  SwLoaderComponent,
  SwSidePanelMenuComponent,
  SwSidepanelMenuItem,
} from "ngx-simple-widgets";
import { ActivatedRoute, RouterModule } from "@angular/router";
import {
  Observable,
  Subject,
  filter,
  interval,
  map,
  startWith,
  takeUntil,
} from "rxjs";
import { AppState } from "../../../app/app.state";
import { BreakPointObserver } from "@api-assistant/commons-fe";
import { Store } from "@ngrx/store";
import {
  applicationDataErrorSelector,
  applicationDataLoadingSelector,
  applicationDataSelector,
} from "../../store/selectors";
import { ApplicationEndpointsHostComponent } from "../../../application-endpoints/components/application-endpoints-host/application-endpoints-host.component";
import { loadApplicationDetailsAction } from "../../store/actions";
import { fetchCloudCodeStatusAction } from "../../../application-cloud-code/store/actions";
import { processStateDataSelector } from "../../../application-cloud-code/store/selectors";

enum TabNames {
  ENDPOINTS = "Endpoints",
  SETTINGS = "Settings",
  DATABASE = "Database",
  MIGRATIONS = "Migrations",
  CLOUD_CODE = "Cloud code",
  LOGS = "Logs"
}

const routeUrlTabMapping: Record<TabNames, string> = {
  [TabNames.DATABASE]: "database",
  [TabNames.ENDPOINTS]: "endpoints",
  [TabNames.MIGRATIONS]: "migrations",
  [TabNames.SETTINGS]: "settings",
  [TabNames.CLOUD_CODE]: "cloud-code",
  [TabNames.LOGS]: "logs"
};

@Component({
  selector: "api-assistant-application-details-host",
  standalone: true,
  imports: [
    CommonModule,
    SwIconComponent,
    RouterModule,
    SwLoaderComponent,
    ApplicationEndpointsHostComponent,
    SwSidePanelMenuComponent,
  ],
  templateUrl: "./application-details-host.component.html",
  styleUrls: ["./application-details-host.component.scss"],
})
export class ApplicationDetailsHostComponent implements OnDestroy {
  protected readonly sidepanelMenuItems: SwSidepanelMenuItem[] = [
    {
      label: TabNames.ENDPOINTS,
      url: `/app/applications/${this.applicationId}/${
        routeUrlTabMapping[TabNames.ENDPOINTS]
      }`,
      icon: "link",
    },
    {
      label: TabNames.DATABASE,
      url: `/app/applications/${this.applicationId}/${
        routeUrlTabMapping[TabNames.DATABASE]
      }`,
      icon: "database",
    },
    {
      label: TabNames.CLOUD_CODE,
      url: `/app/applications/${this.applicationId}/${
        routeUrlTabMapping[TabNames.CLOUD_CODE]
      }`,
      icon: "folder_code",
    },
    {
      label: TabNames.MIGRATIONS,
      url: `/app/applications/${this.applicationId}/${
        routeUrlTabMapping[TabNames.MIGRATIONS]
      }`,
      icon: "table_edit",
    },
    {
      label: TabNames.LOGS,
      url: `/app/applications/${this.applicationId}/${
        routeUrlTabMapping[TabNames.LOGS]
      }`,
      icon: "contract",
    },
    {
      label: TabNames.SETTINGS,
      url: `/app/applications/${this.applicationId}/${
        routeUrlTabMapping[TabNames.SETTINGS]
      }`,
      icon: "settings",
    },
   
  ];

  private readonly destroy$ = new Subject();

  public readonly loading$ = this.store.select(applicationDataLoadingSelector);

  public readonly loadingError$ = this.store.select(
    applicationDataErrorSelector
  );

  public readonly applicationName$: Observable<string> = this.store
    .select(applicationDataSelector)
    .pipe(
      filter((applicationData) => !!applicationData),
      map((applicationData) => applicationData?.name ?? "")
    );

  public readonly cloudCodeStatus$ = this.store.select(
    processStateDataSelector
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakPointObserver,
    private store: Store<AppState>
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }

  ngOnInit() {
    this.store.dispatch(
      loadApplicationDetailsAction({ applicationId: this.applicationId })
    );
    interval(5000)
      .pipe(startWith(0), takeUntil(this.destroy$))
      .subscribe(() => {
        this.store.dispatch(
          fetchCloudCodeStatusAction({ applicationId: this.applicationId })
        );
      });
  }

  public get applicationId(): string {
    return this.activatedRoute.snapshot.params["applicationId"];
  }

  public isDesktopScreen$ = this.breakpointObserver.isDesktopScreen$;
}
