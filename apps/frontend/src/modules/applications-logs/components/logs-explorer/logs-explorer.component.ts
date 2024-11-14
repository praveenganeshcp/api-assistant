import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreActionDispatcher } from "@api-assistant/commons-fe";
import { BehaviorSubject, interval, startWith, Subject, switchMap, takeUntil } from "rxjs";
import { applicationLogsFetchedAction, errorInFetchingApplicationLogsAction, fetchApplicationLogsAction } from "../../store/actions";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "api-assistant-logs-explorer",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./logs-explorer.component.html",
  styleUrls: ["./logs-explorer.component.scss"],
})
export class LogsExplorerComponent implements OnInit, OnDestroy {

  private readonly actionDispatcher = inject(StoreActionDispatcher);

  protected logs: string[] = [];

  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly loading$ = new BehaviorSubject(false);

  private readonly destroy$ = new Subject<void>();

  private get applicationId(): string {
    return this.activatedRoute.parent?.snapshot.params["applicationId"];
  }

  ngOnDestroy(): void {
      this.destroy$.next();
  }

  ngOnInit(): void {
      interval(5000).pipe(
        startWith(0),
        takeUntil(this.destroy$),
        switchMap(() => {
          return this.actionDispatcher.dispatchAsyncAction(
            fetchApplicationLogsAction({ applicationId: this.applicationId }),
            applicationLogsFetchedAction,
            errorInFetchingApplicationLogsAction,
            this.loading$
          )
        })
      ).subscribe({
        next: (response) => {
          this.logs = response.logs.split('\n').reverse();
        }
      })
  }

}
