import { ComponentFixture, TestBed } from "@angular/core/testing"
import { AccountsShellComponent } from "./accounts-shell.component"
import { RouterTestingModule } from "@angular/router/testing";

describe('AccountsShellComponent', () => {

    let fixture: ComponentFixture<AccountsShellComponent>;
    let component: AccountsShellComponent;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            imports: [
                AccountsShellComponent,
                RouterTestingModule
            ]
        }).compileComponents()
        fixture = TestBed.createComponent(AccountsShellComponent);
        component = fixture.componentInstance;
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(fixture).toBeDefined()
    })

    it('should app name as link and caption in the banner', () => {
        const appLink: HTMLAnchorElement = fixture.nativeElement.querySelector('.accounts-shell__banner h1 a');
        const appCaption: HTMLHeadingElement = fixture.nativeElement.querySelector('.accounts-shell__banner h6');
        expect(appLink.innerHTML).toBe('API Assistant')
        expect(appCaption.innerHTML).toBe('Declarative Backend for trivial apps')
    })

})