// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import { LoginPageObject } from "../page-objects/accounts/login.page-object";

// eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      login(): void;
      getByTestId<T extends HTMLElement>(
        testId: string
      ): Cypress.Chainable<JQuery<T>>;
      getElement<T extends HTMLElement>(
        selector: string
      ): Cypress.Chainable<JQuery<T>>;
    }
  }
}

//
// -- This is a parent command --
Cypress.Commands.add('login', () => {
  cy.intercept("POST", "/api/v6/accounts/login").as('loginAPI')
  const loginPageObject = new LoginPageObject();
  loginPageObject.visit();
  loginPageObject.typeEmailId(Cypress.env('emailId'));
  loginPageObject.typePassword(Cypress.env('password'));
  loginPageObject.submitLogin();
  cy.wait('@loginAPI');
});

Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`).should('be.visible');
});

Cypress.Commands.add('getElement', (selector: string) => {
  return cy.get(selector).should('be.visible');
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
