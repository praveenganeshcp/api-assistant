import { render } from '@testing-library/react';

import LandingPageFeatureCard from './landing-page-feature-card';

describe('LandingPageFeatureCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LandingPageFeatureCard />);
    expect(baseElement).toBeTruthy();
  });
});
