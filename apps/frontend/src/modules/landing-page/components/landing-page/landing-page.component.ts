import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/app.state';
import { SwButtonComponent, SwIconComponent } from 'ngx-simple-widgets';
import { AppInfoService } from '@api-assistant/commons-fe';
import { isUserLoggedInSelector } from '../../../accounts/store/selectors';
import { logoutAccountAction } from '../../../accounts/store/actions';

interface LandingPageFeatureCard {
  id: number;
  title: string;
  description: string;
  icon: string
}

@Component({
  selector: 'api-assistant-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, SwButtonComponent, SwIconComponent],
})
export class LandingPageComponent {
  /**
   * App name
   */
  public readonly appName: string = this.appInfoService.appName;

  /**
   * App caption
   */
  public readonly appCaption: string = this.appInfoService.appCaption;

  /**
   * Whether user is loggedin
   */
  public readonly isUserLoggedIn$: Observable<boolean> = this.store.select(
    isUserLoggedInSelector
  );

  /**
   * List of feature to be presented in card view
   */
  public readonly landingPageFeatures: LandingPageFeatureCard[] = [
    {
      id: 1,
      title: 'Declarative',
      description:
        'Define what your API achieves, not how it works',
        icon: 'bolt'
    },
    {
      id: 2,
      title: 'Welcome users at ease',
      description: 'Enable username-password authentication',
      icon: 'group'
    },
    {
      id: 3,
      title: 'Migrations',
      description:
        'Effortlessly manage database and schema changes',
      icon: 'database'
    },
    {
      id: 4,
      title: 'Cloud Code',
      description: 'Write custom logic for your API',
      icon: 'code'
    },
  ];

  constructor(
    private readonly store: Store<AppState>,
    private readonly appInfoService: AppInfoService
  ) {}

  /**
   * trackBy for features card
   */
  public trackFeatureCard(_: number, card: LandingPageFeatureCard): number {
    return card.id;
  }

  /**
   * Logout account
   */
  public logoutAccount() {
    this.store.dispatch(logoutAccountAction());
  }
}
