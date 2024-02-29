import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { SwButtonComponent, SwInputComponent } from 'ngx-simple-widgets';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { verifyAccountAction } from '@api-assistant/auth-fe';
import { isAccountBeingVerifiedSelector } from '@api-assistant/auth-fe';
import { AppState } from '../../../app/app.state';
import { AlertBannerComponent } from '../alert-banner/alert-banner.component';

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
      <h2 *ngIf="isAccountBeingVerified$ | async">
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
  public isAccountBeingVerified$: Observable<boolean> = this.store.select(
    isAccountBeingVerifiedSelector
  );

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit() {
    const verificationKey: string = this.route.snapshot.params['secret'];
    this.store.dispatch(verifyAccountAction({ key: verificationKey }));
  }
}
