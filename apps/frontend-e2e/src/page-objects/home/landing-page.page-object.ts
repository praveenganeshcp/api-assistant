import { PageObject } from '../../types';

export class LandingPageObject implements PageObject {
  public visit() {
    cy.visit('/');
  }

  private getBanner() {
    return cy.getElement('.landing-page__banner');
  }

  public getAppNameInBanner() {
    return this.getBanner().find('h1');
  }

  public getAppCaptionInBanner() {
    return this.getBanner().find('h4');
  }

  public getLoginLinkInHeader() {
    return cy.getByTestId('login-link');
  }

  public getSignupLinkInHeader() {
    return cy.getByTestId('signup-link');
  }

  public getFooterText() {
    return cy.getElement('.landing_page__footer span');
  }

  public getFooterNudgeLink() {
    return cy.getElement('.landing_page__footer a');
  }

  public getFeatureCards() {
    return cy.get('.landing-page__feature-card');
  }
}
