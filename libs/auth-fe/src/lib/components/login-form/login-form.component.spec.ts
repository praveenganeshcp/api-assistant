import { TestBed } from "@angular/core/testing"
import { LoginFormComponent } from "./login-form.component";
import { fireEvent, render } from "@testing-library/angular";
import { By } from "@angular/platform-browser";

describe('LoginFormComponent', () => {

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            imports: [LoginFormComponent]
        }).compileComponents()
    })

    it('should create', async () => {
        const { fixture } = await render(LoginFormComponent)
        expect(fixture).toBeTruthy()
    })

    describe('emailId form control', () => {
        it('should be shown', async () => {
            const { getByRole } = await render(LoginFormComponent)
            expect(getByRole("textbox", {name: 'emailId'})).toBeInTheDocument()
        })

        it('should show required message when empty and blurred', async () => {
            const { getByRole, fixture } = await render(LoginFormComponent)
            const emailIdControl = getByRole("textbox", {name: 'emailId'});
            fireEvent.input(emailIdControl, {target: {value: ""}})
            fireEvent.blur(emailIdControl);
            fixture.detectChanges()
            expect(fixture.debugElement.query(By.css('.sw-form-control__error-message')).nativeElement).toHaveTextContent('required field')
        })

        it('should show invalid mail message when input is invalid', async () => {
            const { getByRole, fixture } = await render(LoginFormComponent)
            const emailIdControl = getByRole("textbox", {name: 'emailId'});
            fireEvent.input(emailIdControl, {target: {value: "invalid"}})
            fireEvent.blur(emailIdControl);
            expect(fixture.debugElement.query(By.css('.sw-form-control__error-message')).nativeElement).toHaveTextContent('Enter valid email')
        })

        it('should not show error message if input is valid', async () => {
            const { getByRole, fixture } = await render(LoginFormComponent)
            const emailIdControl = getByRole("textbox", {name: 'emailId'});
            fireEvent.input(emailIdControl, {target: {value: "test@mail.com"}})
            fireEvent.blur(emailIdControl);
            expect(fixture.debugElement.query(By.css('.sw-form-control__error-message'))).not.toBeInTheDocument()
        })
    })

    describe('password form control', () => {
        
        it('should be shown', async () => {
            const { getByRole } = await render(LoginFormComponent)
            expect(getByRole("textbox", {name: 'password'})).toBeTruthy()
        })

        it('should show required message when touched and blurred', async () => {
            const { getByRole, fixture } = await render(LoginFormComponent)
            const passwordControl = getByRole("textbox", {name: 'password'});
            fireEvent.input(passwordControl, {target: {value: ""}})
            fireEvent.blur(passwordControl);
            fixture.detectChanges()
            expect(fixture.debugElement.query(By.css('.sw-form-control__error-message')).nativeElement).toHaveTextContent('required field')
        })

        it('should show invalid message when captial letter is missing', async () => {
            const { getByRole, fixture } = await render(LoginFormComponent)
            const passwordControl = getByRole("textbox", {name: 'password'});
            fireEvent.input(passwordControl, {target: {value: "abcdefg8"}})
            fireEvent.blur(passwordControl);
            fixture.detectChanges()
            expect(fixture.debugElement.query(By.css('.sw-form-control__error-message')).nativeElement).toHaveTextContent('Password must contain 1 uppercase, 1 lowercase, 1 number and minimum 9 characters')
        })

        it('should show invalid message when small letter is missing', async () => {
            const { getByRole, fixture } = await render(LoginFormComponent)
            const passwordControl = getByRole("textbox", {name: 'password'});
            fireEvent.input(passwordControl, {target: {value: "ABCDEFG8"}})
            fireEvent.blur(passwordControl);
            fixture.detectChanges()
            expect(fixture.debugElement.query(By.css('.sw-form-control__error-message')).nativeElement).toHaveTextContent('Password must contain 1 uppercase, 1 lowercase, 1 number and minimum 9 characters')
        })

        it('should show invalid message when number is missing', async () => {
            const { getByRole, fixture } = await render(LoginFormComponent)
            const passwordControl = getByRole("textbox", {name: 'password'});
            fireEvent.input(passwordControl, {target: {value: "ABCDefgh"}})
            fireEvent.blur(passwordControl);
            fixture.detectChanges()
            expect(fixture.debugElement.query(By.css('.sw-form-control__error-message')).nativeElement).toHaveTextContent('Password must contain 1 uppercase, 1 lowercase, 1 number and minimum 9 characters')
        })

        it('should show invalid message when length is less than 9 chars', async () => {
            const { getByRole, fixture } = await render(LoginFormComponent)
            const passwordControl = getByRole("textbox", {name: 'password'});
            fireEvent.input(passwordControl, {target: {value: "ABCDefg8"}})
            fireEvent.blur(passwordControl);
            fixture.detectChanges()
            expect(fixture.debugElement.query(By.css('.sw-form-control__error-message')).nativeElement).toHaveTextContent('Password must contain 1 uppercase, 1 lowercase, 1 number and minimum 9 characters')
        })

        it('should not error message when password is strong', async () => {
            const { getByRole, fixture } = await render(LoginFormComponent)
            const passwordControl = getByRole("textbox", {name: 'password'});
            fireEvent.input(passwordControl, {target: {value: "ABCDefgh8"}})
            fireEvent.blur(passwordControl);
            fixture.detectChanges()
            expect(fixture.debugElement.query(By.css('.sw-form-control__error-message'))).not.toBeInTheDocument()
        })

    })

    it('should show the login header', async () => {
        const { getByRole } = await render(LoginFormComponent)
        expect(getByRole("heading", {name: "form-heading"})).toHaveTextContent("Login")
    })

    it('should emit the form data when valid and submitted', async () => {
        const emailId = "test@mail.com";
        const password = "ABCDefgh8"
        const { getByRole, fixture } = await render(LoginFormComponent)
        fireEvent.input(getByRole("textbox", {name: "emailId"}), {target: {value: emailId}})
        fireEvent.input(getByRole("textbox", {name: "password"}), {target: {value: password}})
        const outputSpy = jest.spyOn(fixture.componentInstance.submitData, "emit");
        getByRole("button", {name: "submit"}).click()
        expect(outputSpy).toHaveBeenCalledWith({ emailId, password })
    })

    it('should disabled the CTA when form data is invalid', async () => {
        const { getByRole } = await render(LoginFormComponent)
        expect((getByRole("button", {name: "submit"}) as HTMLButtonElement).disabled).toBe(true)
    })

    it('should enable the CTA when form data is valid', async () => {
        const emailId = "test@mail.com";
        const password = "ABCDefgh8"
        const { getByRole } = await render(LoginFormComponent)
        fireEvent.input(getByRole("textbox", {name: "emailId"}), {target: {value: emailId}})
        fireEvent.input(getByRole("textbox", {name: "password"}), {target: {value: password}})
        expect((getByRole("button", {name: "submit"}) as HTMLButtonElement).disabled).toBe(false)
    })

    it('should show forgot password link', async () => {
        const link = '/forgot-password'
        const { getByRole } = await render(LoginFormComponent, {
            componentProperties: {
                forgotPasswordLink: link
            }
        })
        const forgotPasswordLink = getByRole("link", {name: "forgot-password"})
        expect(forgotPasswordLink).toHaveTextContent('Forgot password?')
        expect(forgotPasswordLink).toHaveAttribute('href', link)
    })

    it('should show signup link', async () => {
        const link = '/create-account'
        const { getByRole } = await render(LoginFormComponent, {
            componentProperties: {
                signupLink: link
            }
        })
        const signupLink = getByRole("link", {name: "signup"})
        expect(signupLink).toHaveTextContent('Signup')
        expect(signupLink).toHaveAttribute('href', link)
    })

})