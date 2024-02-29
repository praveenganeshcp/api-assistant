import { PageObject } from '../../types';

export class LandingPageObject implements PageObject {
  public visit() {
    cy.visit('/');
  }

  private getBanner() {
    return cy.getVisibleElement('.landing-page__banner');
  }

  public getAppNameInBanner() {
    return this.getBanner().find('h1');
  }

  public getAppCaptionInBanner() {
    return this.getBanner().find('h4');
  }

  public getLoginLinkInHeader() {
    return cy.getVisibleElementByTestId('login-link');
  }

  public getDashboardLinkInHeader() {
    return cy.getVisibleElementByTestId('go-to-app-link');
  }

  public getLogoutButtonInHeader() {
    return cy.getVisibleElement(
      '.landing-page__header button[sw-primary-button]'
    );
  }

  public getSignupLinkInHeader() {
    return cy.getVisibleElementByTestId('signup-link');
  }

  public getFooterText() {
    return cy.getVisibleElement('.landing_page__footer span');
  }

  public getFooterNudgeLink() {
    return cy.getVisibleElement('.landing_page__footer a');
  }

  public getFeatureCards() {
    return cy.getVisibleElement('.landing-page__feature-card');
  }
}
