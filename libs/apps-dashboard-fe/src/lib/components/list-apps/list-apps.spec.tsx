import { render } from '@testing-library/react';

import ListApps from './list-apps';

describe('ListApps', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ListApps />);
    expect(baseElement).toBeTruthy();
  });
});
