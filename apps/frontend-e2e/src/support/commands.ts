// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import { LoginPageObject } from '../page-objects/accounts/login.page-object';

// eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      // Command to login
      login(): void;

      // Returns visible element using test-id if present in DOM.
      getVisibleElementByTestId<T extends HTMLElement>(
        testId: string
      ): Cypress.Chainable<JQuery<T>>;

      // Returns visible element using selector if present in DOM.
      getVisibleElement<T extends HTMLElement>(
        selector: string
      ): Cypress.Chainable<JQuery<T>>;

      // Returns element using test-id if present in DOM.
      getElementByTestId<T extends HTMLElement>(
        testId: string
      ): Cypress.Chainable<JQuery<T>>;

      // Returns element using selector if present in DOM.
      getElement<T extends HTMLElement>(
        selector: string
      ): Cypress.Chainable<JQuery<T>>;

      setMobileResolution(): void;

      setTabletResolution(): void;

      setDesktopResolution(): void;
    }
  }
}

//
// -- This is a parent command --
Cypress.Commands.add('login', () => {
  cy.intercept('POST', '/api/v6/accounts/login').as('loginAPI');
  const loginPageObject = new LoginPageObject();
  loginPageObject.visit();
  loginPageObject.typeEmailId(Cypress.env('emailId'));
  loginPageObject.typePassword(Cypress.env('password'));
  loginPageObject.submitLogin();
  cy.wait('@loginAPI');
});

Cypress.Commands.add('getVisibleElementByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`).should('be.visible');
});

Cypress.Commands.add('getVisibleElement', (selector: string) => {
  return cy.get(selector).should('be.visible');
});

Cypress.Commands.add('getElementByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('getElement', (selector: string) => {
  return cy.get(selector);
});

Cypress.Commands.add('setDesktopResolution', () => {
  cy.viewport('macbook-13');
});

Cypress.Commands.add('setMobileResolution', () => {
  cy.viewport('samsung-s10');
});

Cypress.Commands.add('setTabletResolution', () => {
  cy.viewport('ipad-2');
});

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
