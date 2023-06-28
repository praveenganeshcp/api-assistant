import { render } from '@testing-library/react';

import ReactUiKit from './react-ui-kit';

describe('ReactUiKit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactUiKit />);
    expect(baseElement).toBeTruthy();
  });
});
