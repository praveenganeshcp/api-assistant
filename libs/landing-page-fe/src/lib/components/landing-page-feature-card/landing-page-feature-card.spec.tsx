import { render } from '@testing-library/react';

import LandingPageFeatureCard from './landing-page-feature-card';

describe('LandingPageFeatureCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <LandingPageFeatureCard
        icon={<span>Hello</span>}
        title="Title"
        description="description"
      />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render the icon, title and description', async () => {
    const { findByTestId, findByText } = render(
      <LandingPageFeatureCard
        icon={<span>Hello</span>}
        title="Title"
        description="description"
      />
    );
    expect((await findByTestId('feature-title')).textContent).toBe('Title');
    expect((await findByTestId('feature-description')).textContent).toBe(
      'description'
    );
    expect(await findByText('Hello')).toBeDefined();
  });
});
