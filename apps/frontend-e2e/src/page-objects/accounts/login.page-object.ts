import { accountFixture } from "../../fixtures/account.fixture";
import { PageObject } from "../../types";

export class LoginPageObject implements PageObject {
    public visit(): void {
        cy.visit(accountFixture.loginUrl);
    }

    public getPageHeaderText() {
        return cy.getElement('.account-routes-header').find('h1')
    }

    public getLoginBanner() {
        return cy.getElement('.accounts-shell__banner');
    }

    public getAppNameInBanner() {
        return this.getLoginBanner().find('h1');
    }

    public getFormHeader() {
        return cy.getVisibleElement('.login-form h2');
    }

    public getResetPasswordLink() {
        return cy.getVisibleElement('.login-form__password-field a');
    }

    public getAppCaptionInBanner() {
        return this.getLoginBanner().find('h6');
    }

    private getEmailIdField() {
        return cy.getVisibleElement('input[formControlName="emailId"]');
    }

    private getPasswordField() {
        return cy.getVisibleElement('input[formControlName="password"]');
    }

    public typeEmailId(emailId: string) {
        this.getEmailIdField().type(emailId)
    }

    public focusOutEmailIdField() {
        this.getEmailIdField().blur();
    }

    public typePassword(password: string) {
        this.getPasswordField().type(password)
    }

    public focusOutPasswordField() {
        this.getPasswordField().blur()
    }

    public getEmailFieldErrorMessage() {
        return cy.getVisibleElement('sw-form-control[label="Email ID"] span.sw-form-control__error-message');
    }

    public getPasswordFieldErrorMessage() {
        return cy.getVisibleElement('sw-form-control[label="Password"] span.sw-form-control__error-message');
    }

    public getLoginButton() {
        return cy.getVisibleElement('button[sw-primary-button]');
    }

    public submitLogin() {
        this.getLoginButton().click()
    }

    public getAPIErrorMessage() {
        return cy.getElement(".login-form__api-error");
    }

    public getSignupNudge() {
        return cy.getVisibleElementByTestId('signup-nudge');
    }

    public getSignupNudgeLink() {
        return cy.getVisibleElementByTestId('signup-nudge').find('a');
    }
    
}