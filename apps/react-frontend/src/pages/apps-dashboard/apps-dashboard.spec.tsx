import { render } from '@testing-library/react';

import AppsDashboard from './apps-dashboard';

describe('AppsDashboard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppsDashboard />);
    expect(baseElement).toBeTruthy();
  });
});
