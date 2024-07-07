import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { render } from '@testing-library/angular';
import { StoreActionDispatcher } from '@api-assistant/commons-fe';
import { By } from '@angular/platform-browser';
import { LoginFormComponent, LoginFormData } from '@api-assistant/auth-fe';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SwToastService } from 'ngx-simple-widgets';

describe('LoginComponent', () => {

  const MOCK_LOGIN_FORM_DATA: LoginFormData = { emailId: "test@mail.com", password: "Password1" };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
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
    const { fixture } = await render(LoginComponent);
    expect(fixture).toBeTruthy();
  });

  it('should have link for forgot password', async () => {
    const { getByRole } = await render(LoginComponent);
    expect(getByRole("link", {name: "forgot-password"}).getAttribute("href")).toBe('/accounts/forgot-password')
  })

  it('should have link to signup', async () => {
    const { getByRole } = await render(LoginComponent);
    expect(getByRole("link", {name: "signup"}).getAttribute("href")).toBe('/accounts/signup')
  })

  it('should call the login component method when form data emitted from form', async () => {
    const { fixture } = await render(LoginComponent);
    const handleLoginSpy = jest.spyOn(fixture.componentInstance, "handleLogin");
    const loginFormComponent: LoginFormComponent  = fixture.debugElement.query(By.directive(LoginFormComponent)).componentInstance
    loginFormComponent.submitData.emit(MOCK_LOGIN_FORM_DATA)
    expect(handleLoginSpy).toHaveBeenCalledWith(MOCK_LOGIN_FORM_DATA)
  })

  it('should redirect to home page after login is success', async () => {
    const { fixture } = await render(LoginComponent);
    const routerNavigateSpy = jest.spyOn(TestBed.inject(Router), "navigateByUrl");
    const loginFormComponent: LoginFormComponent  = fixture.debugElement.query(By.directive(LoginFormComponent)).componentInstance
    loginFormComponent.submitData.emit(MOCK_LOGIN_FORM_DATA)
    expect(routerNavigateSpy).toHaveBeenCalledWith("/app/projects")
  })

  it('should redirect to callBack url if provided in url after login is success', async () => {
    const callBackUrl = "/app/applications/1";
    const { fixture } = await render(LoginComponent, {
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParamMap: { get: () => callBackUrl }  } }
        }
      ]
    });
    const routerNavigateSpy = jest.spyOn(TestBed.inject(Router), "navigateByUrl");
    const loginFormComponent: LoginFormComponent  = fixture.debugElement.query(By.directive(LoginFormComponent)).componentInstance
    loginFormComponent.submitData.emit(MOCK_LOGIN_FORM_DATA)
    expect(routerNavigateSpy).toHaveBeenCalledWith(callBackUrl)
  })

  it('should error toast message when login fails', async () => {
    const { fixture } = await render(LoginComponent, {
      providers: [
        {
          provide: StoreActionDispatcher,
          useValue: { dispatchAsyncAction: () => throwError(() => {}) }
        }
      ]
    })
    const errorToastSpy = jest.spyOn(TestBed.inject(SwToastService), "error");
    const loginFormComponent: LoginFormComponent  = fixture.debugElement.query(By.directive(LoginFormComponent)).componentInstance
    loginFormComponent.submitData.emit(MOCK_LOGIN_FORM_DATA)
    expect(errorToastSpy).toHaveBeenCalledWith({"message": "Error in signin"})
  })
});
