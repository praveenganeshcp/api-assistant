import { render } from '@testing-library/react';

import AccountsShell from './accounts-shell';

describe('AccountsShell', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccountsShell />);
    expect(baseElement).toBeTruthy();
  });
});
