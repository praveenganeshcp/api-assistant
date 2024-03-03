import { ComponentFixture, TestBed } from "@angular/core/testing"
import { AccountRoutesHeaderComponent } from "./account-routes-header.component"
import { RouterTestingModule } from "@angular/router/testing";

describe('AccountRoutesHeaderComponent', () => {

    let fixture: ComponentFixture<AccountRoutesHeaderComponent>;
    let component: AccountRoutesHeaderComponent;

    beforeEach(async() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                AccountRoutesHeaderComponent
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(AccountRoutesHeaderComponent);
        component = fixture.componentInstance;
    })

    it('should create', () => {
        expect(fixture).toBeDefined()
    })

    it('should show app name as link with heading style', () => {
        const appLink: HTMLAnchorElement = fixture.nativeElement.querySelector('h1 a');
        expect(appLink.innerHTML).toContain('API Assistant')
    })
})