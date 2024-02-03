import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  isUserLoggingOutSelector,
  isUserLoggedInSelector,
} from '../../../accounts/store/selectors';
import { logoutAccount } from '../../../accounts/store/actions';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/app.state';
import { SwButtonComponent } from 'ngx-simple-widgets';

interface LandingPageFeatureCard {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'api-assistant-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, SwButtonComponent],
})
export class LandingPageComponent {
  constructor(private store: Store<AppState>) {}

  public readonly isUserLoggedIn$: Observable<boolean> = this.store.select(
    isUserLoggedInSelector
  );

  public readonly isUserloggingOut$: Observable<boolean> = this.store.select(
    isUserLoggingOutSelector
  );

  public readonly landingPageFeatures: LandingPageFeatureCard[] = [
    {
      id: 1,
      title: 'Queries on Frontend',
      description:
        'Write queries in frontend and API Assistant executes it for you',
    },
    {
      id: 2,
      title: 'Welcome users at ease',
      description: 'Integrate username-password authentication in minutes',
    },
    {
      id: 3,
      title: 'Upload files',
      description:
        'Store user uploaded files without worrying about infrastructure',
    },
    {
      id: 4,
      title: 'Clean and intutive UI',
      description: 'Explore your data and files with simple and smooth UI',
    },
  ];

  public trackFeatureCard(_: number, card: LandingPageFeatureCard): number {
    return card.id;
  }

  public logoutAccount() {
    this.store.dispatch(logoutAccount());
  }
}
