import { render } from '@testing-library/react';
import { TestSetupProvider } from '../../../../test-setup/TestSetupProvider';
import { LandingPage } from './landing-page';

describe('LandingPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TestSetupProvider>
        <LandingPage />
      </TestSetupProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
