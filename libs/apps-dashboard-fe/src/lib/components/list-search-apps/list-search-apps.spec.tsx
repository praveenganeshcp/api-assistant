import { render } from '@testing-library/react';

import ListSearchApps from './list-search-apps';

describe('ListSearchApps', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ListSearchApps />);
    expect(baseElement).toBeTruthy();
  });
});
