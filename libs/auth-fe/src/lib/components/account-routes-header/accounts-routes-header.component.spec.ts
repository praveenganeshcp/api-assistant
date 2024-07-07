import { TestBed } from "@angular/core/testing"
import { AccountRoutesHeaderComponent } from "./account-routes-header.component"
import { render } from "@testing-library/angular"
import { AppInfoService } from "@api-assistant/commons-fe"

describe('AccountRoutesHeaderComponent', () => {

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AccountRoutesHeaderComponent]
        }).compileComponents()
    })

    it('should create', async () => {
        const { fixture } = await render(AccountRoutesHeaderComponent);
        expect(fixture).toBeTruthy()
    })

    it('should app name with link', async () => {
        const { getByRole } = await render(AccountRoutesHeaderComponent);
        const homePageLink = getByRole("link", {name: "home-page"})
        expect(homePageLink).toHaveAttribute('href', '/')
        expect(homePageLink).toHaveTextContent(TestBed.inject(AppInfoService).appName)
    })
})