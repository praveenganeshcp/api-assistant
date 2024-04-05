import { render } from '@testing-library/react';

import LandingPageBanner from './landing-page-banner';

describe('LandingPageBanner', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LandingPageBanner />);
    expect(baseElement).toBeTruthy();
  });

  it('should show app name and caption in the banner', async () => {
    const { findByTestId } = render(<LandingPageBanner />);
    const appHeadingElement = await findByTestId('banner-app-name');
    expect(appHeadingElement.textContent).toBe('API Assistant');

    const appCaptionElement = await findByTestId('banner-app-caption');
    expect(appCaptionElement.textContent).toBe(
      'Declarative backend for trivial apps'
    );
  });
});
