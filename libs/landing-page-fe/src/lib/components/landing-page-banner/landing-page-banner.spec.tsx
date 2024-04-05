import { render } from '@testing-library/react';

import LandingPageBanner from './landing-page-banner';

describe('LandingPageBanner', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LandingPageBanner />);
    expect(baseElement).toBeTruthy();
  });
});
