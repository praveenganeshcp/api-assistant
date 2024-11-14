import { Component, inject } from "@angular/core";
import { SwButtonComponent } from "ngx-simple-widgets";
import { BehaviorSubject } from "rxjs";
import { StoreActionDispatcher } from "@api-assistant/commons-fe";
import { ActivatedRoute, Router } from "@angular/router";
import { applicationDeletedAction, deleteApplicationAction, errorInDeletingApplicationAction } from "../../../application-details/store/actions";
import { AsyncPipe, NgIf } from "@angular/common";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app/app.state";
import { applicationAPIKeySelector } from "../../../application-details/store/selectors";

@Component({
  selector: "api-assistant-application-settings-host",
  standalone: true,
  imports: [SwButtonComponent, AsyncPipe, NgIf],
  templateUrl: "./application-settings-host.component.html",
  styleUrls: ["./application-settings-host.component.scss"],
})
export class ApplicationSettingsHostComponent {
  protected readonly deleteAppInProgress$ = new BehaviorSubject(false);

  private readonly actionDispatcher = inject(StoreActionDispatcher);

  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly store: Store<AppState> = inject(Store);

  protected readonly appAPIKey$ = this.store.select(applicationAPIKeySelector)

  private readonly router = inject(Router);

  public get applicationId(): string {
    return this.activatedRoute.parent?.snapshot.params["applicationId"];
  }

  protected handleDelete() {
    this.actionDispatcher.dispatchAsyncAction(
      deleteApplicationAction({ applicationId: this.applicationId }),
      applicationDeletedAction,
      errorInDeletingApplicationAction,
      this.deleteAppInProgress$
    ).subscribe({
      next: () => {
        this.router.navigate(['app', 'applications'])
      }
    })
  }

  protected handleAPIKeyCopy(apiKey: string) {
    navigator.clipboard.writeText(apiKey);
  }
}
