import { TestBed } from '@angular/core/testing';
import { render } from '@testing-library/angular';
import { StoreActionDispatcher } from '@api-assistant/commons-fe';
import { By } from '@angular/platform-browser';
import { ForgotPasswordFormComponent } from '@api-assistant/auth-fe';
import { of, throwError } from 'rxjs';
import { SwToastService } from 'ngx-simple-widgets';
import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {

  const MOCK_FORGOT_PASSWORD_EMAIL_ID: string = "test@mail.com";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordComponent],
      providers: [
        {
          provide: StoreActionDispatcher,
          useValue: {
            dispatchAsyncAction: () => of({}),
          }
        },
        SwToastService
      ]
    }).compileComponents();
  });

  it('should create', async () => {
    const { fixture } = await render(ForgotPasswordComponent);
    expect(fixture).toBeTruthy();
  });

  it('should have link for login', async () => {
    const { getByRole } = await render(ForgotPasswordComponent);
    expect(getByRole("link", {name: "login"}).getAttribute("href")).toBe('/accounts/login')
  })

  it('should call the password reset component method when form data emitted from form', async () => {
    const { fixture } = await render(ForgotPasswordComponent);
    const handleForgotPasswordSpy = jest.spyOn(fixture.componentInstance, "handleSendPasswordResetLink");
    const forgotPasswordFormComponent: ForgotPasswordFormComponent  = fixture.debugElement.query(By.directive(ForgotPasswordFormComponent)).componentInstance
    forgotPasswordFormComponent.submitData.emit(MOCK_FORGOT_PASSWORD_EMAIL_ID)
    expect(handleForgotPasswordSpy).toHaveBeenCalledWith(MOCK_FORGOT_PASSWORD_EMAIL_ID)
  })

  it('should show success toast message when api success', async () => {
    const { fixture } = await render(ForgotPasswordComponent)
    const successToastSpy = jest.spyOn(TestBed.inject(SwToastService), "success");
    const forgotPasswordFormComponent: ForgotPasswordFormComponent  = fixture.debugElement.query(By.directive(ForgotPasswordFormComponent)).componentInstance
    forgotPasswordFormComponent.submitData.emit(MOCK_FORGOT_PASSWORD_EMAIL_ID)
    expect(successToastSpy).toHaveBeenCalledWith({"message": "Password reset link sent to provided email", title: "Reset password"})
  })


  it('should show error toast message when api fails', async () => {
    const { fixture } = await render(ForgotPasswordComponent, {
      providers: [
        {
          provide: StoreActionDispatcher,
          useValue: { dispatchAsyncAction: () => throwError(() => {}) }
        }
      ]
    })
    const errorToastSpy = jest.spyOn(TestBed.inject(SwToastService), "error");
    const forgotPasswordFormComponent: ForgotPasswordFormComponent  = fixture.debugElement.query(By.directive(ForgotPasswordFormComponent)).componentInstance
    forgotPasswordFormComponent.submitData.emit(MOCK_FORGOT_PASSWORD_EMAIL_ID)
    expect(errorToastSpy).toHaveBeenCalledWith({
      title: 'Reset password',
      message: 'Error in sending password reset link',
    })
  })
});
