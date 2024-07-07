import { TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { AccountsService, SignupFormComponent, SignupFormData, UniqueEmailIdValidator } from '@api-assistant/auth-fe';
import { StoreActionDispatcher } from '@api-assistant/commons-fe';
import { of, throwError } from 'rxjs';
import { SwToastService } from 'ngx-simple-widgets';
import { render } from '@testing-library/angular';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MockProvider } from 'ng-mocks';

describe('SignupComponent', () => {

  const MOCK_SIGNUP_FORM_DATA: SignupFormData = { emailId: "test@mail.com", password: "Password1", username: "test" };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SignupComponent,
      ],
      providers: [
        {
          provide: StoreActionDispatcher,
          useValue: {
            dispatchAsyncAction: () => of({}),
          }
        },
        { provide: UniqueEmailIdValidator, useValue: {
            validate: () => {}
          } 
        },
        MockProvider(AccountsService),
        SwToastService
      ]
    }).compileComponents();
  });

  it('should create', async () => {
    const { fixture } = await render(SignupComponent);
    expect(fixture).toBeTruthy();
  });

  it('should have link to signup', async () => {
    const { getByRole } = await render(SignupComponent);
    expect(getByRole("link", {name: "login"}).getAttribute("href")).toBe('/accounts/login')
  })

  it('should call the signup component method when form data emitted from form', async () => {
    const { fixture } = await render(SignupComponent);
    const handleSignupSpy = jest.spyOn(fixture.componentInstance, "handleSignup");
    const signupFormComponent: SignupFormComponent  = fixture.debugElement.query(By.directive(SignupFormComponent)).componentInstance
    signupFormComponent.submitData.emit(MOCK_SIGNUP_FORM_DATA)
    expect(handleSignupSpy).toHaveBeenCalledWith(MOCK_SIGNUP_FORM_DATA)
  })

  it('should redirect to home page after signup is success', async () => {
    const { fixture } = await render(SignupComponent);
    const routerNavigateSpy = jest.spyOn(TestBed.inject(Router), "navigate");
    const signupFormComponent: SignupFormComponent  = fixture.debugElement.query(By.directive(SignupFormComponent)).componentInstance
    signupFormComponent.submitData.emit(MOCK_SIGNUP_FORM_DATA)
    expect(routerNavigateSpy).toHaveBeenCalledWith(["app", "projects"])
  })

  it('should error toast message when signup fails', async () => {
    const { fixture } = await render(SignupComponent, {
      providers: [
        {
          provide: StoreActionDispatcher,
          useValue: { dispatchAsyncAction: () => throwError(() => {}) }
        }
      ]
    })
    const errorToastSpy = jest.spyOn(TestBed.inject(SwToastService), "error");
    const signupFormComponent: SignupFormComponent  = fixture.debugElement.query(By.directive(SignupFormComponent)).componentInstance
    signupFormComponent.submitData.emit(MOCK_SIGNUP_FORM_DATA)
    expect(errorToastSpy).toHaveBeenCalledWith({"message": "Error in creating account"})
  })
});
