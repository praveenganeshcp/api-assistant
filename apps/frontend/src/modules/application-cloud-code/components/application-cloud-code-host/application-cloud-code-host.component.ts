import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloudCodeEditorComponent, CloudCodeFunctionsListComponent } from '@api-assistant/application-cloud-code-fe';
import { CanBeNull, SwButtonComponent } from 'ngx-simple-widgets';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/app.state';
import { errorInFetchingHandlerCodeAction, errorInUpdatingHandlerCodeAction, fetchAllRequestHandlersAction, fetchRequestHandlerCodeAction, requestHandlerCodeFetchedAction, requestHandlerCodeUpdatedAction, updateRequestHandlerCodeAction } from '../../store/actions';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { requestHandlersDataSelector } from '../../store/selectors';
import { StoreActionDispatcher } from '@api-assistant/commons-fe';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'api-assistant-application-cloud-code-host',
  standalone: true,
  imports: [CommonModule, SwButtonComponent, CloudCodeFunctionsListComponent, CloudCodeEditorComponent, ReactiveFormsModule],
  templateUrl: './application-cloud-code-host.component.html',
  styleUrls: ['./application-cloud-code-host.component.scss'],
})
export class ApplicationCloudCodeHostComponent implements OnInit {

  private readonly store: Store<AppState> = inject(Store);

  private readonly actionDispatcher = inject(StoreActionDispatcher);

  private readonly handlerCodeLoading$ = new BehaviorSubject(false);

  private readonly handlerCodeDeploying$ = new BehaviorSubject(false);

  protected selectedHandler: string = '';

  protected readonly requestHandlers$: Observable<CanBeNull<string[]>> = this.store.select(requestHandlersDataSelector);

  private readonly activatedRoute = inject(ActivatedRoute);

  protected readonly handlerCodeControl = new FormControl();

  private get applicationId(): string {
    return this.activatedRoute.parent?.snapshot.params['applicationId'];
  }

  ngOnInit(): void {
    this.store.dispatch(fetchAllRequestHandlersAction({
      applicationId: this.applicationId
    }))
    this.handlerCodeControl.valueChanges.subscribe(console.log)
  }

  handleFileSelection(fileName: string) {
    this.selectedHandler = fileName;
    this.actionDispatcher.dispatchAsyncAction(
      fetchRequestHandlerCodeAction({
        applicationId: this.applicationId,
        fileName
      }),
      requestHandlerCodeFetchedAction,
      errorInFetchingHandlerCodeAction,
      this.handlerCodeLoading$
    ).subscribe({
      next: (response) => {
        this.handlerCodeControl.setValue(response.code);
      }
    })
  }

  updateHandlerCode() {
    this.actionDispatcher.dispatchAsyncAction(
      updateRequestHandlerCodeAction({
        applicationId: this.applicationId,
        fileName: this.selectedHandler,
        code: this.handlerCodeControl.value
      }),
      requestHandlerCodeUpdatedAction,
      errorInUpdatingHandlerCodeAction,
      this.handlerCodeDeploying$
    ).subscribe();
  }
}
