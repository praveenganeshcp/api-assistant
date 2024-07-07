import { TestBed } from "@angular/core/testing"
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { SignupFormComponent } from "./signup-form.component";
import { fireEvent, render } from "@testing-library/angular";
import { By } from "@angular/platform-browser";
import { UniqueEmailIdValidator } from "../../models/accounts.types";
import { of } from "rxjs";

describe('SignupFormComponent', () => {

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                SignupFormComponent,
                HttpClientTestingModule
            ],
            providers: [
                { provide: UniqueEmailIdValidator, useValue: {
                    validate: () => of(null)
                } }
            ]
        }).compileComponents()
    })

    it('should create', async () => {
        const { fixture } = await render(SignupFormComponent);
        expect(fixture).toBeTruthy()
    })


    describe('emailId form control', () => {
        it('should be shown', async () => {
            const { getByRole } = await render(SignupFormComponent)
            expect(getByRole("textbox", {name: 'emailId'})).toBeInTheDocument()
        })

        it('should show required message when empty and blurred', async () => {
            const { getByRole, fixture } = await render(SignupFormComponent)
            const emailIdControl = getByRole("textbox", {name: 'emailId'});
            fireEvent.input(emailIdControl, {target: {value: ""}})
            fireEvent.blur(emailIdControl);
            fixture.detectChanges()
            expect(fixture.debugElement.query(By.css('.sw-form-control__error-message')).nativeElement).toHaveTextContent('required field')
        })

        it('should show invalid mail message when input is invalid', async () => {
            const { getByRole, fixture } = await render(SignupFormComponent)
            const emailIdControl = getByRole("textbox", {name: 'emailId'});
            fireEvent.input(emailIdControl, {target: {value: "invalid"}})
            fireEvent.blur(emailIdControl);
            expect(fixture.debugElement.query(By.css('.sw-form-control__error-message')).nativeElement).toHaveTextContent('Enter valid email')
        })

        it('should show error when emailId is not unique', async () => {
            const { getByRole, fixture } = await render(SignupFormComponent, {
                providers: [
                    {
                        provide: UniqueEmailIdValidator,
                        useValue: {
                            validate: () => of({duplicateEmailId: true})
                        }
                    }
                ]
            })
            const emailIdControl = getByRole("textbox", {name: 'emailId'});
            fireEvent.input(emailIdControl, {target: {value: "test@mail.com"}})
            fireEvent.blur(emailIdControl);
            expect(fixture.debugElement.query(By.css('.sw-form-control__error-message')).nativeElement).toHaveTextContent('EmailId already registered')
        })


        it('should not show error message if input is valid', async () => {
            const { getByRole, fixture } = await render(SignupFormComponent)
            const emailIdControl = getByRole("textbox", {name: 'emailId'});
            fireEvent.input(emailIdControl, {target: {value: "test@mail.com"}})
            fireEvent.blur(emailIdControl);
            expect(fixture.debugElement.query(By.css('.sw-form-control__error-message'))).not.toBeInTheDocument()
        })


    })

    describe('password form control', () => {
        
        it('should be shown', async () => {
            const { getByRole } = await render(SignupFormComponent)
            expect(getByRole("textbox", {name: 'password'})).toBeTruthy()
        })

        it('should show required message when touched and blurred', async () => {
            const { getByRole, fixture } = await render(SignupFormComponent)
            const passwordControl = getByRole("textbox", {name: 'password'});
            fireEvent.input(passwordControl, {target: {value: ""}})
            fireEvent.blur(passwordControl);
            fixture.detectChanges()
            expect(fixture.debugElement.query(By.css('.sw-form-control__error-message')).nativeElement).toHaveTextContent('required field')
        })

        it('should show invalid message when captial letter is missing', async () => {
            const { getByRole, fixture } = await render(SignupFormComponent)
            const passwordControl = getByRole("textbox", {name: 'password'});
            fireEvent.input(passwordControl, {target: {value: "abcdefg8"}})
            fireEvent.blur(passwordControl);
            fixture.detectChanges()
            expect(fixture.debugElement.query(By.css('.sw-form-control__error-message')).nativeElement).toHaveTextContent('Password must contain 1 uppercase, 1 lowercase, 1 number and minimum 9 characters')
        })

        it('should show invalid message when small letter is missing', async () => {
            const { getByRole, fixture } = await render(SignupFormComponent)
            const passwordControl = getByRole("textbox", {name: 'password'});
            fireEvent.input(passwordControl, {target: {value: "ABCDEFG8"}})
            fireEvent.blur(passwordControl);
            fixture.detectChanges()
            expect(fixture.debugElement.query(By.css('.sw-form-control__error-message')).nativeElement).toHaveTextContent('Password must contain 1 uppercase, 1 lowercase, 1 number and minimum 9 characters')
        })

        it('should show invalid message when number is missing', async () => {
            const { getByRole, fixture } = await render(SignupFormComponent)
            const passwordControl = getByRole("textbox", {name: 'password'});
            fireEvent.input(passwordControl, {target: {value: "ABCDefgh"}})
            fireEvent.blur(passwordControl);
            fixture.detectChanges()
            expect(fixture.debugElement.query(By.css('.sw-form-control__error-message')).nativeElement).toHaveTextContent('Password must contain 1 uppercase, 1 lowercase, 1 number and minimum 9 characters')
        })

        it('should show invalid message when length is less than 9 chars', async () => {
            const { getByRole, fixture } = await render(SignupFormComponent)
            const passwordControl = getByRole("textbox", {name: 'password'});
            fireEvent.input(passwordControl, {target: {value: "ABCDefg8"}})
            fireEvent.blur(passwordControl);
            fixture.detectChanges()
            expect(fixture.debugElement.query(By.css('.sw-form-control__error-message')).nativeElement).toHaveTextContent('Password must contain 1 uppercase, 1 lowercase, 1 number and minimum 9 characters')
        })

        it('should not show error message when password is strong', async () => {
            const { getByRole, fixture } = await render(SignupFormComponent)
            const passwordControl = getByRole("textbox", {name: 'password'});
            fireEvent.input(passwordControl, {target: {value: "ABCDefgh8"}})
            fireEvent.blur(passwordControl);
            fixture.detectChanges()
            expect(fixture.debugElement.query(By.css('.sw-form-control__error-message'))).not.toBeInTheDocument()
        })

    })

    describe('username form control', () => {
        it('should be shown', async () => {
            const { getByRole } = await render(SignupFormComponent)
            expect(getByRole("textbox", {name: 'username'})).toBeInTheDocument()
        })

        it('should show required message when empty and blurred', async () => {
            const { getByRole, fixture } = await render(SignupFormComponent)
            const usernameControl = getByRole("textbox", {name: 'username'});
            fireEvent.input(usernameControl, {target: {value: ""}})
            fireEvent.blur(usernameControl);
            fixture.detectChanges()
            expect(fixture.debugElement.query(By.css('.sw-form-control__error-message')).nativeElement).toHaveTextContent('required field')
        })

        it('should show invalid message when characters is less than 3', async () => {
            const { getByRole, fixture } = await render(SignupFormComponent)
            const usernameControl = getByRole("textbox", {name: 'username'});
            fireEvent.input(usernameControl, {target: {value: "a"}})
            fireEvent.blur(usernameControl);
            expect(fixture.debugElement.query(By.css('.sw-form-control__error-message')).nativeElement).toHaveTextContent('must contain atleast 3 characters')
        })

        it('should show invalid message when characters are greater than 20', async () => {
            const { getByRole, fixture } = await render(SignupFormComponent)
            const usernameControl = getByRole("textbox", {name: 'username'});
            fireEvent.input(usernameControl, {target: {value: "abcdefghijklmnopqstuvxyz"}})
            fireEvent.blur(usernameControl);
            expect(fixture.debugElement.query(By.css('.sw-form-control__error-message')).nativeElement).toHaveTextContent('cannot be more than 20 characters')
        })

        it('should not show error message if input is valid', async () => {
            const { getByRole, fixture } = await render(SignupFormComponent)
            const usernameControl = getByRole("textbox", {name: 'username'});
            fireEvent.input(usernameControl, {target: {value: "john"}})
            fireEvent.blur(usernameControl);
            expect(fixture.debugElement.query(By.css('.sw-form-control__error-message'))).not.toBeInTheDocument()
        })

    })

    it('should show the signup header', async () => {
        const { getByRole } = await render(SignupFormComponent)
        expect(getByRole("heading", {name: "form-heading"})).toHaveTextContent("Signup")
    })

    it('should emit the form data when valid and submitted', async () => {
        const emailId = "test@mail.com";
        const password = "ABCDefgh8"
        const username = "John"
        const { getByRole, fixture } = await render(SignupFormComponent)
        fireEvent.input(getByRole("textbox", {name: "emailId"}), {target: {value: emailId}})
        fireEvent.input(getByRole("textbox", {name: "password"}), {target: {value: password}})
        fireEvent.input(getByRole("textbox", {name: "username"}), {target: {value: username}})
        const outputSpy = jest.spyOn(fixture.componentInstance.submitData, "emit");
        getByRole("button", {name: "submit"}).click()
        expect(outputSpy).toHaveBeenCalledWith({ emailId, password, username })
    })

    it('should disable the CTA when form data is invalid', async () => {
        const { getByRole } = await render(SignupFormComponent)
        expect((getByRole("button", {name: "submit"}) as HTMLButtonElement).disabled).toBe(true)
    })

    it('should enable the CTA when form data is valid', async () => {
        const emailId = "test@mail.com";
        const password = "ABCDefgh8"
        const username = "John"
        const { getByRole } = await render(SignupFormComponent)
        fireEvent.input(getByRole("textbox", {name: "emailId"}), {target: {value: emailId}})
        fireEvent.input(getByRole("textbox", {name: "password"}), {target: {value: password}})
        fireEvent.input(getByRole("textbox", {name: "username"}), {target: {value: username}})
        expect((getByRole("button", {name: "submit"}) as HTMLButtonElement).disabled).toBe(false)
    })

    it('should show login link', async () => {
        const link = '/signin'
        const { getByRole } = await render(SignupFormComponent, {
            componentProperties: {
                loginLink: link
            }
        })
        const signupLink = getByRole("link", {name: "login"})
        expect(signupLink).toHaveTextContent('Login')
        expect(signupLink).toHaveAttribute('href', link)
    })
})