import { render } from '@testing-library/react';

import LandingPageHeader from './landing-page-header';
import { BrowserRouter } from 'react-router-dom';

describe('LandingPageHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <LandingPageHeader isUserLoggedIn={false} />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render link to dashboard if user logged in', async () => {
    const { findByTestId } = render(
      <BrowserRouter>
        <LandingPageHeader isUserLoggedIn={true} />
      </BrowserRouter>
    );
    const dashboardLinkElement = await findByTestId('header-dashboard-link');
    expect(dashboardLinkElement.getAttribute('href')).toBe('/app/dashboard');
    expect(dashboardLinkElement.textContent).toBe('Dashboard');
  });

  it('should render buttons to login and signup if user is not logged in', async () => {
    const { findByTestId } = render(
      <BrowserRouter>
        <LandingPageHeader isUserLoggedIn={false} />
      </BrowserRouter>
    );
    const loginBtn = await findByTestId('header-login-btn');
    expect(loginBtn.textContent).toBe('Login');

    const signupBtn = await findByTestId('header-signup-btn');
    expect(signupBtn.textContent).toBe('Create Account');
  });
});
