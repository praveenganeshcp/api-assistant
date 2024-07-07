import { TestBed } from '@angular/core/testing';
import { LandingPageComponent } from './landing-page.component';
import { Store } from '@ngrx/store';
import { MockProvider } from 'ng-mocks';
import { ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { render } from '@testing-library/angular';
import { AppInfoService } from '@api-assistant/commons-fe';
import { provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../../app/app.state';
import { UserProfile } from '@api-assistant/auth-fe';
import { logoutAccountAction } from '../../../accounts/store/actions';

describe('LandingPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageComponent, NoopAnimationsModule],
      providers: [MockProvider(Store), MockProvider(ActivatedRoute)],
    });
  });

  it('should create', async () => {
    const { fixture } = await render(LandingPageComponent);
    expect(fixture).toBeDefined();
  });

  it('should render app name and caption in banner', async () => {
    const { getByRole } = await render(LandingPageComponent);
    const appInfoService = TestBed.inject(AppInfoService);
    const appNameElement = getByRole('heading', { name: 'app-name' });
    const appCaptionElement = getByRole('heading', { name: 'app-caption' });
    expect(appNameElement.textContent).toBe(appInfoService.appName);
    expect(appCaptionElement.textContent).toBe(appInfoService.appCaption);
  });

  it('should show link to how it works page', async () => {
    const { getByRole } = await render(LandingPageComponent);
    const seeHowItWorksLink = getByRole('link', {
      name: 'see-how-it-works',
    });
    expect(seeHowItWorksLink).toHaveTextContent('See How it works');
    expect(seeHowItWorksLink).toHaveAttribute('href', '/how-it-works');
  });

  it('should render features card', async () => {
    const { getAllByRole } = await render(LandingPageComponent);
    const featureNameElements = getAllByRole('heading', {
      name: 'feature-name',
    });
    const featureDescriptionElements = getAllByRole('text', {
      name: 'feature-description',
    });
    expect(featureNameElements.length).toBe(4);
    expect(featureDescriptionElements.length).toBe(4);

    expect(featureNameElements[0]).toHaveTextContent('Queries on Frontend');
    expect(featureDescriptionElements[0]).toHaveTextContent(
      'Write queries in frontend and API Assistant executes it for you'
    );

    expect(featureNameElements[1]).toHaveTextContent('Welcome users at ease');
    expect(featureDescriptionElements[1]).toHaveTextContent(
      'Integrate username-password authentication in minutes'
    );

    expect(featureNameElements[2]).toHaveTextContent('Upload files');
    expect(featureDescriptionElements[2]).toHaveTextContent(
      'Store user uploaded files without worrying about infrastructure'
    );

    expect(featureNameElements[3]).toHaveTextContent('Clean and intutive UI');
    expect(featureDescriptionElements[3]).toHaveTextContent(
      'Explore your data and files with simple and smooth UI'
    );
  });

  describe('in authenticated state', () => {
    it('should show link to dashboard in the header', async () => {
      const { getByRole } = await render(LandingPageComponent, {
        providers: [
          provideMockStore<Partial<AppState>>({
            initialState: {
              profile: { isLoading: false, data: {} as UserProfile, error: '' },
            },
          }),
        ],
      });
      const goToAppLink = getByRole('link', {
        name: 'go-to-app',
      });
      expect(goToAppLink).toHaveTextContent('Go to app');
      expect(goToAppLink).toHaveAttribute('href', '/app/projects');
    });

    it('should show logout button in the header', async () => {
      const { getByRole } = await render(LandingPageComponent, {
        providers: [
          provideMockStore<Partial<AppState>>({
            initialState: {
              profile: { isLoading: false, data: {} as UserProfile, error: '' },
            },
          }),
        ],
      });
      const logoutButton = getByRole('button', {
        name: 'logout',
      });
      expect(logoutButton).toHaveTextContent('Logout');
    });

    it('should dispatch logout action when logout button is clicked', async () => {
      const { getByRole } = await render(LandingPageComponent, {
        providers: [
          provideMockStore<Partial<AppState>>({
            initialState: {
              profile: { isLoading: false, data: {} as UserProfile, error: '' },
            },
          }),
        ],
      });
      const dispatchSpy = jest.spyOn(TestBed.inject(Store), 'dispatch');
      const logoutButton = getByRole('button', {
        name: 'logout',
      });
      logoutButton.click();
      expect(dispatchSpy).toHaveBeenCalledWith(logoutAccountAction());
    });

    it('should render link to dashboard in the footer', async () => {
      const { getByRole } = await render(LandingPageComponent, {
        providers: [
          provideMockStore<Partial<AppState>>({
            initialState: {
              profile: { isLoading: false, data: {} as UserProfile, error: '' },
            },
          }),
        ],
      });
      const goToAppLink = getByRole('link', {
        name: 'go-to-app-from-footer',
      });
      expect(goToAppLink).toHaveTextContent(
        TestBed.inject(AppInfoService).appName
      );
      expect(goToAppLink).toHaveAttribute('href', '/app/projects');
    });
  });

  describe('in anonymous state', () => {
    it('should render links to signup and signin in the header', async () => {
      const { getByRole } = await render(LandingPageComponent, {
        providers: [
          provideMockStore<Partial<AppState>>({
            initialState: {
              profile: { isLoading: false, data: null, error: '' },
            },
          }),
        ],
      });
      const signupLink = getByRole('link', {
        name: 'signup',
      });
      const loginLink = getByRole('link', {
        name: 'login',
      });
      expect(signupLink).toHaveTextContent('Signup');
      expect(signupLink).toHaveAttribute('href', '/accounts/signup');
      expect(loginLink).toHaveTextContent('Login');
      expect(loginLink).toHaveAttribute('href', '/accounts/login');
    });

    it('should render link to signup in the footer', async () => {
      const { getByRole } = await render(LandingPageComponent, {
        providers: [
          provideMockStore<Partial<AppState>>({
            initialState: {
              profile: { isLoading: false, data: null, error: '' },
            },
          }),
        ],
      });
      const signupLink = getByRole('link', {
        name: 'signup-from-footer',
      });
      expect(signupLink).toHaveTextContent('Signup');
      expect(signupLink).toHaveAttribute('href', '/accounts/signup');
    });
  });
});
