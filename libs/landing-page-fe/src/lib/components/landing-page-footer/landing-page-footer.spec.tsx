import { render } from '@testing-library/react';

import LandingPageFooter from './landing-page-footer';

describe('LandingPageFooter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LandingPageFooter />);
    expect(baseElement).toBeTruthy();
  });
});
