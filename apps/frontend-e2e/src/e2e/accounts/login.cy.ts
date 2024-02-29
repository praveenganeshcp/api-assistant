import { accountFixture } from '../../fixtures/account.fixture';
import { LoginPageObject } from '../../page-objects/accounts/login.page-object';

describe('Login page', () => {
  const loginPage = new LoginPageObject();

  beforeEach(() => {
    loginPage.visit();
  });

  describe('in mobile resolution', () => {
    beforeEach(() => {
      cy.setMobileResolution();
    });

    it('should not show banner', () => {
      loginPage.getLoginBanner().should('not.be.visible');
    });

    it('show app name in the header', () => {
      loginPage.getPageHeaderText().should('contain.text', 'API Assistant');
    });
  });

  describe('in tablet resolution', () => {
    beforeEach(() => {
      cy.setTabletResolution();
    });

    it('should not show banner', () => {
      loginPage.getLoginBanner().should('not.be.visible');
    });

    it('show app name in the header', () => {
      loginPage.getPageHeaderText().should('contain.text', 'API Assistant');
    });
  });

  describe('in desktop resolution', () => {
    beforeEach(() => {
      cy.setDesktopResolution();
    });

    it('should show banner', () => {
      loginPage.getLoginBanner().should('be.visible');
    });

    it('should show app name and caption in the banner', () => {
      loginPage.getAppNameInBanner().should('contain.text', 'API Assistant');
      loginPage
        .getAppCaptionInBanner()
        .should('contain.text', 'Declarative Backend for trivial apps');
    });

    it('show not show app name in the header', () => {
      loginPage.getPageHeaderText().should('not.be.visible');
    });
  });

  it('show login as header above the form', () => {
    loginPage.getFormHeader().should('contain.text', 'Login');
  });

  it('show show link to reset the password below password input', () => {
    loginPage
      .getResetPasswordLink()
      .should('contain.text', 'Forgot password?')
      .should('have.attr', 'href', '/accounts/forgot-password');
  });

  it('should show invalid email error message and login button in disabled state, when incorrect email format is entered', () => {
    loginPage.typeEmailId('invaliddata');
    loginPage.focusOutEmailIdField();
    loginPage
      .getEmailFieldErrorMessage()
      .should('contain.text', 'Enter valid email');
    loginPage.getLoginButton().should('be.disabled');
  });

  it('should show password not strong message and login button in disabled state, when weak password is entered', () => {
    loginPage.typePassword('invalid');
    loginPage.focusOutPasswordField();
    loginPage
      .getPasswordFieldErrorMessage()
      .should(
        'contain.text',
        'Password must contain 1 uppercase, 1 lowercase, 1 number and minimum 9 characters'
      );
    loginPage.getLoginButton().should('be.disabled');
  });

  it('should show login button in enabled state if the valid emailid and password is entered', () => {
    loginPage.typeEmailId('test@mail.com');
    loginPage.typePassword('AbcdefghI9;');
    loginPage.getLoginButton().should('be.enabled');
  });

  it('should show email or password is incorrect message in the banner when login fails', () => {
    cy.intercept('/api/v6/accounts/login').as('loginAPI');
    loginPage.typeEmailId('test@mail.com');
    loginPage.typePassword('AbcdefghI9;');
    loginPage.submitLogin();
    cy.wait('@loginAPI');
    loginPage
      .getAPIErrorMessage()
      .should('be.visible')
      .should('contain.text', 'EmailID or password is incorrect');
  });

  it('should navigate to dashboard screen by default after login is successful', () => {
    cy.intercept('/api/v6/accounts/login').as('loginAPI');
    loginPage.typeEmailId(Cypress.env('emailId'));
    loginPage.typePassword(Cypress.env('password'));
    loginPage.submitLogin();
    cy.wait('@loginAPI');
    cy.url().should('contain', '/app/projects');
  });

  it('should navigate to corresponding page using callback url after login is successful', () => {
    cy.visit('/app/projects/dummyprojectid');
    cy.url().should('contain', accountFixture.loginUrl);
    cy.intercept('/api/v6/accounts/login').as('loginAPI');
    loginPage.typeEmailId(Cypress.env('emailId'));
    loginPage.typePassword(Cypress.env('password'));
    loginPage.submitLogin();
    cy.wait('@loginAPI');
    cy.url().should('contain', '/app/projects/dummyprojectid');
  });

  it('should show nudge to create user account if account does not exist in the platform', () => {
    loginPage
      .getSignupNudge()
      .should('contain.text', 'New to API Assistant? Signup here');
    loginPage
      .getSignupNudgeLink()
      .should('contain.text', 'Signup here')
      .should('have.attr', 'href', accountFixture.signupUrl);
  });
});
