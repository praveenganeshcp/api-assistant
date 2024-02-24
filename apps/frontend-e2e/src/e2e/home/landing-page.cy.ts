import { accountFixture } from '../../fixtures/account.fixture';
import { commonFixture } from '../../fixtures/common.fixture';
import { LandingPageObject } from '../../page-objects/home/landing-page.page-object';

describe('landing page', () => {
  const landingPage = new LandingPageObject();

  beforeEach(() => {
    landingPage.visit();
  });

  it('should show app name and caption in banner', () => {
    landingPage.getAppNameInBanner().should('have.text', commonFixture.appName);
    landingPage
      .getAppCaptionInBanner()
      .should('have.text', commonFixture.appCaption);
  });

  it('should show login and signup links in the header if user is not authenticated', () => {
    landingPage
      .getLoginLinkInHeader()
      .should('have.text', 'Login')
      .should('have.attr', 'href', accountFixture.loginUrl);

    landingPage
      .getSignupLinkInHeader()
      .should('have.text', 'Signup')
      .should('have.attr', 'href', accountFixture.signupUrl);
  });

  it('should show feature cards', () => {
    landingPage.getFeatureCards().should('have.length', 4);
  });

  it('should show nudge in the footer to create account if user is not authenticated', () => {
    landingPage
      .getFooterText()
      .should(
        'contain.text',
        'Want to build application with API Assistant? Signup here'
      );
    landingPage
      .getFooterNudgeLink()
      .should('have.text', 'Signup here')
      .should('have.attr', 'href', accountFixture.signupUrl);
  });

  
});
