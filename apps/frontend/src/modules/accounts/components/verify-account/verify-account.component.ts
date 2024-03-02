import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { SwButtonComponent, SwInputComponent, SwToastService } from 'ngx-simple-widgets';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { verifyAccountAction, verifyAccountErrorAction, verifyAccountSuccessAction } from '@api-assistant/auth-fe';
import { AppState } from '../../../app/app.state';
import { AlertBannerComponent } from '../alert-banner/alert-banner.component';
import { StoreWrapper } from '../../../commons/StoreWrapper';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'api-assistant-verify-account',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .verify-account {
        width: 100%;
        height: 90%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
      }
    `,
  ],
  template: `
    <div class="verify-account">
      <h2 *ngIf="loading$ | async">
        Verifying account. Please wait...
      </h2>
    </div>
  `,
  standalone: true,
  imports: [
    CommonModule,
    SwInputComponent,
    SwButtonComponent,
    AlertBannerComponent,
  ],
})
export class VerifyAccountComponent implements OnInit {

  public loading$ = new BehaviorSubject(false);

  constructor(
    private route: ActivatedRoute,
    private storeWrapper: StoreWrapper,
    private router: Router,
    private toastService: SwToastService
  ) {}

  ngOnInit() {
    const verificationKey: string = this.route.snapshot.params['secret'];
    this.storeWrapper.dispatchAsyncAction(
      verifyAccountAction({ key: verificationKey }),
      verifyAccountSuccessAction,
      verifyAccountErrorAction,
      this.loading$
    ).subscribe({
      next: () => {
        this.router.navigate(['app', 'projects']);
      },
      error: (err: ReturnType<typeof verifyAccountErrorAction>) => {
        this.toastService.warn({
          title: "Account verification",
          message: err.error
        });
        this.router.navigate(['accounts', 'login']);
      }
    })
  }
}
