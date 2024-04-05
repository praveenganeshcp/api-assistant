import { render } from '@testing-library/react';

import LandingPageFooter from './landing-page-footer';
import { BrowserRouter } from 'react-router-dom';

describe('LandingPageFooter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <LandingPageFooter isUserLoggedIn={false} />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render signup link if user is not logged in', async () => {
    const { findByTestId } = await render(
      <BrowserRouter>
        <LandingPageFooter isUserLoggedIn={false} />
      </BrowserRouter>
    );
    expect((await findByTestId('footer-signup-link')).textContent).toBe(
      'Want to try API Assistant? Signup here'
    );
  });

  it('should render dashboard link if user logged in', async () => {
    const { findByTestId } = await render(
      <BrowserRouter>
        <LandingPageFooter isUserLoggedIn={true} />
      </BrowserRouter>
    );
    expect((await findByTestId('footer-dashboard-link')).textContent).toContain(
      'Navigate to Dashboard and manage your applications at ease'
    );
  });
});
