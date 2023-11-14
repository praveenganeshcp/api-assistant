describe('login page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.landing-page__header a:last-child').click();
  });

  function getEmailIdField() {
    return cy.get('input[type="email"]');
  }

  function getPasswordField() {
    return cy.get('input[type="password"]');
  }

  it('should show login button in disabled in initial state', () => {
    cy.get('button[sw-primary-button').should('have.attr', 'disabled');
  });

  it('should render two inputs to enter emailId and password', () => {
    cy.get('input').should('have.length', 2);
  });

  it('should show emailId field as required when input is touched', () => {
    getEmailIdField().click();
    cy.get('form').click();
    cy.get('.form-control .form-control__error-message').should(
      'have.text',
      'This is a required field'
    );
  });

  it('should show password field is required when input is touched', () => {
    getPasswordField().click();
    cy.get('form').click();
    cy.get('.form-control .form-control__error-message').should(
      'have.text',
      'This is a required field'
    );
  });

  it('should show error message when invalid emailId is entered and touched', () => {
    getEmailIdField().type('test');
    cy.get('form').click();
    cy.get('.form-control .form-control__error-message').should(
      'have.text',
      'Enter valid email'
    );
  });

  it('should show error message when invalid password is entered and touched', () => {
    getPasswordField().type('test');
    cy.get('form').click();
    cy.get('.form-control .form-control__error-message').should(
      'have.text',
      'Password must contain atleast 1 uppercase, 1 lowercase and 1 number'
    );
  });

  it('should enable login button for valid inputs', () => {
    getEmailIdField().type('praveen@yopmail.com');
    getPasswordField().type('Praveen321;');
    cy.get('button[sw-primary-button').should('not.have.attr', 'disabled');
  });

  it('should show login error message if invalid emailid or password is submitted', () => {
    getEmailIdField().type('praveen@yopmail.com');
    getPasswordField().type('Praveen321;');
    cy.get('button[sw-primary-button').click();
    cy.get('api-assistant-alert-banner h4').should(
      'have.text',
      'EmailID and password does not match'
    );
  });

  it('should provide link to reset password', () => {
    cy.get('.login__forgot-password a')
      .should('have.text', 'Forgot password?')
      .should('have.attr', 'href', '/accounts/forgot-password');
  });

  it('should provide to signup in the footer', () => {
    cy.get('.login > span > a')
      .should('have.text', 'Signup here')
      .should('have.attr', 'href', '/accounts/signup');
  });
});
