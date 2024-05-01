import { render } from '@testing-library/react';

import LandingPageFe from './landing-page-fe';

describe('LandingPageFe', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LandingPageFe />);
    expect(baseElement).toBeTruthy();
  });
});
