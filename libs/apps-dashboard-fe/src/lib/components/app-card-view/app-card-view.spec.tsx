import { render } from '@testing-library/react';

import AppCardView from './app-card-view';

describe('AppCardView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppCardView />);
    expect(baseElement).toBeTruthy();
  });
});
