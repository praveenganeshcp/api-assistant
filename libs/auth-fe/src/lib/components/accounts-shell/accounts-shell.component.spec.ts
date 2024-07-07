import { TestBed } from '@angular/core/testing';
import { AccountsShellComponent } from "./accounts-shell.component";
import { render } from "@testing-library/angular";
import { AppInfoService } from '@api-assistant/commons-fe';
import { By } from '@angular/platform-browser';
import { AccountRoutesHeaderComponent } from '../account-routes-header/account-routes-header.component';
import { RouterOutlet } from '@angular/router';

describe('AccountsShellComponent', () => {

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            imports: [AccountsShellComponent]
        }).compileComponents()
    })

    it('should create', async () => {
        const { fixture } = await render(AccountsShellComponent);
        expect(fixture).toBeTruthy()
    })

    it('should show app name with link', async () => {
        const { getByRole } = await render(AccountsShellComponent);
        const homePageLink = getByRole("link", {
            name: 'home-page-link'
        })
        expect(homePageLink).toHaveAttribute('href', '/')
        const appInfoService = TestBed.inject(AppInfoService);
        expect(homePageLink).toHaveTextContent(appInfoService.appName)
    })

    it('should show caption', async () => {
        const { getByRole } = await render(AccountsShellComponent);
        const appInfoService = TestBed.inject(AppInfoService);
        expect(getByRole('heading', {level: 6})).toHaveTextContent(appInfoService.appCaption)
    })

    it('should show header', async () => {
        const { fixture } = await render(AccountsShellComponent);
        expect(fixture.debugElement.query(By.directive(AccountRoutesHeaderComponent))).toBeTruthy()
    })

    it('should have router-outlet', async () => {
        const { fixture } = await render(AccountsShellComponent);
        expect(fixture.debugElement.query(By.directive(RouterOutlet))).toBeTruthy()
    })
})