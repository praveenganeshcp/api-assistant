import { render } from '@testing-library/react';

import LandingPageHeader from './landing-page-header';

describe('LandingPageHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LandingPageHeader />);
    expect(baseElement).toBeTruthy();
  });
});
