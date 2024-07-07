import { TestBed } from "@angular/core/testing"
import { ForgotPasswordFormComponent } from "./forgot-password-form.component";
import { fireEvent, render } from "@testing-library/angular";
import { By } from "@angular/platform-browser";

describe('ForgotPasswordFormComponent', () => {

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ForgotPasswordFormComponent]
        }).compileComponents()
    })

    it('should create', async () => {
        const { fixture } = await render(ForgotPasswordFormComponent);
        expect(fixture).toBeTruthy()
    })

    describe('emailId form control', () => {
        it('should be shown', async () => {
            const { getByRole } = await render(ForgotPasswordFormComponent)
            expect(getByRole("textbox", {name: 'emailId'})).toBeInTheDocument()
        })

        it('should show required message when empty and blurred', async () => {
            const { getByRole, fixture } = await render(ForgotPasswordFormComponent)
            const emailIdControl = getByRole("textbox", {name: 'emailId'});
            fireEvent.input(emailIdControl, {target: {value: ""}})
            fireEvent.blur(emailIdControl);
            fixture.detectChanges()
            expect(fixture.debugElement.query(By.css('.sw-form-control__error-message')).nativeElement).toHaveTextContent('required field')
        })

        it('should show invalid mail message when input is invalid', async () => {
            const { getByRole, fixture } = await render(ForgotPasswordFormComponent)
            const emailIdControl = getByRole("textbox", {name: 'emailId'});
            fireEvent.input(emailIdControl, {target: {value: "invalid"}})
            fireEvent.blur(emailIdControl);
            expect(fixture.debugElement.query(By.css('.sw-form-control__error-message')).nativeElement).toHaveTextContent('Enter valid email')
        })

        it('should not show error message if input is valid', async () => {
            const { getByRole, fixture } = await render(ForgotPasswordFormComponent)
            const emailIdControl = getByRole("textbox", {name: 'emailId'});
            fireEvent.input(emailIdControl, {target: {value: "test@mail.com"}})
            fireEvent.blur(emailIdControl);
            expect(fixture.debugElement.query(By.css('.sw-form-control__error-message'))).not.toBeInTheDocument()
        })

    })

    it('should show the forgot-password as form header', async () => {
        const { getByRole } = await render(ForgotPasswordFormComponent)
        expect(getByRole("heading", {name: "form-heading"})).toHaveTextContent("Forgot password")
    })

    it('should emit the form data when valid and submitted', async () => {
        const emailId = "test@mail.com";
        const { getByRole, fixture } = await render(ForgotPasswordFormComponent)
        fireEvent.input(getByRole("textbox", {name: "emailId"}), {target: {value: emailId}})
        const outputSpy = jest.spyOn(fixture.componentInstance.submitData, "emit");
        getByRole("button", {name: "submit"}).click()
        expect(outputSpy).toHaveBeenCalledWith(emailId)
    })

    it('should disable the CTA when form data is invalid', async () => {
        const { getByRole } = await render(ForgotPasswordFormComponent)
        expect((getByRole("button", {name: "submit"}) as HTMLButtonElement).disabled).toBe(true)
    })

    it('should enable the CTA when form data is valid', async () => {
        const emailId = "test@mail.com";
        const { getByRole } = await render(ForgotPasswordFormComponent)
        fireEvent.input(getByRole("textbox", {name: "emailId"}), {target: {value: emailId}})
        expect((getByRole("button", {name: "submit"}) as HTMLButtonElement).disabled).toBe(false)
    })

    it('should show login link', async () => {
        const link = '/signin'
        const { getByRole } = await render(ForgotPasswordFormComponent, {
            componentProperties: {
                loginLink: link
            }
        })
        const signupLink = getByRole("link", {name: "login"})
        expect(signupLink).toHaveTextContent('Login')
        expect(signupLink).toHaveAttribute('href', link)
    })
})